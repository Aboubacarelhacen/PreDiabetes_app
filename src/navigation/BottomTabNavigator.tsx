import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { BMIScreen } from '../screens/BMIScreen';
import { colors } from '../theme/colors';

export type BottomTabParamList = {
  Home: undefined;
  BMITracker: undefined;
  AddAction: undefined;
  Activity: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Custom Tab Bar to support the floating button
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === 'AddAction') {
              navigation.navigate('ExploreMenu' as any);
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
             if (route.name === 'AddAction') return;
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Define icon and label mapped to route names based on the design
          let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = 'home';
          let label = '';
          
          if (route.name === 'Home') {
            iconName = 'home';
            label = 'Home';
          } else if (route.name === 'BMITracker') {
            iconName = 'scale-bathroom'; 
            label = 'BMI';
          } else if (route.name === 'AddAction') {
            iconName = 'plus';
          } else if (route.name === 'Activity') {
            iconName = 'history'; // history_edu
            label = 'Tracker';
          } else if (route.name === 'Profile') {
            iconName = 'account';
            label = 'Profile';
          }

          if (route.name === 'AddAction') {
            // Floating Center Button
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.floatingButtonWrapper}
              >
                <View style={styles.floatingButton}>
                  <Image 
                    source={require('../../assets/icon.png')} 
                    style={styles.logoImage} 
                    resizeMode="cover" 
                  />
                </View>
              </TouchableOpacity>
            );
          }

          // Standard Nav buttons
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <MaterialCommunityIcons 
                name={iconName} 
                size={24} 
                color={isFocused ? '#ed254e' : '#9ca3af'} 
              />
              <Text style={[
                styles.tabLabel, 
                { color: isFocused ? '#ed254e' : '#9ca3af' }
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Dummy component for the 'AddAction' route so the navigator doesn't crash
const DummyScreen = () => <View />;

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BMITracker" component={BMIScreen} />
      <Tab.Screen name="AddAction" component={DummyScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12, // account for home indicator on iOS
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  floatingButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -30, // Negative margin to push it out of the container
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fdeaf0',
  },
  logoImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  }
});
