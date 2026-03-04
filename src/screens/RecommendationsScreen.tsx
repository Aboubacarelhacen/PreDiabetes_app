import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';

export const RecommendationsScreen = () => {
  const { riskResult, bmiHistory } = useUser();

  const currentBmi = bmiHistory.length > 0 ? bmiHistory[0].bmi : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader title="Recommendations" subtitle="Personalized tips for you" />
        
        <Text style={styles.intro}>
          Based on your latest Risk Score ({riskResult?.score || 'N/A'}) and BMI ({currentBmi ? currentBmi.toFixed(1) : 'N/A'}), here are some tips:
        </Text>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Nutrition</Text>
          <Text style={styles.tipBody}>Focus on a balanced diet rich in whole grains, vegetables, and lean proteins.</Text>
        </Card>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Physical Activity</Text>
          <Text style={styles.tipBody}>Aim for at least 30 minutes of moderate exercise, like brisk walking, five days a week.</Text>
        </Card>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Sleep</Text>
          <Text style={styles.tipBody}>Try to get 7-8 hours of quality sleep per night to regulate your metabolism.</Text>
        </Card>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Stress Management</Text>
          <Text style={styles.tipBody}>Practice mindfulness or deep breathing exercises to manage daily stress levels.</Text>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  container: {
    padding: spacing.l,
    paddingBottom: spacing.xxl,
  },
  intro: {
    ...typography.body,
    color: colors.text.body,
    marginBottom: spacing.l,
  },
  tipCard: {
    marginBottom: spacing.m,
  },
  tipTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.s,
  },
  tipBody: {
    ...typography.body,
    color: colors.text.heading,
  },
});
