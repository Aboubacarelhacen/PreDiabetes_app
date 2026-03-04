import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* App-Consistent Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#0f181a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hakkımızda</Text>
        <View style={styles.iconButtonSpacer} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <Text style={styles.bodyText}>
            <Text style={styles.boldText}>PREDİABE-TR</Text> mobil uygulamasının geliştirilmesi ve
            kullanılabilirliğinin değerlendirilmesidir. Bu mobil
            uygulama prediyabetli bireylere sağlıkla ilgili
            konularda bilgi sunmak ve bireylerde sağlıklı yaşam
            biçimi davranışları oluşmasının sağlanmasını içermektedir.
          </Text>

          <View style={styles.imageGrid}>
            <Image 
              source={require('../../assets/about_us_1.png')} 
              style={styles.image}
              resizeMode="cover"
            />
            <Image 
              source={require('../../assets/about_us_2.png')} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ed254e', // Primary Red Background for Header area matching design
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#ed254e',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: -8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#f6f8f8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  contentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  bodyText: {
    fontSize: 15,
    color: '#0f181a',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'left',
  },
  boldText: {
    fontWeight: '800',
  },
  imageGrid: {
    gap: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  }
});
