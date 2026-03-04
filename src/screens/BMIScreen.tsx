import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { useUser, BmiEntry } from '../context/UserContext';

const { width } = Dimensions.get('window');

const formatDate = (isoString: string) => {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (isoString: string) => {
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const BMIScreen = () => {
  const navigation = useNavigation<any>();
  const { bmiHistory, profile, addBmiEntry, updateProfile, deleteBmiEntry } = useUser();
  const [activeTab, setActiveTab] = useState('6M');

  // Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [heightInput, setHeightInput] = useState(profile?.height || '');

  // Derived state from context
  const hasHistory = bmiHistory.length > 0;
  const currentBMI = hasHistory ? bmiHistory[0].bmi : 0;
  
  const getBmiCategory = (bmi: number) => {
    if (bmi === 0) return 'No Data';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getBmiTrendAndDiff = (currentIndex: number) => {
    if (currentIndex >= bmiHistory.length - 1) return { trend: 'flat', diff: '-' };
    const current = bmiHistory[currentIndex].bmi;
    const previous = bmiHistory[currentIndex + 1].bmi;
    const diff = current - previous;
    const absDiff = Math.abs(diff).toFixed(1);
    
    if (diff > 0.1) return { trend: 'up', diff: absDiff };
    if (diff < -0.1) return { trend: 'down', diff: absDiff };
    return { trend: 'flat', diff: '-' };
  };

  const handleSave = async () => {
    const weightNum = parseFloat(weightInput);
    const heightNum = parseFloat(heightInput);

    if (isNaN(weightNum) || weightNum <= 0) {
      Alert.alert('Invalid Weight', 'Please enter a valid weight.');
      return;
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Invalid Height', 'Please enter a valid height in cm.');
      return;
    }

    // calculate BMI: weight(kg) / (height(m))^2
    const heightInMeters = heightNum / 100;
    const calculatedBmi = weightNum / (heightInMeters * heightInMeters);

    await addBmiEntry({
      bmi: calculatedBmi,
      weight: weightNum
    });

    // Optionally update profile height if it changed
    if (profile && profile.height !== heightInput) {
      await updateProfile({ ...profile, height: heightInput });
    } else if (!profile) {
      await updateProfile({ name: 'User', age: '', height: heightInput, weight: weightInput, waist: '' });
    }

    setModalVisible(false);
    setWeightInput('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color="#0f181a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BMI Tracker</Text>
        <TouchableOpacity style={styles.iconButtonClear} onPress={() => { setHeightInput(profile?.height || ''); setModalVisible(true); }}>
          <MaterialIcons name="add" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Main KPI */}
        <View style={styles.kpiContainer}>
          <View style={styles.circleWrapper}>
            <Text style={styles.kpiValue}>{hasHistory ? currentBMI.toFixed(1) : '--'}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{getBmiCategory(currentBMI)}</Text>
            </View>
            <Svg height="192" width="192" style={styles.svgCircle} viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="46"
                stroke={colors.primary}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="289"
                strokeDashoffset={hasHistory ? 289 - (289 * Math.min(Math.max((currentBMI - 15) / 25, 0), 1)) : 289} // Simulates progress based on BMI range 15 to 40
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* BMI Scale */}
        <View style={styles.scaleSection}>
          <View style={styles.scaleHeader}>
            <Text style={styles.scaleTitle}>BMI Scale</Text>
            <Text style={styles.scaleTarget}>Target: 18.5 - 24.9</Text>
          </View>
          
          <View style={styles.scaleBarsContainer}>
            <View style={[styles.scaleBar, { backgroundColor: '#93c5fd', flex: 1.8 }]} />
            <View style={[styles.scaleBar, { backgroundColor: '#4ade80', flex: 2.5 }]} />
            <View style={[styles.scaleBar, { backgroundColor: '#facc15', flex: 2.0 }]} />
            <View style={[styles.scaleBar, { backgroundColor: '#fb923c', flex: 2.0 }]} />
            <View style={[styles.scaleBar, { backgroundColor: '#f87171', flex: 1.7 }]} />
          </View>
          
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabelText}>15</Text>
            <Text style={[styles.scaleLabelText, { paddingLeft: 16 }]}>18.5</Text>
            <Text style={[styles.scaleLabelText, { paddingLeft: 8 }]}>25</Text>
            <Text style={[styles.scaleLabelText, { paddingLeft: 8 }]}>30</Text>
            <Text style={styles.scaleLabelText}>40</Text>
          </View>

          {/* Indicator */}
          {hasHistory && (
            <View style={styles.indicatorContainer}>
              <View style={[
                styles.indicatorPointer, 
                { left: `${Math.min(Math.max(((currentBMI - 15) / 25) * 100, 0), 98)}%` }
              ]} />
            </View>
          )}
        </View>

        {/* Trends Chart */}
        <View style={styles.trendsSection}>
          <View style={styles.trendsCard}>
            <View style={styles.trendsHeader}>
              <Text style={styles.trendsTitle}>Trends</Text>
              <View style={styles.trendsToggle}>
                <TouchableOpacity 
                  style={[styles.toggleBtn, activeTab === '6M' && styles.toggleBtnActive]}
                  onPress={() => setActiveTab('6M')}
                >
                  <Text style={[styles.toggleText, activeTab === '6M' && styles.toggleTextActive]}>6M</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleBtn, activeTab === '1Y' && styles.toggleBtnActive]}
                  onPress={() => setActiveTab('1Y')}
                >
                  <Text style={[styles.toggleText, activeTab === '1Y' && styles.toggleTextActive]}>1Y</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Simulated Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.gridLinesContainer}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <View key={i} style={styles.gridLine} />
                ))}
              </View>

              <View style={styles.chartRow}>
                {[
                  { month: 'Jan', height: '60%' },
                  { month: 'Feb', height: '55%' },
                  { month: 'Mar', height: '62%' },
                  { month: 'Apr', height: '58%' },
                  { month: 'May', height: '50%' },
                  { month: 'Jun', height: '52%', active: true },
                ].map((item, index) => (
                  <View key={index} style={styles.chartCol}>
                    <View style={[styles.barWrapper, { height: item.height as any }]}>
                      <View style={[styles.dataDot, item.active && styles.dataDotActive]} />
                      <LinearGradient
                        colors={[colors.primary + (item.active ? '66' : '33'), 'transparent']}
                        style={styles.dataGradientLine}
                      />
                    </View>
                    <Text style={[styles.monthLabel, item.active && styles.monthLabelActive]}>
                      {item.month}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>History</Text>
          
          <View style={styles.historyList}>
            {hasHistory ? bmiHistory.map((item, index) => {
              const { trend, diff } = getBmiTrendAndDiff(index);
              return (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyLeft}>
                    <View style={[styles.historyIconWrapper, index === 0 && styles.historyIconWrapperActive]}>
                      <MaterialIcons 
                        name="monitor-weight" 
                        size={20} 
                        color={index === 0 ? colors.primary : '#9ca3af'} 
                      />
                    </View>
                    <View>
                      <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                      <Text style={styles.historyTime}>{formatTime(item.date)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.historyActionRight}>
                    <View style={styles.historyRight}>
                      <Text style={styles.historyValue}>{item.bmi.toFixed(1)}</Text>
                      <View style={styles.trendRow}>
                        {trend === 'down' && <MaterialIcons name="arrow-downward" size={14} color="#4ade80" />}
                        {trend === 'up' && <MaterialIcons name="arrow-upward" size={14} color="#f87171" />}
                        {trend === 'flat' && <MaterialIcons name="remove" size={14} color="#9ca3af" />}
                        <Text style={[
                          styles.trendDiff, 
                          trend === 'down' && { color: '#4ade80' },
                          trend === 'up' && { color: '#f87171' }
                        ]}>
                          {diff}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => deleteBmiEntry(item.id)} style={styles.deleteBtn}>
                      <MaterialIcons name="delete-outline" size={20} color="#f87171" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }) : (
              <Text style={styles.emptyText}>No BMI records found. Tap '+' to add your first record!</Text>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Add Entry Modal */}
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
              <Text style={styles.modalTitle}>Add BMI Record</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weightInput}
                onChangeText={setWeightInput}
                keyboardType="numeric"
                placeholder="e.g. 70"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={heightInput}
                onChangeText={setHeightInput}
                keyboardType="numeric"
                placeholder="e.g. 175"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Record</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(246, 248, 248, 0.95)',
    zIndex: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonClear: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f181a',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  kpiContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  circleWrapper: {
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 6,
    borderColor: 'rgba(237, 37, 78, 0.1)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  svgCircle: {
    position: 'absolute',
    top: -6,
    left: -6,
    transform: [{ rotate: '-90deg' }],
  },
  kpiValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#0f181a',
    letterSpacing: -1,
  },
  categoryBadge: {
    marginTop: 4,
    backgroundColor: 'rgba(237, 37, 78, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  scaleSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  scaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  scaleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f181a',
  },
  scaleTarget: {
    fontSize: 12,
    color: '#56898f',
  },
  scaleBarsContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    gap: 2,
  },
  scaleBar: {
    height: '100%',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  scaleLabelText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9ca3af',
  },
  indicatorContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 4,
  },
  indicatorPointer: {
    position: 'absolute',
    top: -24,
    width: 8,
    height: 8,
    backgroundColor: '#0f181a',
    transform: [{ rotate: '45deg' }],
    marginLeft: -4,
  },
  trendsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  trendsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  trendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  trendsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  trendsToggle: {
    flexDirection: 'row',
    backgroundColor: '#f6f8f8',
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
  toggleTextActive: {
    color: '#0f181a',
  },
  chartContainer: {
    height: 160,
    position: 'relative',
  },
  gridLinesContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    opacity: 0.1,
  },
  gridLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#0f181a',
  },
  chartRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    zIndex: 10,
  },
  chartCol: {
    height: '100%',
    width: '16%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dataDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    zIndex: 2,
  },
  dataDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dataGradientLine: {
    position: 'absolute',
    bottom: 0,
    width: 2,
    height: '100%',
    zIndex: 1,
  },
  monthLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 8,
  },
  monthLabelActive: {
    color: '#0f181a',
    fontWeight: '700',
  },
  historySection: {
    paddingHorizontal: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f181a',
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  historyIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyIconWrapperActive: {
    backgroundColor: 'rgba(237, 37, 78, 0.1)',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f181a',
  },
  historyTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  historyActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  trendDiff: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 8,
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
