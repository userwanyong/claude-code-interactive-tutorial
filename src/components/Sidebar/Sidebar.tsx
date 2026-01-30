import { modules } from '../../data/modules';
import type { UserProgress } from '../../types';
import { FiCheck, FiLock, FiBookOpen } from 'react-icons/fi';

interface SidebarProps {
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
  progress: UserProgress | null;
}

const isModuleCompleted = (progress: UserProgress | null, moduleId: string) => {
  return progress?.completedModules?.includes(moduleId) || false;
};

const isModuleUnlocked = (progress: UserProgress | null, moduleId: string) => {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return false;
  if (module.prerequisites.length === 0) return true;
  return module.prerequisites.every(prereq => isModuleCompleted(progress, prereq));
};

const getModuleProgress = (progress: UserProgress | null, moduleId: string) => {
  if (!progress) return 0;
  const module = modules.find(m => m.id === moduleId);
  if (!module) return 0;
  const completedSteps = progress.completedSteps[moduleId]?.length || 0;
  return Math.round((completedSteps / module.steps.length) * 100);
};

export default function Sidebar({ currentModule, onModuleSelect, progress }: SidebarProps) {

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FiBookOpen className="text-red-600" size={24} />
          <h2 className="text-lg font-bold text-gray-900">学习路径</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const isCompleted = isModuleCompleted(progress, module.id);
            const isUnlocked = isModuleUnlocked(progress, module.id);
            const moduleProgress = getModuleProgress(progress, module.id);
            const isActive = currentModule === module.id;

            return (
              <button
                key={module.id}
                onClick={() => isUnlocked && onModuleSelect(module.id)}
                disabled={!isUnlocked}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 border border-red-500 shadow-md transform scale-[1.02]'
                    : isUnlocked
                    ? 'bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50/30 hover:shadow-sm'
                    : 'bg-gray-50 border border-gray-200 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <FiCheck className="text-green-600" size={18} />
                    ) : isUnlocked ? (
                      <span className="text-lg">{module.icon}</span>
                    ) : (
                      <FiLock className="text-gray-400" size={16} />
                    )}
                    <span
                      className={`font-medium text-sm ${
                        isActive ? 'text-red-700 font-bold' : 'text-gray-900'
                      }`}
                    >
                      {module.title}
                    </span>
                  </div>
                  {isUnlocked && (
                    <span className="text-xs text-gray-500">{module.estimatedTime}分钟</span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mb-2">{module.description}</p>

                {isUnlocked && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          按 Enter 键执行命令
        </div>
      </div>
    </div>
  );
}