import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants/theme';

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
  onMenuPress?: () => void;
  showCurrency?: boolean;
}

export function AppHeader({
  title,
  showSearch = false,
  showCart = true,
  showMenu = true,
  onMenuPress,
  showCurrency = true,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {showMenu && (
          <TouchableOpacity
            onPress={onMenuPress}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : showSearch ? (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Chercher un produit...."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        ) : (
          <View style={styles.flex} />
        )}

        {showCurrency && (
          <View style={styles.currencyContainer}>
            <Text style={styles.currencyText}>FCFA</Text>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.flagIcon}
            />
          </View>
        )}

        {showCart && (
          <TouchableOpacity
            onPress={() => router.push('/cart')}
            style={styles.cartButton}
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: PRIMARY_COLOR,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PRIMARY_COLOR,
  },
  menuButton: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 40,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  flex: {
    flex: 1,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  currencyText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 4,
    fontWeight: '500',
  },
  flagIcon: {
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  cartButton: {
    marginLeft: 8,
  },
});


