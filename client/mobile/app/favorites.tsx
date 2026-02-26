import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout } from '@/components/main-layout';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function FavoritesScreen() {
  return (
    <MainLayout title="Favoris">
      <View style={styles.container}>
        <Text style={styles.title}>Favoris</Text>
        <Text style={styles.placeholder}>Aucun produit en favoris.</Text>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F9FAFB' },
  title: { fontSize: 22, fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: 16 },
  placeholder: { fontSize: 16, color: '#6B7280' },
});
