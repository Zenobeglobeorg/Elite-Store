import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
  token: string;
}

export interface ApiError {
  message: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...fetchOptions, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err: ApiError = { message: (data as ApiError).message || 'Erreur réseau' };
    throw err;
  }
  return data as T;
}

export const authApi = {
  register(name: string, email: string, password: string) {
    return request<AuthResponse>(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login(email: string, password: string) {
    return request<AuthResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

export function apiWithToken(token: string) {
  return {
    getBuyerMe() {
      return request<{ user: User; message: string }>(API_ENDPOINTS.buyer.me, { token });
    },
    getSellerMe() {
      return request<{ user: User; message: string }>(API_ENDPOINTS.seller.me, { token });
    },
    getAdminDashboard() {
      return request<{ message: string }>(API_ENDPOINTS.admin.dashboard, { token });
    },
  };
}
