import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

const MENU_ITEMS = [
  { id: '1', title: 'Profile', icon: 'person', route: 'Profile' },
  { id: '2', title: 'Health Info', icon: 'assignment-ind', route: 'Profile' },
  { id: '3', title: 'BMI Calc', icon: 'calculate', route: 'BMITracker' },
  { id: '4', title: 'Risk Tests', icon: 'health-and-safety', route: 'Risk' },
  { id: '5', title: 'Results', icon: 'bar-chart', route: 'Recommendations' },
  { id: '6', title: 'Log Meal', icon: 'restaurant', route: 'MealLog' },
  { id: '7', title: 'Activity', icon: 'directions-run', route: 'Activity' },
  { id: '8', title: 'FAQ', icon: 'help-outline', route: 'FAQ' },
  { id: '9', title: 'About Us', icon: 'info-outline', route: 'AboutUs' },
  { id: '10', title: 'Contact', icon: 'support-agent', route: 'Contact' },
];

export const ExploreMenuScreen = () => {
  const navigation = useNavigation<any>();

  const handleNavigate = (route: string) => {
    const tabRoutes = ['Profile', 'Activity', 'BMITracker', 'Home'];
    if (tabRoutes.includes(route)) {
      navigation.navigate('Tabs', { screen: route });
    } else {
      navigation.navigate(route);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color="#0f181a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => handleNavigate(item.route)}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.watermarkLogo} 
              resizeMode="contain"
            />
            <View style={styles.iconWrapper}>
              <MaterialIcons name={item.icon as any} size={28} color="#0f181a" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f181a',
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  card: {
    width: '47%',
    aspectRatio: 1, // Make it a square
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '6%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fdeaf0', // Light red background matching image style
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f181a',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  watermarkLogo: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    opacity: 0.04, // Very faint shadow background
  }
});
