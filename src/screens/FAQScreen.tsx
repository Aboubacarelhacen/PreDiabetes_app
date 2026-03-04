import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FAQ_MOCK_DATA, FAQ } from '../data/mockData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const FAQScreen = () => {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_MOCK_DATA[0].id);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderFAQItem = (item: FAQ) => {
    const isExpanded = expandedId === item.id;
    return (
      <View key={item.id} style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}>
        <TouchableOpacity 
          style={styles.faqHeader} 
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.questionText, isExpanded && styles.questionTextExpanded]}>
            {item.question}
          </Text>
          <MaterialIcons 
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color={isExpanded ? '#ed254e' : '#56898f'} 
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.faqBody}>
            <Text style={styles.answerText}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>S.S.S.</Text>
        <View style={styles.iconButtonSpacer} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Sıkça Sorulan Sorular</Text>
          <Text style={styles.introText}>
            Prediyabet (Gizli Şeker) hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
          </Text>
        </View>

        <View style={styles.faqList}>
          {FAQ_MOCK_DATA.map(renderFAQItem)}
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  iconButtonSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f181a',
    letterSpacing: -0.5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  introSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f181a',
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: '#56898f',
    lineHeight: 22,
  },
  faqList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  faqCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  faqCardExpanded: {
    borderColor: '#fdeaf0',
    backgroundColor: '#ffffff',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0f181a',
    paddingRight: 16,
    lineHeight: 22,
  },
  questionTextExpanded: {
    color: '#2aa6b7',
  },
  faqBody: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  answerText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  }
});
