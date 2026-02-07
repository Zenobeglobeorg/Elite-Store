import React, { useState } from 'react';
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
import { Link, useRouter } from 'expo-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EliteLogo } from '@/components/elite-logo';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (!email.trim()) {
      setError("L'email est requis");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("L'email n'est pas valide");
      return;
    }
    console.log('Reset password for:', email);
    // TODO: Implement password reset logic
    alert('Un email de réinitialisation a été envoyé');
    router.back();
  };

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

            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.subtitle}>
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre
              mot de passe
            </Text>

            <View style={styles.form}>
              <Input
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
              />

              <View style={styles.buttonContainer}>
                <Button title="Envoyer le lien de réinitialisation" onPress={handleResetPassword} />
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Vous vous souvenez de votre mot de passe ? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Se connecter</Text>
                  </TouchableOpacity>
                </Link>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});


