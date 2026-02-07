import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { PRIMARY_COLOR } from '@/constants/theme';

interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SidebarMenu({ visible, onClose }: SidebarMenuProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const menuItems = [
    {
      title: 'Mon Profil',
      icon: 'person-outline',
      onPress: () => {
        onClose();
        router.push('/profile');
      },
    },
    {
      title: 'Historique des achats',
      icon: 'receipt-outline',
      onPress: () => {
        onClose();
        router.push('/purchase-history');
      },
    },
    {
      title: 'Mes favoris',
      icon: 'heart-outline',
      onPress: () => {
        onClose();
        router.push('/favorites');
      },
    },
  ];

  const financialItems = [
    {
      title: 'Mon Portefeuille',
      icon: 'wallet-outline',
      onPress: () => {
        onClose();
        router.push('/elite-cash');
      },
    },
    {
      title: 'Recharger / Retirer',
      icon: 'swap-horizontal-outline',
      onPress: () => {
        onClose();
        router.push('/elite-cash');
      },
    },
    {
      title: 'Mes Transactions',
      icon: 'list-outline',
      onPress: () => {
        onClose();
        router.push('/elite-cash');
      },
    },
  ];

  const partnerItems = [
    {
      title: 'Ouvrir ma Boutique (Vendeur)',
      icon: 'storefront-outline',
      onPress: () => {
        onClose();
        router.push('/become-partner');
      },
    },
    {
      title: 'Devenir Livreur',
      icon: 'bicycle-outline',
      onPress: () => {
        onClose();
        router.push('/become-delivery');
      },
    },
  ];

  const supportItems = [
    {
      title: 'Assistance client',
      icon: 'help-circle-outline',
      onPress: () => {
        onClose();
        router.push('/support');
      },
    },
    {
      title: 'FAQ',
      icon: 'chatbubble-ellipses-outline',
      onPress: () => {
        onClose();
        router.push('/faq');
      },
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={item.icon as any} size={22} color="#FFFFFF" />
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderSection = (title: string, items: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map(renderMenuItem)}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu Principal</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.mainItems}>
            {menuItems.map(renderMenuItem)}
          </View>

          {user?.role === 'ADMIN' && renderSection('Administration', [
            {
              title: 'Espace Admin',
              icon: 'shield-checkmark-outline',
              onPress: () => {
                onClose();
                router.push('/admin');
              },
            },
          ])}
          {renderSection('Gestion Financière Elite Cash', financialItems)}
          {renderSection('Devenir Partenaire', partnerItems)}
          {renderSection('Support & Aide', supportItems)}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              router.push('/settings');
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Paramètre</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={async () => {
              onClose();
              try {
                await logout();
              } finally {
                // Toujours rediriger vers welcome (évite le cas où index redirige encore vers (tabs) avec state pas à jour)
                router.replace('/welcome');
              }
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Déconnexion</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  mainItems: {
    paddingVertical: 8,
  },
  section: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 12,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  logoutItem: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 20,
  },
});


