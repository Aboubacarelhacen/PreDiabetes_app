import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const SecondaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: layout.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
  },
  disabledButton: {
    borderColor: colors.border.separator,
  },
  text: {
    ...typography.bodyLarge,
    color: colors.primary,
    fontWeight: '600',
  },
  disabledText: {
    color: colors.text.lightBody,
  },
});
