import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, useColorScheme, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  // Animations
  const pulseAnim1 = useRef(new Animated.Value(0)).current;
  const pulseAnim2 = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade in all content

  useEffect(() => {
    // Start fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse rings
    Animated.loop(
      Animated.timing(pulseAnim1, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Delay the second ring slightly
    setTimeout(() => {
      Animated.loop(
        Animated.timing(pulseAnim2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
    }, 1000);

    // Shimmer loading bar
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Navigate to Onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const primaryColor = '#ed254e';
  const lightGradient = ['#F6F8F8', '#FFFFFF'] as const;

  // Interpolations for pulse aniamtions
  const scale1 = pulseAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  const opacity1 = pulseAnim1.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0.2, 0, 0],
  });

  const scale2 = pulseAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });
  const opacity2 = pulseAnim2.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0.1, 0, 0],
  });

  // Interpolation for shimmer loading bar translation
  // The track is 48px wide, the moving bar is 24px wide.
  // We translate it from -24 to 48 (+24 for complete exit)
  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 48],
  });

  return (
    <LinearGradient
      colors={lightGradient}
      style={styles.container}
    >
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {/* Main Content */}
        <View style={styles.centerContent}>
          
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            {/* Pulse rings */}
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: scale1 }],
                  opacity: opacity1,
                  backgroundColor: primaryColor,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: scale2 }],
                  opacity: opacity2,
                  backgroundColor: primaryColor,
                },
              ]}
            />

            {/* Icon Card */}
            <View style={[styles.iconCard]}>
              <Image 
                source={require('../../assets/icon.png')} 
                style={styles.splashLogo} 
                resizeMode="cover" 
              />
            </View>
          </View>

          {/* Texts */}
          <Text style={[styles.title]}>PreDiabetes</Text>
          <Text style={[styles.tagline]}>
            Understand Your Risk.{'\n'}Improve Your Life.
          </Text>

        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingTrack}>
            <Animated.View
              style={[
                styles.loadingBar,
                { transform: [{ translateX: shimmerTranslate }] },
              ]}
            />
          </View>
          <Text style={[styles.loadingText]}>
            LOADING
          </Text>
        </View>

      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    marginTop: -40, // slight adjustment to match visual balance
  },
  logoContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  iconCard: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ed254e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(237, 37, 78, 0.1)',
    overflow: 'hidden',
  },
  splashLogo: {
    width: '100%',
    height: '100%',
  },
  iconCardDark: {
    backgroundColor: '#131e1f',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0f181a',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  titleDark: {
    color: '#f1f5f9',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c4c54',
    textAlign: 'center',
    lineHeight: 28,
  },
  taglineDark: {
    color: '#94a3b8',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
    width: '100%',
  },
  loadingTrack: {
    width: 48,
    height: 4,
    backgroundColor: 'rgba(237, 37, 78, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  loadingBar: {
    width: 24,
    height: 4,
    backgroundColor: '#ed254e',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 2,
  },
  loadingTextDark: {
    color: '#475569',
  },
});
