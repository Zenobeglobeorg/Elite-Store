import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout } from '@/components/main-layout';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function SettingsScreen() {
  return (
    <MainLayout title="Paramètres">
      <View style={styles.container}>
        <Text style={styles.title}>Paramètres</Text>
        <Text style={styles.placeholder}>Préférences et paramètres du compte.</Text>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#6B7280',
  },
});
