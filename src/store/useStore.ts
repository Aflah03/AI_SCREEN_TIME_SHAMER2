import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStats, Achievement, DailyStats } from '../types';
import { generateSassyComment } from '../utils/comments';
import { checkAchievements } from '../utils/achievements';
import { addDays, startOfDay } from 'date-fns';

interface StoreState {
  stats: AppStats;
  achievements: Achievement[];
  dailyStats: DailyStats[];
  updateStats: (category: keyof AppStats, hours: number) => void;
  resetStats: () => void;
}

const initialStats: AppStats = {
  socialMedia: 0,
  productivity: 0,
  entertainment: 0,
  gaming: 0,
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      stats: initialStats,
      achievements: [],
      dailyStats: [],
      updateStats: (category, hours) =>
        set((state) => {
          const newStats = {
            ...state.stats,
            [category]: hours,
          };

          const today = startOfDay(new Date());
          const newDailyStats = [
            ...state.dailyStats.filter(
              (stat) => stat.date.getTime() !== today.getTime()
            ),
            {
              date: today,
              totalTime: Object.values(newStats).reduce((a, b) => a + b, 0),
              breakdown: Object.entries(newStats).map(([key, value]) => ({
                category: key as keyof AppStats,
                hours: value,
              })),
            },
          ];

          // Keep only last 7 days
          while (newDailyStats.length > 7) {
            newDailyStats.shift();
          }

          const newAchievements = checkAchievements(newStats, state.achievements);

          return {
            stats: newStats,
            dailyStats: newDailyStats,
            achievements: newAchievements,
          };
        }),
      resetStats: () => set({ stats: initialStats }),
    }),
    {
      name: 'screen-time-storage',
    }
  )
);