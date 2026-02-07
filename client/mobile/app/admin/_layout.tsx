import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';

export default function AdminLayout() {
  const { user, isRestored } = useAuth();

  if (!isRestored) return null;
  if (!user || user.role !== 'ADMIN') {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: true, title: 'Espace Admin' }}>
      <Stack.Screen name="index" options={{ title: 'Tableau de bord' }} />
    </Stack>
  );
}
