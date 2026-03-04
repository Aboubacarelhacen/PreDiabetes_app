import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { RiskIndicator } from '../components/RiskIndicator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { RiskStackParamList } from '../navigation/RiskStackNavigator';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUser, RiskLevel } from '../context/UserContext';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';

type RiskResultRouteProp = RouteProp<RiskStackParamList, 'RiskResult'>;
type RiskResultNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<RiskStackParamList, 'RiskResult'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

type Props = {
  route: RiskResultRouteProp;
  navigation: RiskResultNavProp;
};

export const RiskResultScreen = ({ route, navigation }: Props) => {
  const { score, level } = route.params as { score: number; level: RiskLevel };
  const { saveRiskResult } = useUser();

  useEffect(() => {
    // Save to global context on mount
    saveRiskResult({ score, level });
  }, [score, level]);

  const getDescription = () => {
    switch (level) {
      case 'Low':
        return 'Great job! You have a low risk of developing Type 2 Diabetes. Keep up the healthy lifestyle.';
      case 'Moderate':
        return 'You have a moderate risk. Consider making some lifestyle adjustments like eating more vegetables and increasing physical activity.';
      case 'High':
        return 'You have a high risk. We strongly recommend consulting a healthcare provider and taking active steps to improve your health.';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Assessment Results</Text>
        
        <View style={styles.indicatorContainer}>
          <RiskIndicator level={level} score={score} />
        </View>

        <Text style={styles.description}>{getDescription()}</Text>

        <View style={styles.actionsContainer}>
          <PrimaryButton 
            title="View Recommendations" 
            onPress={() => navigation.navigate('Recommendations')} 
            style={styles.actionButton}
          />
          <SecondaryButton 
            title="Back to Home" 
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' } as any)} 
            style={styles.actionButton}
          />
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text.heading,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  indicatorContainer: {
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.text.body,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 26,
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.m,
  },
  actionButton: {
    width: '100%',
  },
});
