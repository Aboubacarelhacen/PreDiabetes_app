import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RiskQuestionsScreen } from '../screens/RiskQuestionsScreen';
import { RiskResultScreen } from '../screens/RiskResultScreen';

export type RiskStackParamList = {
  RiskQuestions: undefined;
  RiskResult: { score: number; level: 'Low' | 'Moderate' | 'High' | 'Unknown' };
};

const Stack = createNativeStackNavigator<RiskStackParamList>();

export const RiskStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RiskQuestions" component={RiskQuestionsScreen} />
      <Stack.Screen name="RiskResult" component={RiskResultScreen} />
    </Stack.Navigator>
  );
};
