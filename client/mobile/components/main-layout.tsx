import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/app-header';
import { BottomNavigation } from '@/components/bottom-navigation';
import { SidebarMenu } from '@/components/sidebar-menu';

const isWeb = Platform.OS === 'web';

interface MainLayoutProps {
  children: React.ReactNode;
  /** Titre de la page (si défini, la barre de recherche est masquée) */
  title?: string;
  /** Afficher la barre de recherche (accueil) */
  showSearch?: boolean;
}

/**
 * Layout commun : sur web = header avec menu burger, pas de bottom nav.
 * Sur mobile = header sans burger, bottom navigation en bas.
 */
export function MainLayout({ children, title, showSearch = false }: MainLayoutProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <AppHeader
        title={title}
        showSearch={showSearch}
        showCart={true}
        showMenu={isWeb}
        onMenuPress={() => setSidebarVisible(true)}
        showCurrency={true}
      />
      <View style={{ flex: 1 }}>{children}</View>
      {!isWeb && <BottomNavigation />}
      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </SafeAreaView>
  );
}
