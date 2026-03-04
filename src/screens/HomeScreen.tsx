import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: Props) => {
  const { profile, bmiHistory, riskResult, activityLogs } = useUser();
  const insets = useSafeAreaInsets();

  const latestBmi = bmiHistory[0]?.bmi;
  const todayActivity = activityLogs.find(
    log => log.date === new Date().toISOString().split('T')[0]
  );

  const userName = profile?.name ? profile.name.split(' ')[0] : 'Alex';
  const fullName = profile?.name || 'Alex Johnson';

  const displayScore = riskResult ? riskResult.score.toString() : '--';
  const displayLevel = riskResult ? riskResult.level : 'Unknown';
  let statusText = 'Complete Assessment to see risk';
  let progressWidth = '0%';
  let statusIcon = 'information';
  let statusColor = '#ffffff';

  if (riskResult) {
    if (riskResult.level === 'Low') {
      statusText = 'Low Risk - Great condition!';
      progressWidth = '20%';
      statusIcon = 'check-circle';
      statusColor = '#86efac';
    } else if (riskResult.level === 'Moderate') {
      statusText = 'Moderate Risk - Keep an eye on health';
      progressWidth = '60%';
      statusIcon = 'alert-circle';
      statusColor = '#facc15';
    } else if (riskResult.level === 'High') {
      statusText = 'High Risk - Consult your doctor';
      progressWidth = '90%';
      statusIcon = 'alert';
      statusColor = '#f87171';
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, 20) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtVAZXweT0EZR_96adUbZtB30zJ6elMDALyauzU1kVRd6fP31Ac2IFSV1x61C8T_KdYPyB7og0_Gpb0j1hSib0JE_Ck42O7pm9OG_cTjo_IBK7uYOgP8EccptRp_0lIosTcwLGW7yc3wacGv2bqBEaGT9p5n0t_RqZEXfWX7LNiPqvSeU-sBPqYw72TMFbaTcmczdRYLiX35MIsU446-clO7VqgleCFQyrrLP3gl-HMrOpq047jh633zPQ9DG7Dng6fXrA1dNQQfY' }} 
              style={styles.profileImage} 
            />
            <View>
              <Text style={styles.welcomeText}>WELCOME BACK</Text>
              <Text style={styles.userNameText}>{fullName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell" size={20} color="#0f181a" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>
            Good Evening, <Text style={styles.primaryText}>{userName}</Text>
          </Text>
          <Text style={styles.greetingSubtitle}>Here is your daily health breakdown.</Text>
        </View>

        {/* Main Risk Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#ed254e', '#aa1534']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.riskCard}
          >
            {/* Decorative background blurs via views */}
            <View style={styles.blurCircleTopRight} />
            <View style={styles.blurCircleBottomLeft} />

            <View style={styles.riskHeader}>
              <View style={styles.aiBadge}>
                <MaterialCommunityIcons name="shield-check" size={12} color="#FFFFFF" />
                <Text style={styles.aiBadgeText}>AI Analysis</Text>
              </View>
              <Text style={styles.updateText}>Updated just now</Text>
            </View>

            <View style={styles.scoreRow}>
              <Text style={styles.scoreText}>{displayScore}</Text>
              {riskResult && <Text style={styles.scoreTextSmall}>/ 20</Text>}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressTrack}>
              <View style={[styles.progressBar, { width: progressWidth as any }]} />
            </View>

            <View style={styles.statusRow}>
              <MaterialCommunityIcons name={statusIcon as any} size={16} color={statusColor} />
              <Text style={styles.statusText}>{statusText}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Chips (Horizontal Scroll) */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScrollContainer}
        >
          {/* BMI Card */}
          <View style={styles.statChip}>
            <View style={styles.iconBoxBlue}>
              <MaterialCommunityIcons name="weight" size={20} color="#2563eb" />
            </View>
            <View>
              <Text style={styles.statLabel}>BMI</Text>
              <Text style={styles.statValue}>{latestBmi ? latestBmi.toFixed(1) : '22.4'}</Text>
            </View>
          </View>

          {/* Steps Card */}
          <View style={styles.statChip}>
            <View style={styles.iconBoxOrange}>
              <MaterialCommunityIcons name="shoe-print" size={20} color="#ea580c" />
            </View>
            <View>
              <Text style={styles.statLabel}>Steps</Text>
              <Text style={styles.statValue}>{todayActivity?.steps ? todayActivity.steps.toLocaleString() : '4,532'}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Quick Actions Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            
            {/* Take Risk Test (Full width) */}
            <TouchableOpacity 
              style={styles.largeActionCard}
              onPress={() => navigation.navigate('Risk')}
              activeOpacity={0.8}
            >
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrapper}>
                  <MaterialCommunityIcons name="medical-bag" size={20} color="#ed254e" />
                </View>
                <View>
                  <Text style={styles.actionTitle}>Take Risk Test</Text>
                  <Text style={styles.actionSubtitle}>Deep dive analysis</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>

            {/* Track BMI (Half width) */}
            <TouchableOpacity 
              style={styles.smallActionCard}
              onPress={() => navigation.navigate('BMITracker')}
              activeOpacity={0.8}
            >
              <View style={styles.smallIconWrapperPurple}>
                <MaterialCommunityIcons name="calculator" size={20} color="#9333ea" />
              </View>
              <View>
                <Text style={styles.smallActionTitle}>Track BMI</Text>
                <Text style={styles.smallActionSubtitle}>Update weight</Text>
              </View>
            </TouchableOpacity>

            {/* Log Activity (Half width) */}
            <TouchableOpacity 
              style={styles.smallActionCard}
              onPress={() => navigation.navigate('Activity')}
              activeOpacity={0.8}
            >
              <View style={styles.smallIconWrapperGreen}>
                <MaterialCommunityIcons name="run" size={20} color="#16a34a" />
              </View>
              <View>
                <Text style={styles.smallActionTitle}>Log Activity</Text>
                <Text style={styles.smallActionSubtitle}>Add workout</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* Daily Health Tip */}
        <View style={styles.tipContainer}>
          <LinearGradient
            colors={['#eff6ff', '#e0e7ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tipCard}
          >
            <View style={styles.tipIconWrapper}>
              <MaterialCommunityIcons name="lightbulb-on" size={24} color="#eab308" />
            </View>
            <View style={styles.tipTexts}>
              <Text style={styles.tipTitle}>Daily Tip: Hydration</Text>
              <Text style={styles.tipDescription}>
                Drinking water before meals can help you feel fuller and manage your weight more effectively.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Bottom padding to account for the custom bottom tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f8', // background-light
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#ed254e',
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#56898f',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f181a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  greetingContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f181a',
    letterSpacing: -0.5,
  },
  primaryText: {
    color: '#ed254e',
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#56898f',
    marginTop: 6,
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  riskCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#ed254e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  blurCircleTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  blurCircleBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  aiBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  updateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 16,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1,
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    fontWeight: '600',
  },
  scoreTextSmall: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  statsScrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  iconBoxBlue: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxOrange: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#56898f',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f181a',
    marginTop: 2,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f181a',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  largeActionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(237, 37, 78, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#56898f',
    marginTop: 4,
  },
  smallActionCard: {
    width: (width - 48 - 16) / 2, // Half width minus padding and gap
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  smallIconWrapperPurple: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#faf5ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIconWrapperGreen: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallActionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f181a',
  },
  smallActionSubtitle: {
    fontSize: 10,
    color: '#56898f',
    marginTop: 2,
  },
  tipContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  tipIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tipTexts: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f181a',
  },
  tipDescription: {
    fontSize: 13,
    color: '#56898f',
    marginTop: 6,
    lineHeight: 20,
  },
});
