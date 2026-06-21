import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isDark: boolean;
  profileName: string;
  profileAvatar: string;
  
  // Notification Settings
  notifHarian: boolean;
  waktuBelajar: string;
  notifJeda: boolean;
  suaraNotif: string;
  getar: boolean;

  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  updateProfile: (name: string, avatar: string) => void;
  updateNotif: (key: string, value: any) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDark: true, // Default dark mode sesuai desain awal
      profileName: 'Budi Pratama',
      profileAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
      
      notifHarian: true,
      waktuBelajar: '19:00',
      notifJeda: false,
      suaraNotif: 'Default',
      getar: true,

      toggleTheme: () => set((state) => {
        const newTheme = !state.isDark;
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDark: newTheme };
      }),
      setTheme: (isDark) => set(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDark };
      }),
      updateProfile: (name, avatar) => set(() => ({
        profileName: name,
        profileAvatar: avatar
      })),
      updateNotif: (key, value) => set((state) => ({
        ...state,
        [key]: value
      })),
    }),
    {
      name: 'cpns-study-tracker-settings', // key di localStorage
    }
  )
);
