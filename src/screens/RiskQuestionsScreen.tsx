import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, layout } from '../theme/spacing';
import { typography } from '../theme/typography';
import { SectionHeader } from '../components/SectionHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RiskStackParamList } from '../navigation/RiskStackNavigator';

const QUESTIONS = [
  {
    question: 'What is your age category?',
    options: [
      { label: 'Under 45 years', score: 0 },
      { label: '45 - 54 years', score: 2 },
      { label: '55 - 64 years', score: 3 },
      { label: 'Over 64 years', score: 4 },
    ],
  },
  {
    question: 'How often do you eat vegetables or fruits?',
    options: [
      { label: 'Every day', score: 0 },
      { label: 'Not every day', score: 1 },
    ],
  },
  {
    question: 'Do you exercise for at least 30 minutes a day?',
    options: [
      { label: 'Yes', score: 0 },
      { label: 'No', score: 2 },
    ],
  },
  {
    question: 'Have you ever taken medication for high blood pressure?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Yes', score: 2 },
    ],
  },
  {
    question: 'Do you have a family history of diabetes?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Yes: grandparent, aunt, or uncle', score: 3 },
      { label: 'Yes: parent, brother, or sister', score: 5 },
    ],
  },
];

type Props = {
  navigation: NativeStackNavigationProp<RiskStackParamList, 'RiskQuestions'>;
};

export const RiskQuestionsScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleOptionPress = (score: number) => {
    const newScore = totalScore + score;
    
    if (currentIndex < QUESTIONS.length - 1) {
      setTotalScore(newScore);
      setCurrentIndex(currentIndex + 1);
    } else {
      let level: 'Low' | 'Moderate' | 'High' = 'Low';
      if (newScore >= 12) {
        level = 'High';
      } else if (newScore >= 7) {
        level = 'Moderate';
      }
      
      // Navigate to results
      navigation.navigate('RiskResult', { score: newScore, level });
      
      // Reset state for next time
      setTimeout(() => {
        setCurrentIndex(0);
        setTotalScore(0);
      }, 500);
    }
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <SectionHeader 
          title={`Question ${currentIndex + 1} of ${QUESTIONS.length}`} 
        />
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.optionButton}
                activeOpacity={0.7}
                onPress={() => handleOptionPress(opt.score)}
              >
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  container: {
    flex: 1,
    padding: spacing.l,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.border.separator,
    borderRadius: layout.borderRadius.round,
    marginBottom: spacing.xxl,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  questionText: {
    ...typography.h2,
    color: colors.text.heading,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: spacing.m,
  },
  optionButton: {
    backgroundColor: colors.surface.white,
    padding: spacing.l,
    borderRadius: layout.borderRadius.large,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  optionText: {
    ...typography.bodyLarge,
    color: colors.text.heading,
  },
});
