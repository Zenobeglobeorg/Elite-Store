import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

interface NavItem {
  name: string;
  label: string;
  icon: string;
  route: string;
}

const navItems: NavItem[] = [
  { name: 'home', label: 'Home', icon: 'home', route: '/(tabs)' },
  { name: 'cart', label: 'Panier', icon: 'cart', route: '/cart' },
  { name: 'favorites', label: 'Favoris', icon: 'heart', route: '/favorites' },
  { name: 'orders', label: 'Com...', icon: 'document-text', route: '/orders' },
  { name: 'wallet', label: 'Porte...', icon: 'wallet', route: '/elite-cash' },
  { name: 'profile', label: 'Profil', icon: 'person', route: '/profile' },
  { name: 'settings', label: 'Para...', icon: 'settings', route: '/settings' },
  { name: 'explore', label: 'explore', icon: 'search', route: '/(tabs)/explore' },
];

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/(tabs)') {
      return pathname === '/(tabs)' || pathname === '/';
    }
    return pathname?.startsWith(route);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => router.push(item.route as any)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color={isActive(item.route) ? PRIMARY_COLOR : '#9CA3AF'}
          />
          <Text
            style={[
              styles.navLabel,
              isActive(item.route) && styles.navLabelActive,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navLabelActive: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
});

