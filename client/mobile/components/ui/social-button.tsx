import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SocialProvider = 'facebook' | 'google' | 'apple';

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  size?: number;
}

export function SocialButton({ provider, onPress, size = 50 }: SocialButtonProps) {
  const getIconAndColor = () => {
    switch (provider) {
      case 'facebook':
        return {
          name: 'logo-facebook' as const,
          backgroundColor: '#1877F2',
          iconColor: '#FFFFFF',
        };
      case 'google':
        return {
          name: 'logo-google' as const,
          backgroundColor: '#FFFFFF',
          iconColor: '#4285F4',
          borderColor: '#E5E7EB',
        };
      case 'apple':
        return {
          name: 'logo-apple' as const,
          backgroundColor: '#000000',
          iconColor: '#FFFFFF',
        };
    }
  };

  const { name, backgroundColor, iconColor, borderColor } = getIconAndColor();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: size, height: size, backgroundColor },
        borderColor && { borderWidth: 1, borderColor },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={name} size={size * 0.5} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


