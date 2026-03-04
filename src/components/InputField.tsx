import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const InputField = ({ label, error, style, ...props }: InputFieldProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.text.lightBody}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.body,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.surface.white,
    borderWidth: 1,
    borderColor: colors.border.separator,
    borderRadius: layout.borderRadius.medium,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    ...typography.body,
    color: colors.text.heading,
  },
  inputError: {
    borderColor: colors.status.danger,
  },
  errorText: {
    ...typography.caption,
    color: colors.status.danger,
    marginTop: spacing.xs,
    textTransform: 'none',
  },
});
