import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

export const ContactScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color="#0f181a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={styles.iconButtonClear} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="headset" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroSubtitle}>We're here to assist you with any questions about your risk assessment or using the app.</Text>
        </View>

        <View style={styles.optionsList}>
          <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: '#eff6ff' }]}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#2563eb" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Email Us</Text>
                <Text style={styles.cardSubtitle}>support@prediabetes.tr</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: '#f0fdf4' }]}>
                <MaterialCommunityIcons name="phone-outline" size={24} color="#16a34a" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Call Us</Text>
                <Text style={styles.cardSubtitle}>+90 (212) 555 0123</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(246, 248, 248, 0.95)',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconButtonClear: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f181a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(237, 37, 78, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f181a',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#56898f',
    textAlign: 'center',
    lineHeight: 22,
  },
  optionsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#56898f',
    marginTop: 2,
  },
});
