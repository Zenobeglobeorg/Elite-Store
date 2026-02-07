import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from './api';

const TOKEN_KEY = '@elite_store_token';
const USER_KEY = '@elite_store_user';

export const authStorage = {
  async setToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  async setUser(user: User | null) {
    if (user === null) await AsyncStorage.removeItem(USER_KEY);
    else await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  async getUser(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
  async clear() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};
