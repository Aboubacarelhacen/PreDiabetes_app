import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Modal, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useUser } from '../context/UserContext';

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const formatDateReadable = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const ActivityScreen = () => {
  const navigation = useNavigation();
  const { activityLogs, logActivity } = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const [stepsInput, setStepsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');

  // Calculate stats for the last 7 items or 7 days
  const weeklyStats = useMemo(() => {
    // Generate last 7 dates starting from today
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    let totalSteps = 0;
    
    const chartData = last7Days.map((dateStr, index) => {
      const log = activityLogs.find(l => l.date === dateStr);
      const steps = log ? log.steps : 0;
      totalSteps += steps;
      return {
        day: getDayName(dateStr),
        steps,
        active: index === 6 // Today is active
      };
    });

    const maxSteps = Math.max(...chartData.map(d => d.steps), 10000); // minimum scale

    const formattedChart = chartData.map(d => ({
      day: d.day,
      height: `${Math.min((d.steps / maxSteps) * 100, 100)}%`,
      active: d.active,
      steps: d.steps
    }));

    return { totalSteps, chartData: formattedChart };
  }, [activityLogs]);

  const handleSave = async () => {
    const stepsNum = parseInt(stepsInput, 10);
    const minsNum = parseInt(minutesInput, 10);

    if (isNaN(stepsNum) || stepsNum < 0) {
      Alert.alert('Invalid Steps', 'Please enter a valid number of steps.');
      return;
    }

    const finalMins = isNaN(minsNum) || minsNum < 0 ? 0 : minsNum;
    
    // Log for today
    const today = new Date().toISOString().split('T')[0];
    await logActivity({
      date: today,
      steps: stepsNum,
      activeMinutes: finalMins
    });

    setModalVisible(false);
    setStepsInput('');
    setMinutesInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#0f181a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Tracker</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Card */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View>
                <Text style={styles.summarySubtitle}>7-Day Steps</Text>
                <View style={styles.stepsRow}>
                  <Text style={styles.stepsValue}>{weeklyStats.totalSteps.toLocaleString()} </Text>
                  <Text style={styles.stepsUnit}>steps</Text>
                </View>
              </View>
              <View style={styles.trendBadge}>
                <MaterialIcons name="directions-walk" size={16} color="#16a34a" />
                <Text style={styles.trendText}>Active</Text>
              </View>
            </View>

            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              {weeklyStats.chartData.map((item, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.barBackground}>
                    <View 
                      style={[
                        styles.barFill, 
                        { height: item.height as any },
                        item.active && styles.barFillActive
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.chartLabel,
                    item.active && styles.chartLabelActive
                  ]}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Records</Text>
          </View>

          <View style={styles.activityList}>
            {activityLogs.length > 0 ? activityLogs.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityCardLeft}>
                  <View style={[styles.activityIconContainer, { backgroundColor: '#ffedd5' }]}>
                    <MaterialIcons name="directions-run" size={24} color="#ea580c" />
                  </View>
                  <View>
                    <Text style={styles.activityTitle}>{formatDateReadable(activity.date)}</Text>
                    <Text style={styles.activityTime}>{activity.activeMinutes} mins active</Text>
                  </View>
                </View>
                <View style={styles.activityCardRight}>
                  <Text style={styles.activityValue}>{activity.steps.toLocaleString()}</Text>
                  <Text style={styles.activityValueUnit}>steps</Text>
                </View>
              </View>
            )) : (
              <Text style={styles.emptyText}>No activity logged yet. Tap '+' to start tracking!</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Activity Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Activity</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Steps Taken</Text>
              <TextInput
                style={styles.input}
                value={stepsInput}
                onChangeText={setStepsInput}
                keyboardType="numeric"
                placeholder="e.g. 5000"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Active Minutes (Optional)</Text>
              <TextInput
                style={styles.input}
                value={minutesInput}
                onChangeText={setMinutesInput}
                keyboardType="numeric"
                placeholder="e.g. 30"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Log Activity</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f181a',
    letterSpacing: -0.5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // accommodate bottom nav and fab
  },
  summaryContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  summarySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#56898f',
    marginBottom: 4,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  stepsValue: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f181a',
    letterSpacing: -0.5,
  },
  stepsUnit: {
    fontSize: 16,
    fontWeight: '400',
    color: '#56898f',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },
  chartContainer: {
    height: 192,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 4,
  },
  barBackground: {
    width: '100%',
    height: 128,
    backgroundColor: '#fdeaf0',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#ed254e',
    borderRadius: 8,
    opacity: 0.8,
  },
  barFillActive: {
    opacity: 1,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#56898f',
  },
  chartLabelActive: {
    fontWeight: '700',
    color: '#ed254e',
  },
  activitySection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f181a',
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activityCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  activityTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#56898f',
    marginTop: 2,
  },
  activityCardRight: {
    alignItems: 'flex-end',
  },
  activityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  activityValueUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#56898f',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 20,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f181a',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#56898f',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f181a',
    backgroundColor: '#f9fafb',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  }
});
