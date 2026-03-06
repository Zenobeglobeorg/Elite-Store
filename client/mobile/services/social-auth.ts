import type { AuthResponse } from './api';
import { loginWithGoogle } from './google-auth';

export type SocialProvider = 'facebook' | 'google' | 'apple';

export interface GoogleSignInResult {
  success: boolean;
  data?: AuthResponse;
  error?: string;
}

/**
 * Lance le flux OAuth Google et renvoie le résultat (token + user Elite Store)
 * Utilisé dans login.tsx, register.tsx et welcome.tsx
 */
export async function handleGoogleSignIn(): Promise<GoogleSignInResult> {
  try {
    const data = await loginWithGoogle();
    if (!data) {
      return { success: false, error: 'Connexion Google annulée' };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'message' in err
        ? String((err as { message: string }).message)
        : 'Erreur lors de la connexion Google';
    return { success: false, error: message };
  }
}
