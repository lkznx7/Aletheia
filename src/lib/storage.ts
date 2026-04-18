const STORAGE_PREFIX = 'aletheia_';

export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error(`Storage get error for key "${key}":`, error);
      return defaultValue ?? null;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
      return false;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
    }
  },

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

export default storage;