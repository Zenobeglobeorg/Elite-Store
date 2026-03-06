import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';
import type { AuthResponse } from './api';

// Nécessaire pour que le navigateur web se ferme proprement sur mobile
WebBrowser.maybeCompleteAuthSession();

/**
 * Client ID Google OAuth 2.0.
 * Valeurs à renseigner dans les variables d'environnement :
 *   EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB     → depuis Google Cloud Console (client Web)
 *   EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS     → depuis Google Cloud Console (client iOS)
 *   EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID → depuis Google Cloud Console (client Android)
 */
const GOOGLE_CLIENT_ID_WEB =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB ?? '';
const GOOGLE_CLIENT_ID_IOS =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS ?? GOOGLE_CLIENT_ID_WEB;
const GOOGLE_CLIENT_ID_ANDROID =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID ?? GOOGLE_CLIENT_ID_WEB;

function getClientId() {
  if (Platform.OS === 'ios') return GOOGLE_CLIENT_ID_IOS;
  if (Platform.OS === 'android') return GOOGLE_CLIENT_ID_ANDROID;
  return GOOGLE_CLIENT_ID_WEB;
}

const DISCOVERY = AuthSession.useAutoDiscovery
  ? undefined
  : {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    };

// Scopes demandés à Google
const SCOPES = ['openid', 'profile', 'email'];

/**
 * Déclenche le flux OAuth Google et retourne un AuthResponse Elite Store
 * (même format que login/register) ou null si annulé / erreur.
 */
export async function loginWithGoogle(): Promise<AuthResponse | null> {
  const clientId = getClientId();

  if (!clientId) {
    throw new Error(
      "Google Client ID manquant. Renseigne EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB dans .env"
    );
  }

  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'elitestore' });

  // PKCE – code verifier + challenge
  const codeVerifier = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Math.random().toString(36) + Math.random().toString(36),
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );

  const request = new AuthSession.AuthRequest({
    clientId,
    redirectUri,
    scopes: SCOPES,
    responseType: AuthSession.ResponseType.Token,
    usePKCE: false,
  });

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const result = await request.promptAsync(discovery);

  if (result.type !== 'success') {
    if (result.type === 'cancel' || result.type === 'dismiss') return null;
    throw new Error(`Google auth failed: ${result.type}`);
  }

  // Récupérer le id_token via userinfo si on a un access_token
  const accessToken = result.params?.access_token;
  if (!accessToken) throw new Error("Aucun access_token reçu de Google");

  // Récupérer le profil utilisateur via l'API Google
  const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const profile = await profileRes.json();

  if (!profile.sub) {
    throw new Error("Impossible de récupérer le profil Google");
  }

  // Envoyer au backend Elite Store
  const apiRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.google}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: accessToken, profile }),
  });

  const data = await apiRes.json();
  if (!apiRes.ok) {
    throw new Error(data.message || "Erreur serveur lors de l'auth Google");
  }

  return data as AuthResponse;
}
