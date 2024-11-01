import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { AchievementBadge } from './AchievementBadge';

export const AchievementList: React.FC = () => {
  const { achievements } = useStore();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </motion.div>
  );
};