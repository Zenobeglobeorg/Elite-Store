import { useAuth } from '@/contexts/AuthContext';
import { apiWithToken } from '@/services/api';
import { PRIMARY_COLOR } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function AdminDashboardScreen() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const api = apiWithToken(token);
    api
      .getAdminDashboard()
      .then((res) => setMessage(res.message))
      .catch((err) => setError(err?.message || 'Erreur'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Tableau de bord Admin</Text>
        <Text style={styles.subtitle}>Connecté en tant qu’administrateur</Text>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Rôle</Text>
            <Text style={styles.value}>{user.role}</Text>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loader} />}
        {error && <Text style={styles.error}>{error}</Text>}
        {!loading && message && <Text style={styles.apiMessage}>{message}</Text>}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)')}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>Retour à l’accueil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  userInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  loader: {
    marginVertical: 16,
  },
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
  },
  apiMessage: {
    color: '#059669',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
