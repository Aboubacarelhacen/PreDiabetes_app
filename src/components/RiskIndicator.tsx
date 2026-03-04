import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';

type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Unknown';

interface RiskIndicatorProps {
  level: RiskLevel;
  score?: number;
  style?: ViewStyle;
}

export const RiskIndicator = ({ level, score, style }: RiskIndicatorProps) => {
  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'Low':
        return colors.status.lowRisk;
      case 'Moderate':
        return colors.status.moderateRisk;
      case 'High':
        return colors.status.highRisk;
      default:
        return colors.border.separator;
    }
  };

  const riskColor = getRiskColor(level);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.circle, { borderColor: riskColor }]}>
        <View style={[styles.innerCircle, { backgroundColor: riskColor }]}>
          <Text style={styles.scoreText}>
            {score !== undefined ? score : '-'}
          </Text>
        </View>
      </View>
      <Text style={[styles.levelText, { color: riskColor }]}>
        {level} Risk
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.m,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.s,
    backgroundColor: colors.surface.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  innerCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    ...typography.h1,
    color: colors.text.inverse,
  },
  levelText: {
    ...typography.h3,
    fontWeight: '700',
  },
});
