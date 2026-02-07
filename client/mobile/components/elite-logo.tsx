import React from 'react';
import { View, Image, StyleSheet, ImageStyle } from 'react-native';

export function EliteLogo({ size = 80 }: { size?: number }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={require('@/assets/images/logo1.png')}
        style={[styles.logo, { width: size, height: size }] as ImageStyle}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

