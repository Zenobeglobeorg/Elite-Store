import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/contexts/AuthContext';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <MainLayout title="Profil">
      <View style={styles.container}>
        <Text style={styles.title}>Mon profil</Text>
        {user && (
          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            {user.name && (
              <>
                <Text style={styles.label}>Nom</Text>
                <Text style={styles.value}>{user.name}</Text>
              </>
            )}
            <Text style={styles.label}>Rôle</Text>
            <Text style={styles.value}>{user.role}</Text>
          </View>
        )}
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
  info: {
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});
