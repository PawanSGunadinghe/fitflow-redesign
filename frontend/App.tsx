import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'nutrition' | 'community'>('workouts');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Welcome back, Alex</Text>
          <Text style={styles.titleText}>FitFlow Redesign</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 14-Day Streak</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {(['workouts', 'nutrition', 'community'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'workouts' && (
          <View>
            {/* Daily Flow AI Card */}
            <View style={styles.dailyFlowCard}>
              <View style={styles.aiTag}>
                <Text style={styles.aiTagText}>✨ AI Daily Flow Recommendation</Text>
              </View>
              <Text style={styles.cardTitle}>HIIT & Mobility Primer</Text>
              <Text style={styles.cardDesc}>
                Adapted for your tight 25-min lunch window and mild lower back tightness reported yesterday.
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>25 min</Text>
                  <Text style={styles.statLabel}>Duration</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>280 kcal</Text>
                  <Text style={styles.statLabel}>Est. Burn</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>Moderate</Text>
                  <Text style={styles.statLabel}>Intensity</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Start Workout</Text>
              </TouchableOpacity>
            </View>

            {/* Drag & Drop Builder Shortcut */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Custom Workout Builder</Text>
              <Text style={styles.cardDesc}>
                Drag, reorder, or swap exercises seamlessly with 60 FPS fluidity.
              </Text>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Open Builder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'nutrition' && (
          <View>
            {/* Instant Camera Food Logging */}
            <View style={styles.dailyFlowCard}>
              <View style={styles.aiTag}>
                <Text style={styles.aiTagText}>📷 Instant Computer Vision Logging</Text>
              </View>
              <Text style={styles.cardTitle}>Snap & Track Meal</Text>
              <Text style={styles.cardDesc}>
                Eliminate tedious manual text searching. Capture your plate and let our ML model estimate macros in &lt;800ms.
              </Text>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Open Camera Scanner</Text>
              </TouchableOpacity>
            </View>

            {/* Today's Macros */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Today's Nutrition Summary</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>1,450 / 2,100</Text>
                  <Text style={styles.statLabel}>Calories (kcal)</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>115g / 140g</Text>
                  <Text style={styles.statLabel}>Protein</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'community' && (
          <View>
            {/* Private Circle */}
            <View style={styles.dailyFlowCard}>
              <View style={styles.aiTag}>
                <Text style={styles.aiTagText}>🛡️ Private Accountability Circle</Text>
              </View>
              <Text style={styles.cardTitle}>Sunrise Striders (4 Members)</Text>
              <Text style={styles.cardDesc}>
                Priya Singh just completed: "Morning 5K Jog" 🎉
              </Text>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Send High Five ✋</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Weekly Team Challenge</Text>
              <Text style={styles.cardDesc}>Collective 100,000 steps challenge: 72% completed!</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  greetingText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  titleText: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#38BDF8',
    fontWeight: '600',
    fontSize: 13,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1E293B',
  },
  tabButtonActive: {
    backgroundColor: '#38BDF8',
  },
  tabText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  dailyFlowCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  aiTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  aiTagText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDesc: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontWeight: '600',
  },
});
