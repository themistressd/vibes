export type VibeType = 'spicy' | 'chill' | 'urban' | 'artsy' | 'dluxe';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export interface VibeTheme {
  name: string;
  emoji: string;
  colors: ThemeColors;
  gradients: {
    main: string;
    subtle: string;
    card: string;
  };
}

export interface AppTheme {
  vibes: Record<VibeType, VibeTheme>;
  common: {
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      full: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    typography: {
      fontFamily: {
        primary: string;
        heading: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  };
}