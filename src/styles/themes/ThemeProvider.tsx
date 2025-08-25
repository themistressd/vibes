import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './theme';
import type { VibeType, VibeTheme, AppTheme } from './types';

interface ThemeContextValue {
  currentVibe: VibeType;
  setVibe: (vibe: VibeType) => void;
  getVibeTheme: (vibe?: VibeType) => VibeTheme;
  theme: AppTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialVibe?: VibeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialVibe = 'spicy' 
}) => {
  const [currentVibe, setCurrentVibe] = React.useState<VibeType>(initialVibe);

  const setVibe = React.useCallback((vibe: VibeType) => {
    setCurrentVibe(vibe);
  }, []);

  const getVibeTheme = React.useCallback((vibe?: VibeType): VibeTheme => {
    return theme.vibes[vibe || currentVibe];
  }, [currentVibe]);

  const contextValue: ThemeContextValue = {
    currentVibe,
    setVibe,
    getVibeTheme,
    theme,
  };

  const currentTheme = {
    ...theme,
    current: theme.vibes[currentVibe],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useVibeTheme = (vibe?: VibeType): VibeTheme => {
  const { getVibeTheme } = useTheme();
  return getVibeTheme(vibe);
};