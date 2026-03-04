import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Card } from '../components/Card';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';

export const ProfileScreen = () => {
  const { profile, updateProfile, clearAllData } = useUser();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(profile.age);
      setHeight(profile.height);
      setWeight(profile.weight);
      setWaist(profile.waist);
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name, age, height, weight, waist });
    Alert.alert('Success', 'Profile updated successfully.');
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to clear all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Reset', style: 'destructive', onPress: clearAllData },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader title="Profile" subtitle="Manage your personal details" />

        <Card style={styles.card}>
          <InputField label="Name" value={name} onChangeText={setName} placeholder="Your Name" />
          <InputField label="Age" keyboardType="numeric" value={age} onChangeText={setAge} placeholder="e.g. 35" />
          <InputField label="Height (cm)" keyboardType="numeric" value={height} onChangeText={setHeight} placeholder="e.g. 175" />
          <InputField label="Weight (kg)" keyboardType="numeric" value={weight} onChangeText={setWeight} placeholder="e.g. 70" />
          <InputField label="Waist Circumference (cm)" keyboardType="numeric" value={waist} onChangeText={setWaist} placeholder="e.g. 85" />
          
          <PrimaryButton title="Save Profile" onPress={handleSave} style={styles.saveButton} />
        </Card>

        <SectionHeader title="Settings" />
        <Card style={styles.card}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Text style={styles.dangerSubtitle}>Permanently delete all your locally stored data.</Text>
          <PrimaryButton 
            title="Wipe All Data" 
            onPress={handleReset} 
            style={styles.resetButton} 
          />
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
  card: {
    marginBottom: spacing.xl,
  },
  saveButton: {
    marginTop: spacing.s,
  },
  dangerTitle: {
    ...typography.bodyLarge,
    color: colors.status.danger,
    fontWeight: '600',
  },
  dangerSubtitle: {
    ...typography.bodySmall,
    color: colors.text.body,
    marginTop: spacing.xs,
    marginBottom: spacing.m,
  },
  resetButton: {
    backgroundColor: colors.status.danger,
  },
});
