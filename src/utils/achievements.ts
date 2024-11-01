import { AppStats, Achievement } from '../types';
import { Trophy, Coffee, Gamepad2, Share2 } from 'lucide-react';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Spent over 5 hours on social media',
    icon: Share2,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'workaholic',
    title: 'Workaholic',
    description: 'Logged 8 hours of productivity apps',
    icon: Coffee,
    progress: 0,
    maxProgress: 8,
  },
  {
    id: 'gaming-master',
    title: 'Gaming Master',
    description: 'Gamed for more than 4 hours',
    icon: Gamepad2,
    progress: 0,
    maxProgress: 4,
  },
  {
    id: 'screen-warrior',
    title: 'Screen Warrior',
    description: 'Total screen time over 12 hours',
    icon: Trophy,
    progress: 0,
    maxProgress: 12,
  },
];

export const checkAchievements = (
  stats: AppStats,
  currentAchievements: Achievement[]
): Achievement[] => {
  const totalTime = Object.values(stats).reduce((a, b) => a + b, 0);

  return ACHIEVEMENTS.map((achievement) => {
    const existing = currentAchievements.find((a) => a.id === achievement.id);
    let progress = 0;

    switch (achievement.id) {
      case 'social-butterfly':
        progress = stats.socialMedia;
        break;
      case 'workaholic':
        progress = stats.productivity;
        break;
      case 'gaming-master':
        progress = stats.gaming;
        break;
      case 'screen-warrior':
        progress = totalTime;
        break;
    }

    return {
      ...achievement,
      progress,
      unlockedAt:
        progress >= achievement.maxProgress
          ? existing?.unlockedAt || new Date()
          : undefined,
    };
  });
};