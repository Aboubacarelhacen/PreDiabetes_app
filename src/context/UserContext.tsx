import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Types ---

export interface UserProfile {
  name: string;
  age: string;
  height: string; // cm
  weight: string; // kg
  waist: string; // cm
}

export interface BmiEntry {
  id: string;
  date: string; // ISO string
  bmi: number;
  weight: number;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Unknown';

export interface RiskResult {
  date: string;
  score: number;
  level: RiskLevel;
}

export interface ActivityEntry {
  id: string;
  date: string; // YYYY-MM-DD
  steps: number;
  activeMinutes: number;
}

export interface UserState {
  profile: UserProfile | null;
  bmiHistory: BmiEntry[];
  riskResult: RiskResult | null;
  activityLogs: ActivityEntry[];
  isHydrated: boolean;
}

export interface UserContextType extends UserState {
  updateProfile: (profile: UserProfile) => Promise<void>;
  addBmiEntry: (entry: Omit<BmiEntry, 'id' | 'date'>) => Promise<void>;
  deleteBmiEntry: (id: string) => Promise<void>;
  saveRiskResult: (result: Omit<RiskResult, 'date'>) => Promise<void>;
  logActivity: (entry: Omit<ActivityEntry, 'id'>) => Promise<void>;
  clearAllData: () => Promise<void>;
}

const defaultState: UserState = {
  profile: null,
  bmiHistory: [],
  riskResult: null,
  activityLogs: [],
  isHydrated: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// --- Provider ---

const STORAGE_KEY = '@prediabetes_user_data';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserState>(defaultState);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setState({ ...defaultState, ...parsed, isHydrated: true });
        } else {
          setState((prev) => ({ ...prev, isHydrated: true }));
        }
      } catch (e) {
        console.error('Failed to load user data.', e);
        setState((prev) => ({ ...prev, isHydrated: true }));
      }
    };
    loadData();
  }, []);

  // Save data whenever it changes (except initial hydration)
  const persistState = async (newState: Partial<UserState>) => {
    try {
      const updatedState = { ...state, ...newState };
      setState(updatedState);
      
      const { isHydrated, ...stateToSave } = updatedState;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save user data.', e);
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    await persistState({ profile });
  };

  const addBmiEntry = async (entry: Omit<BmiEntry, 'id' | 'date'>) => {
    const newEntry: BmiEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    await persistState({ bmiHistory: [newEntry, ...state.bmiHistory] });
  };

  const deleteBmiEntry = async (id: string) => {
    await persistState({
      bmiHistory: state.bmiHistory.filter((entry) => entry.id !== id),
    });
  };

  const saveRiskResult = async (result: Omit<RiskResult, 'date'>) => {
    const newResult: RiskResult = {
      ...result,
      date: new Date().toISOString(),
    };
    await persistState({ riskResult: newResult });
  };

  const logActivity = async (entry: Omit<ActivityEntry, 'id'>) => {
    const existingIndex = state.activityLogs.findIndex(log => log.date === entry.date);
    let newLogs = [...state.activityLogs];

    if (existingIndex >= 0) {
      // Update existing date
      newLogs[existingIndex] = {
        ...newLogs[existingIndex],
        steps: newLogs[existingIndex].steps + entry.steps,
        activeMinutes: newLogs[existingIndex].activeMinutes + entry.activeMinutes,
      };
    } else {
      // New date entry
      newLogs.push({
        ...entry,
        id: Date.now().toString(),
      });
    }

    // Sort descending by date
    newLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    await persistState({ activityLogs: newLogs });
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setState({ ...defaultState, isHydrated: true });
    } catch (e) {
      console.error('Failed to clear data.', e);
    }
  };

  const value: UserContextType = {
    ...state,
    updateProfile,
    addBmiEntry,
    deleteBmiEntry,
    saveRiskResult,
    logActivity,
    clearAllData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// --- Hook ---

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
