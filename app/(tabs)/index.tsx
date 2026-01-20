import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/app-header';
import { SidebarMenu } from '@/components/sidebar-menu';
import { CategoryCard } from '@/components/category-card';
import { ProductCard } from '@/components/product-card';
import { BottomNavigation } from '@/components/bottom-navigation';
import { Button } from '@/components/ui/button';
import { PRIMARY_COLOR } from '@/constants/theme';

const categories = [
  { title: 'Beauté', icon: 'sparkles' },
  { title: 'Maison', icon: 'home' },
  { title: 'Santé', icon: 'heart' },
  { title: 'Alimentation', icon: 'fast-food' },
  { title: 'Mode', icon: 'shirt' },
  { title: 'Electronique', icon: 'laptop' },
  { title: 'Sport', icon: 'football' },
  { title: 'Enfants', icon: 'baby' },
];

const products = [
  { title: 'Fauteuils de luxe', price: '350.000fcfa' },
  { title: 'Sneakers noires', price: '45.000fcfa' },
  { title: 'Smartphone bleu', price: '120.000fcfa' },
  { title: 'Laptop argenté', price: '450.000fcfa' },
  { title: 'Montre brune', price: '85.000fcfa' },
  { title: 'Jug blanc', price: '12.000fcfa' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <AppHeader
        showSearch
        showCart
        showMenu
        onMenuPress={() => setSidebarVisible(true)}
        showCurrency
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                onPress={() => console.log(`Category: ${category.title}`)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promotion Banner */}
        <View style={styles.promotionContainer}>
          <ImageBackground
            source={require('@/assets/images/icon.png')}
            style={styles.promotionBanner}
            imageStyle={styles.promotionImage}
          >
            <View style={styles.promotionContent}>
              <Text style={styles.promotionGreeting}>SALUT!</Text>
              <Text style={styles.promotionTitle}>PROMOTION</Text>
              <Text style={styles.promotionSubtitle}>
                Produit à une Edition limitée
              </Text>
              <Text style={styles.promotionSubtitle}>
                Découvrez l'exclusivité
              </Text>
              <Button
                title="Découvrir"
                onPress={() => console.log('Discover promotion')}
                style={styles.promotionButton}
              />
            </View>
          </ImageBackground>
        </View>

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits</Text>
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                price={product.price}
                onPress={() => console.log(`Product: ${product.title}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />

      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
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
    paddingBottom: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  promotionContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  promotionBanner: {
    width: '100%',
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
  },
  promotionImage: {
    opacity: 0.2,
  },
  promotionContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  promotionGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  promotionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  promotionSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  promotionButton: {
    marginTop: 16,
    backgroundColor: '#111827',
    maxWidth: 150,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
