import { Platform } from 'react-native';

/**
 * URL de base de l'API backend.
 * - iOS Simulator : localhost
 * - Android Emulator : 10.0.2.2 (ou ton IP locale si appareil physique)
 * En production, définir EXPO_PUBLIC_API_URL (ex: https://ton-api.railway.app)
 */
const getApiBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (__DEV__ && Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
  },
  buyer: {
    me: '/api/buyer/me',
  },
  seller: {
    me: '/api/seller/me',
  },
  admin: {
    dashboard: '/api/admin/dashboard',
  },
} as const;
