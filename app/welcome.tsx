import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { EliteLogo } from '@/components/elite-logo';
import { Button } from '@/components/ui/button';
import { SocialButton } from '@/components/ui/social-button';
import { PRIMARY_COLOR } from '@/constants/theme';
import { useSocialAuth } from '@/services/social-auth';

export default function WelcomeScreen() {
  const { handleSocialLogin } = useSocialAuth();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <EliteLogo size={100} />
            </View>

            {/* App Name */}
            <Text style={styles.appName}>Elite Store</Text>

            {/* Slogan */}
            <Text style={styles.slogan}>L'excellence à bras ouverts.</Text>

            {/* Sign Up Button */}
            <View style={styles.buttonContainer}>
              <Link href="/register" asChild>
                <Button title="S'inscrire" onPress={() => {}} />
              </Link>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Vous avez déjà un compte ?</Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Se connecter</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <Text style={styles.socialText}>S'inscrire avec un autre compte</Text>
              <View style={styles.socialButtons}>
                <SocialButton
                  provider="facebook"
                  onPress={() => handleSocialLogin('facebook')}
                  size={56}
                />
                <SocialButton
                  provider="google"
                  onPress={() => handleSocialLogin('google')}
                  size={56}
                />
                <SocialButton
                  provider="apple"
                  onPress={() => handleSocialLogin('apple')}
                  size={56}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
    textAlign: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  slogan: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  socialContainer: {
    alignItems: 'center',
    width: '100%',
  },
  socialText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});


