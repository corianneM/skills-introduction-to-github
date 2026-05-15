import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserLocale {
  stateName: string;
  stateFips: string;  // 2-digit FIPS code, e.g. '06' for California
}

const STORAGE_KEY = 'unfluenced_locale';

const DEFAULT_LOCALE: UserLocale = {
  stateName: 'United States (National)',
  stateFips: '00',
};

export function useLocaleData() {
  const [locale, setLocaleState] = useState<UserLocale>(DEFAULT_LOCALE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setLocaleState(JSON.parse(raw) as UserLocale);
      })
      .finally(() => setLoading(false));
  }, []);

  async function setLocale(next: UserLocale) {
    setLocaleState(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return { locale, setLocale, loading };
}
