import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

type PlanType = 'standard' | 'premium' | 'vip';
type PeriodType = 'mensuel' | 'annuel';

export default function BecomePartnerScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<PeriodType>('mensuel');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const plans = {
    mensuel: {
      standard: { price: '5 000', priceLabel: '5 000 FCFA / MOIS' },
      premium: { price: '15 000', priceLabel: '15 000 FCFA / MOIS' },
      vip: { price: '35 000', priceLabel: '35 000 FCFA / MOIS' },
    },
    annuel: {
      standard: { price: '50 000', priceLabel: '50 000 FCFA / AN', savings: '10 000' },
      premium: { price: '150 000', priceLabel: '150 000 FCFA / AN', savings: '30 000' },
      vip: { price: '350 000', priceLabel: '350 000 FCFA / AN', savings: '70 000' },
    },
  };

  const features = {
    standard: [
      'Boutique virtuelle basique (Logo + Nom)',
      'Badge Vendeur Vérifié',
      'Ajout de 50 produits maximum',
      'Gestion du stock en temps réel',
      'Catalogue WhatsApp Intégré',
      'Création automatique QR Code pour une commande',
      'Intégration de chat client vendeur',
    ],
    premium: [
      'Boutique Identité Plus: Personnalisation complète',
      'Ventes Illimitées',
      'Stocks en Temps Réel',
      'Factures & QR Code',
      'Catalogue Intégré (WhatsApp et Facebook)',
      'Visibilité Prioritaire',
      'Promotions Automatiques',
      'Relance Paniers',
      'Statistiques Pro',
      'Intégration de chat client vendeur',
    ],
    vip: [
      'Toutes les fonctionnalités PREMIUM',
      'Badge "Vendeur Certifié VIP"',
      'Système de Fidélité (Cashback)',
      'Photos IA',
    ],
  };

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    if (plan === 'standard') {
      router.push('/create-shop-standard');
    } else if (plan === 'premium') {
      router.push('/create-shop-premium');
    } else {
      router.push('/create-shop-premium'); // VIP uses premium form for now
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <AppHeader
        title="Devenir partenaire Elite"
        showMenu={false}
        showCart={false}
        showCurrency
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Devenir vendeur Elite</Text>
          <Text style={styles.subtitle}>
            Choisissez votre forfait et lancer votre business
          </Text>
        </View>

        {/* Period Toggle */}
        <View style={styles.periodToggle}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'mensuel' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod('mensuel')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === 'mensuel' && styles.periodButtonTextActive,
              ]}
            >
              Mensuel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'annuel' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod('annuel')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === 'annuel' && styles.periodButtonTextActive,
              ]}
            >
              Annuel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {/* STANDARD Plan */}
          <View style={styles.planCard}>
            <View style={[styles.planHeader, { backgroundColor: PRIMARY_COLOR }]}>
              <Text style={styles.planName}>STANDARD</Text>
              <Text style={styles.planPrice}>
                {plans[period].standard.priceLabel}
              </Text>
            </View>
            <View style={styles.planFeatures}>
              {features.standard.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={PRIMARY_COLOR} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <Button
              title="Choisir"
              onPress={() => handleSelectPlan('standard')}
              style={styles.selectButton}
            />
            {period === 'annuel' && (
              <Text style={styles.savingsText}>
                Economisez jusqu'à {plans[period].standard.savings} FCFA
              </Text>
            )}
          </View>

          {/* PREMIUM Plan */}
          <View style={styles.planCard}>
            <View style={[styles.planHeader, { backgroundColor: PRIMARY_COLOR }]}>
              <Text style={styles.planName}>PREMIUM</Text>
              <Text style={styles.planPrice}>
                {plans[period].premium.priceLabel}
              </Text>
            </View>
            <View style={styles.planFeatures}>
              {features.premium.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={PRIMARY_COLOR} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <Button
              title="Choisir"
              onPress={() => handleSelectPlan('premium')}
              style={styles.selectButton}
            />
            {period === 'annuel' && (
              <Text style={styles.savingsText}>
                Economisez jusqu'à {plans[period].premium.savings} FCFA
              </Text>
            )}
          </View>

          {/* VIP Plan */}
          <View style={styles.planCard}>
            <View style={[styles.planHeader, { backgroundColor: PRIMARY_COLOR }]}>
              <Text style={styles.planName}>VIP</Text>
              <Text style={styles.planPrice}>
                {plans[period].vip.priceLabel}
              </Text>
            </View>
            <View style={styles.planFeatures}>
              {features.vip.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={PRIMARY_COLOR} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <Button
              title="Choisir"
              onPress={() => handleSelectPlan('vip')}
              style={styles.selectButton}
            />
            {period === 'annuel' && (
              <Text style={styles.savingsText}>
                Economisez jusqu'à {plans[period].vip.savings} FCFA
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  periodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  plansContainer: {
    gap: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  planHeader: {
    padding: 20,
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  planFeatures: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  selectButton: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    textAlign: 'center',
    marginBottom: 16,
  },
});


