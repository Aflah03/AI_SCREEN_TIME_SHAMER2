import React from 'react';
import { Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AppStats } from '../types';

const categories: { key: keyof AppStats; label: string }[] = [
  { key: 'socialMedia', label: 'Social Media' },
  { key: 'productivity', label: 'Productivity Apps' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'gaming', label: 'Gaming' },
];

export const StatsInput: React.FC = () => {
  const { updateStats } = useStore();

  return (
    <div className="space-y-4">
      {categories.map(({ key, label }) => (
        <div key={key} className="flex items-center space-x-4">
          <Clock className="w-5 h-5 text-indigo-500" />
          <label className="flex-1 text-sm font-medium text-gray-700">{label}</label>
          <input
            type="number"
            min="0"
            max="24"
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => updateStats(key, Number(e.target.value))}
            placeholder="0"
          />
          <span className="text-sm text-gray-500">hours</span>
        </div>
      ))}
    </div>
  );
};