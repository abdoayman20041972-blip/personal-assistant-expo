import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

type SettingsState = {
  notifications: boolean;
  haptics: boolean;
  launchScreen: boolean;
  recentTools: boolean;
  toolDescriptions: boolean;
  noteAutoSave: boolean;
  confirmDelete: boolean;
  setNotifications: (value: boolean) => void;
  setHaptics: (value: boolean) => void;
  setLaunchScreen: (value: boolean) => void;
  setRecentTools: (value: boolean) => void;
  setToolDescriptions: (value: boolean) => void;
  setNoteAutoSave: (value: boolean) => void;
  setConfirmDelete: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsState | null>(null);

const STORAGE_KEY = 'personal_assistant_settings';
type StoredSettings = Pick<SettingsState, 'notifications' | 'haptics' | 'launchScreen' | 'recentTools' | 'toolDescriptions' | 'noteAutoSave' | 'confirmDelete'>;

export function SettingsProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [launchScreen, setLaunchScreen] = useState(true);
  const [recentTools, setRecentTools] = useState(true);
  const [toolDescriptions, setToolDescriptions] = useState(true);
  const [noteAutoSave, setNoteAutoSave] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      try {
        const saved = JSON.parse(raw) as Partial<StoredSettings>;
        if (typeof saved.notifications === 'boolean') setNotifications(saved.notifications);
        if (typeof saved.haptics === 'boolean') setHaptics(saved.haptics);
        if (typeof saved.launchScreen === 'boolean') setLaunchScreen(saved.launchScreen);
        if (typeof saved.recentTools === 'boolean') setRecentTools(saved.recentTools);
        if (typeof saved.toolDescriptions === 'boolean') setToolDescriptions(saved.toolDescriptions);
        if (typeof saved.noteAutoSave === 'boolean') setNoteAutoSave(saved.noteAutoSave);
        if (typeof saved.confirmDelete === 'boolean') setConfirmDelete(saved.confirmDelete);
      } catch { /* ignore malformed local settings */ }
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const saved: StoredSettings = { notifications, haptics, launchScreen, recentTools, toolDescriptions, noteAutoSave, confirmDelete };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved)).catch(() => undefined);
  }, [notifications, haptics, launchScreen, recentTools, toolDescriptions, noteAutoSave, confirmDelete]);

  const value = useMemo(() => ({
    notifications, haptics, launchScreen, recentTools, toolDescriptions, noteAutoSave, confirmDelete,
    setNotifications, setHaptics, setLaunchScreen, setRecentTools, setToolDescriptions, setNoteAutoSave, setConfirmDelete,
  }), [notifications, haptics, launchScreen, recentTools, toolDescriptions, noteAutoSave, confirmDelete]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
