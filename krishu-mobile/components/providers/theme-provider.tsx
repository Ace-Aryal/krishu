import React, { createContext, useContext, useState, useMemo } from "react";
import { useColorScheme as useRNScheme } from "react-native";

// --- 1. Define Types ---

// The three possible states for the user's preference
export type ThemePreference = "light" | "dark" | "system";

// The derived, active color scheme (always 'light' or 'dark')
type ColorScheme = "light" | "dark";

interface ThemeContextType {
  // The actively used scheme, derived from preference and system setting
  scheme: ColorScheme;
  // The user's preferred setting (system, light, or dark)
  preference: ThemePreference;
  // Function to change the preference programmatically
  setPreference: (newPreference: ThemePreference) => void;
}

// --- 2. Create Context ---

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- 3. Custom Hook to Consume Context ---

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// --- 4. Theme Provider Component ---

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Tracks the user's saved preference (default to 'system')
  const [preference, setPreference] = useState<ThemePreference>("system");

  // Reads the actual system scheme
  const systemScheme = useRNScheme();

  // Memoize the derived active scheme
  const scheme: ColorScheme = useMemo(() => {
    if (preference === "system") {
      // If systemScheme is null/undefined (rare), default to 'light'
      return systemScheme ?? "light";
    }
    return preference;
  }, [preference, systemScheme]);

  const value = useMemo(
    () => ({
      scheme,
      preference,
      setPreference,
    }),
    [scheme, preference]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
