import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { initialSiteConfig } from '../config/siteConfig';

interface AppContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  isAuthenticated: boolean;
  login: (u: string, p: string) => { success: boolean; errorMsg?: string };
  logout: () => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (v: number) => void;
  heartsBurst: (x?: number, y?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CONFIG_STORAGE_KEY = 'gf_day_site_config_v3';
const AUTH_STORAGE_KEY = 'gf_day_auth_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...initialSiteConfig, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse site config from storage', e);
    }
    return initialSiteConfig;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save config to storage', e);
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig,
    }));
  };

  const resetConfig = () => {
    setConfig(initialSiteConfig);
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear storage', e);
    }
  };

  const login = (usernameInput: string, passwordInput: string) => {
    const targetU = config.credentials.username.trim().toLowerCase();
    const targetP = config.credentials.password.trim();

    const cleanU = usernameInput.trim().toLowerCase();
    const cleanP = passwordInput.trim();

    if (cleanU === targetU && cleanP === targetP) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Failed to save auth state', e);
      }
      return { success: true };
    }

    return {
      success: false,
      errorMsg: 'Oops ❤️ Wrong Username or Password',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove auth state', e);
    }
  };

  const toggleMusic = () => {
    setMusicPlaying(prev => !prev);
  };

  // Function to create a burst of hearts on click
  const heartsBurst = (x?: number, y?: number) => {
    const burstX = x ?? window.innerWidth / 2;
    const burstY = y ?? window.innerHeight / 2;

    const event = new CustomEvent('heart-burst', {
      detail: { x: burstX, y: burstY }
    });
    window.dispatchEvent(event);
  };

  return (
    <AppContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isAuthenticated,
        login,
        logout,
        musicPlaying,
        toggleMusic,
        volume,
        setVolume,
        heartsBurst,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
