import { PRIMARY_COLOR, PRIMARY_COLOR_DARK, PRIMARY_COLOR_LIGHT } from '@/constants/theme';

/**
 * Hook to get primary brand colors extracted from logo
 * This makes it easy to update colors globally by changing the constants
 */
export function usePrimaryColor() {
  return {
    primary: PRIMARY_COLOR,
    primaryDark: PRIMARY_COLOR_DARK,
    primaryLight: PRIMARY_COLOR_LIGHT,
  };
}

