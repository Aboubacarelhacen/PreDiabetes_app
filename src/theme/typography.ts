import { Platform } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'Inter' : 'Roboto';

export const typography = {
    h1: {
        fontFamily,
        fontSize: 36,
        fontWeight: '700' as const,
        letterSpacing: -0.5,
    },
    h2: {
        fontFamily,
        fontSize: 24,
        fontWeight: '700' as const,
    },
    h3: {
        fontFamily,
        fontSize: 20,
        fontWeight: '600' as const,
    },
    bodyLarge: {
        fontFamily,
        fontSize: 18,
        fontWeight: '500' as const,
    },
    body: {
        fontFamily,
        fontSize: 16,
        fontWeight: '400' as const,
    },
    bodySmall: {
        fontFamily,
        fontSize: 14,
        fontWeight: '400' as const,
    },
    caption: {
        fontFamily,
        fontSize: 12,
        fontWeight: '500' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
    },
};
