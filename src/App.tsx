import React, { useState } from 'react';
import { Monitor, ChevronDown } from 'lucide-react';
import { StatsInput } from './components/StatsInput';
import { SassyFeedback } from './components/SassyFeedback';
import { UsageChart } from './components/UsageChart';
import { AchievementList } from './components/AchievementList';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showAchievements, setShowAchievements] = useState(false);
  const { dailyStats } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <Monitor className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              AI Screen Time Shamer
            </h1>
            <p className="text-xl text-gray-600">
              Where AI judges your digital life choices with sass and style
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Confess Your Screen Time
              </h2>
              <StatsInput />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <SassyFeedback />
            </motion.div>
          </div>

          {dailyStats.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8"
            >
              <UsageChart data={dailyStats} />
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8"
          >
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-xl font-semibold text-gray-800">
                Achievements & Badges
              </span>
              <ChevronDown
                className={`w-6 h-6 text-gray-600 transform transition-transform ${
                  showAchievements ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {showAchievements && <AchievementList />}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;