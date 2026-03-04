import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { BMIScreen } from '../screens/BMIScreen';
import { RecommendationsScreen } from '../screens/RecommendationsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ExploreMenuScreen } from '../screens/ExploreMenuScreen';
import { FAQScreen } from '../screens/FAQScreen';
import { AboutUsScreen } from '../screens/AboutUsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { MealLogScreen } from '../screens/MealLogScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  BMI: undefined;
  Recommendations: undefined;
  Risk: undefined;
  ExploreMenu: undefined;
  FAQ: undefined;
  AboutUs: undefined;
  Contact: undefined;
  MealLog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import { NavigationContainer } from '@react-navigation/native';
import { RiskStackNavigator } from './RiskStackNavigator';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Tabs" component={BottomTabNavigator} />
        <Stack.Screen name="BMI" component={BMIScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
        <Stack.Screen name="Risk" component={RiskStackNavigator} />
        <Stack.Screen 
          name="ExploreMenu" 
          component={ExploreMenuScreen} 
          options={{ presentation: 'modal' }} 
        />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="MealLog" component={MealLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
