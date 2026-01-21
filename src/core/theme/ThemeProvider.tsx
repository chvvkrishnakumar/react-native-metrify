/**
 * Theme provider and context
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from '../types';
import { DefaultTheme } from './themes';

const ThemeContext = createContext<Theme>(DefaultTheme);

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

/**
 * Theme provider component
 * Wraps the app and provides theme to all widgets
 */
export function ThemeProvider({ theme = DefaultTheme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme
 */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
}
