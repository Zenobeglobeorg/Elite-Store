import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

interface CategoryCardProps {
  title: string;
  icon?: string;
  image?: any;
  onPress?: () => void;
}

const iconMap: Record<string, string> = {
  Beauté: 'sparkles',
  Maison: 'home',
  Santé: 'heart',
  Alimentation: 'fast-food',
  Mode: 'shirt',
  Electronique: 'laptop',
  Sport: 'football',
  Enfants: 'baby',
};

export function CategoryCard({ title, icon, image, onPress }: CategoryCardProps) {
  const iconName = icon || iconMap[title] || 'cube';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <Ionicons name={iconName as any} size={32} color={PRIMARY_COLOR} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 16,
    width: 80,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
});


