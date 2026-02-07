import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  headerColor?: string;
  icon?: string;
  contentStyle?: any;
}

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  headerColor = PRIMARY_COLOR,
  icon,
  contentStyle,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, { backgroundColor: headerColor }]}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <View style={styles.headerContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={20}
              color="#FFFFFF"
              style={styles.icon}
            />
          )}
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <Ionicons
          name={isExpanded ? 'remove' : 'add'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
});


