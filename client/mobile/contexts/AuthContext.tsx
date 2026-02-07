import { authApi, type User, type UserRole } from '@/services/api';
import { authStorage } from '@/services/auth-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isRestored: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestored, setIsRestored] = useState(false);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    authStorage.setUser(u);
  }, []);

  const restoreSession = useCallback(async () => {
    const storedToken = await authStorage.getToken();
    const storedUser = await authStorage.getUser();
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUserState(storedUser);
    }
    setIsRestored(true);
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await authApi.login(email, password);
      const userData: User = { id: res.id, name: res.name, email: res.email, role: res.role };
      await authStorage.setToken(res.token);
      await authStorage.setUser(userData);
      setTokenState(res.token);
      setUserState(userData);
      return userData;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await authApi.register(name, email, password);
      const userData: User = { id: res.id, name: res.name, email: res.email, role: res.role };
      await authStorage.setToken(res.token);
      await authStorage.setUser(userData);
      setTokenState(res.token);
      setUserState(userData);
      return userData;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authStorage.clear();
    setTokenState(null);
    setUserState(null);
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    isRestored,
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Redirige selon le rôle après login/register. */
export function getInitialRouteForRole(role: UserRole): string {
  switch (role) {
    case 'ADMIN':
      return '/admin';
    case 'SELLER':
      return '/(tabs)';
    case 'BUYER':
    default:
      return '/(tabs)';
  }
}
