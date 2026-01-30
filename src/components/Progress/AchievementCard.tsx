import { FiAward } from 'react-icons/fi';
import type { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked?: boolean;
}

export const AchievementCard = ({ achievement, unlocked = false }: AchievementCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-102 ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg hover:shadow-xl hover:border-yellow-500'
          : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-70'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`text-2xl transition-all duration-300 ${unlocked ? 'grayscale-0 animate-pulse' : 'grayscale'}`}
        >
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold mb-1 transition-colors duration-300 ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}
          >
            {achievement.title}
          </h4>
          <p className={`text-sm transition-colors duration-300 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {achievement.description}
          </p>
          {unlocked && achievement.unlockedAt && (
            <p className="text-xs text-gray-400 mt-2">
              解锁于: {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        {unlocked && (
          <FiAward className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-bounce" />
        )}
      </div>
    </div>
  );
};