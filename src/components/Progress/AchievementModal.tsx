import { FiX, FiAward, FiLock } from 'react-icons/fi';
import { useProgress, COMMON_COMMANDS } from '../../hooks/useProgress';
import { achievements } from '../../data/achievements';
import { modules } from '../../data/modules';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({ isOpen, onClose }: AchievementModalProps) {
  const { progress } = useProgress();

  const getAchievementProgress = (achievementId: string): { current: number; total: number; percentage: number } => {
    if (!progress) return { current: 0, total: 1, percentage: 0 };

    const completedModules = progress.completedModules || [];
    const masteredCommands = progress.masteredCommands || [];

    switch (achievementId) {
      case 'first-module':
        return {
          current: completedModules.length,
          total: 1,
          percentage: Math.min(completedModules.length / 1 * 100, 100)
        };
      case 'half-progress':
        return {
          current: completedModules.length,
          total: Math.ceil(modules.length / 2),
          percentage: Math.min(completedModules.length / Math.ceil(modules.length / 2) * 100, 100)
        };
      case 'all-modules':
        return {
          current: completedModules.length,
          total: modules.length,
          percentage: Math.min(completedModules.length / modules.length * 100, 100)
        };
      case 'first-command':
        return {
          current: masteredCommands.length,
          total: 1,
          percentage: Math.min(masteredCommands.length / 1 * 100, 100)
        };
      case 'command-master':
        const validCommands = masteredCommands.filter(cmd => COMMON_COMMANDS.includes(cmd));
        return {
          current: validCommands.length,
          total: COMMON_COMMANDS.length,
          percentage: Math.min(validCommands.length / COMMON_COMMANDS.length * 100, 100)
        };
      default:
        return { current: 0, total: 1, percentage: 0 };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FiAward className="text-red-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">成就系统</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement) => {
              const isUnlocked = progress?.achievements.find(a => a.id === achievement.id);
              const progressData = getAchievementProgress(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-102 ${
                    isUnlocked
                      ? 'bg-yellow-50 border-yellow-400 shadow-lg'
                      : 'bg-gray-50 border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {isUnlocked ? (
                        <div className="text-3xl animate-pulse">{achievement.icon}</div>
                      ) : (
                        <div className="relative">
                          <div className="text-3xl grayscale opacity-50">{achievement.icon}</div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FiLock className="text-gray-400" size={20} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {achievement.title}
                        </h3>
                        {!isUnlocked && (
                          <span className="text-xs font-medium text-gray-500">
                            {progressData.current}/{progressData.total}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      {!isUnlocked && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressData.percentage}%` }}
                          />
                        </div>
                      )}
                      {isUnlocked && (
                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                          ✓ 已解锁于 {new Date(isUnlocked.unlockedAt).toLocaleDateString('zh-CN')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}