import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  rightElement?: React.ReactNode;
}

export const SectionHeader = ({ title, subtitle, style, rightElement }: SectionHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.m,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.text.heading,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.body,
    marginTop: spacing.xs,
  },
  rightElement: {
    marginLeft: spacing.m,
  },
});
