import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { generateSassyComment } from '../utils/comments';
import { MessageSquare } from 'lucide-react';

export const SassyFeedback: React.FC = () => {
  const { stats } = useStore();
  const totalHours = Object.values(stats).reduce((a, b) => a + b, 0);

  const comments = Object.entries(stats)
    .filter(([_, hours]) => hours > 0)
    .map(([category, hours]) => generateSassyComment(category as keyof typeof stats, hours));

  return (
    <div className="space-y-4">
      {totalHours > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <MessageSquare className="w-6 h-6 text-indigo-500 mt-1" />
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-800"
                >
                  {comment.text}
                </motion.p>
              ))}
              {totalHours > 8 && (
                <p className="text-red-500 font-semibold mt-4">
                  Wow! {totalHours} hours? Your screen time is higher than my expectations of you!
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};