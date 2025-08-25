import type { AppTheme } from './types';

export const theme: AppTheme = {
  vibes: {
    spicy: {
      name: 'Spicy',
      emoji: '🌶️',
      colors: {
        primary: '#FD5068', // Tinder red/pink
        secondary: '#FF6B35',
        background: '#121212', // Dark theme
        surface: '#1E1E1E', // Dark theme
        text: '#FFFFFF',
        textSecondary: '#CCCCCC', // Gray text
        accent: '#FF8C42',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      gradients: {
        main: 'linear-gradient(135deg, #FD5068 0%, #FF6B35 100%)', // Tinder gradient
        subtle: 'linear-gradient(135deg, rgba(253, 80, 104, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
        card: 'linear-gradient(135deg, rgba(253, 80, 104, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%)',
      },
    },
    chill: {
      name: 'Chill',
      emoji: '😌',
      colors: {
        primary: '#00D4AA',
        secondary: '#7FFFD4',
        background: '#121212', // Dark theme
        surface: '#1E1E1E', // Dark theme
        text: '#FFFFFF',
        textSecondary: '#CCCCCC', // Gray text
        accent: '#40FFD1',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      gradients: {
        main: 'linear-gradient(135deg, #00D4AA 0%, #7FFFD4 100%)',
        subtle: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(127, 255, 212, 0.1) 100%)',
        card: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(127, 255, 212, 0.05) 100%)',
      },
    },
    urban: {
      name: 'Urban',
      emoji: '🏙️',
      colors: {
        primary: '#FF1493',
        secondary: '#DA70D6',
        background: '#121212', // Dark theme
        surface: '#1E1E1E', // Dark theme
        text: '#FFFFFF',
        textSecondary: '#CCCCCC', // Gray text
        accent: '#FF69B4',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      gradients: {
        main: 'linear-gradient(135deg, #FF1493 0%, #DA70D6 100%)',
        subtle: 'linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(218, 112, 214, 0.1) 100%)',
        card: 'linear-gradient(135deg, rgba(255, 20, 147, 0.05) 0%, rgba(218, 112, 214, 0.05) 100%)',
      },
    },
    artsy: {
      name: 'Artsy',
      emoji: '🎨',
      colors: {
        primary: '#FFD700',
        secondary: '#FFA500',
        background: '#121212', // Dark theme
        surface: '#1E1E1E', // Dark theme
        text: '#FFFFFF', // White text for dark theme
        textSecondary: '#CCCCCC', // Gray text
        accent: '#FFEB3B',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      gradients: {
        main: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        subtle: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
        card: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%)',
      },
    },
    dluxe: {
      name: 'DLuxe',
      emoji: '💎',
      colors: {
        primary: '#40E0D0',
        secondary: '#00CED1',
        background: '#121212', // Dark theme
        surface: '#1E1E1E', // Dark theme
        text: '#FFFFFF',
        textSecondary: '#CCCCCC', // Gray text
        accent: '#48D1CC',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      gradients: {
        main: 'linear-gradient(135deg, #40E0D0 0%, #00CED1 100%)',
        subtle: 'linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(0, 206, 209, 0.1) 100%)',
        card: 'linear-gradient(135deg, rgba(64, 224, 208, 0.05) 0%, rgba(0, 206, 209, 0.05) 100%)',
      },
    },
  },
  common: {
    breakpoints: {
      mobile: '768px',
      tablet: '1024px', 
      desktop: '1024px',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      full: '9999px',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    typography: {
      fontFamily: {
        primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    shadows: {
      small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      large: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  },
};