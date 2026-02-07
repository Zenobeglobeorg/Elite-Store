import { Redirect } from 'expo-router';

import { useAuth, getInitialRouteForRole } from '@/contexts/AuthContext';

export default function Index() {
  const { user, isRestored } = useAuth();

  if (!isRestored) {
    return null;
  }
  if (user) {
    return <Redirect href={getInitialRouteForRole(user.role)} />;
  }
  return <Redirect href="/welcome" />;
}


