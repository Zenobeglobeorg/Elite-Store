import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, getInitialRouteForRole } from '@/contexts/AuthContext';
import { PRIMARY_COLOR } from '@/constants/theme';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    setApiError(null);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const name = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim() || formData.email;
    try {
      const user = await registerUser(name, formData.email.trim(), formData.password);
      router.replace(getInitialRouteForRole(user.role));
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err ? String((err as { message: string }).message) : 'Inscription impossible';
      setApiError(message);
    }
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
            {/* Title */}
            <Text style={styles.title}>INSCRIPTION</Text>
            <Text style={styles.subtitle}>
              Inscrivez-vous pour vous connecter à l'application
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Nom (s)*"
                value={formData.lastName}
                onChangeText={(text) => updateField('lastName', text)}
                placeholder="Entrez votre nom"
                error={errors.lastName}
              />

              <Input
                label="Prénom (s)*"
                value={formData.firstName}
                onChangeText={(text) => updateField('firstName', text)}
                placeholder="Entrez votre prénom"
                error={errors.firstName}
              />

              <Input
                label="Email*"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Téléphone (optionnel)"
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                placeholder="Entrez votre numéro"
                keyboardType="phone-pad"
                error={errors.phone}
              />

              <Input
                label="Pays"
                value={formData.country}
                onChangeText={(text) => updateField('country', text)}
                placeholder="Entrez votre pays"
                error={errors.country}
              />

              <Input
                label="Mot de passe"
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirmer le Mot de passe"
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                placeholder="Confirmez votre mot de passe"
                secureTextEntry
                error={errors.confirmPassword}
              />

              {apiError ? (
                <Text style={styles.apiError}>{apiError}</Text>
              ) : null}
              <View style={styles.buttonContainer}>
                <Button
                  title="S'inscrire"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Se connecter</Text>
                </TouchableOpacity>
              </Link>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
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
  apiError: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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


