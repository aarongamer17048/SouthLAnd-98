import { useState, useEffect } from 'react';

export interface AppConfig {
  title: string;
  icon: string;
  content: Record<string, any>;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Set default config on error
        setConfig({ apps: {} });
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getAppConfig = (appId: string): AppConfig | undefined => {
    return config?.apps[appId];
  };

  return { config, loading, error, getAppConfig };
}
