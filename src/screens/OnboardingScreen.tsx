import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

// Top section is roughly 50% of the screen logically, 
// Image will take up the background.
const HEADER_HEIGHT = height * 0.55;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top Image Section */}
      <View style={[styles.topSection, { height: HEADER_HEIGHT }]}>
        <Image
          source={require('../../assets/img1.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Lighter overlay to increase image brightness */}
        <View style={styles.imageOverlay} />
      </View>

      {/* Bottom Content Card */}
      <View style={[
        styles.bottomCard, 
        { marginTop: -40 } // Overlap the image slightly for the rounded corner effect
      ]}>
        
        {/* Badge */}
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons name="shield-check-outline" size={16} color="#ed254e" />
          <Text style={styles.badgeText}>AI ASSESSMENT</Text>
        </View>

        {/* Headers */}
        <Text style={[styles.mainTitle]}>
          Know Your Risk{'\n'}
          <Text style={styles.highlightText}>in 2 Minutes</Text>
        </Text>

        <Text style={[styles.subtitle]}>
          Our AI-powered assessment analyzes your lifestyle and health data to predict potential diabetes risks early.
        </Text>

        <View style={styles.spacer} />

        {/* Primary Action Button */}
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.replace('Risk')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>

        {/* Add safe area bottom padding to the card */}
        <View style={{ height: Math.max(insets.bottom, 20) }} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f181a', // Fallback behind image
  },
  topSection: {
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 24, 26, 0.1)', // Very light wash to keep text readable but image bright
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#f6f8f8', // Light mode bg
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 32,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomCardDark: {
    backgroundColor: '#131e1f', // Dark mode bg
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(237, 37, 78, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  badgeText: {
    color: '#ed254e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f181a',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: '#ed254e',
  },
  textDark: {
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    maxWidth: '90%',
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#ed254e',
    width: '100%',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ed254e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    marginLeft: 12,
  },
});
