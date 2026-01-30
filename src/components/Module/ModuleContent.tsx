import type { LearningModule, UserProgress } from '../../types';
import { FiCheckCircle } from 'react-icons/fi';
import Typewriter from './Typewriter';

interface ModuleContentProps {
  module: LearningModule;
  currentStepId: string | null;
  onStepComplete: (stepId: string) => void;
  onNextModule?: () => void;
  progress: UserProgress | null;
}

const isStepCompleted = (progress: UserProgress | null, moduleId: string, stepId: string) => {
  return progress?.completedSteps[moduleId]?.includes(stepId) || false;
};

export default function ModuleContent({ module, currentStepId, onStepComplete, onNextModule, progress }: ModuleContentProps) {
  const completedCount = module.steps.filter(step => isStepCompleted(progress, module.id, step.id)).length;

  const currentStep = currentStepId ? module.steps.find(s => s.id === currentStepId) : null;
  const isAllCompleted = !currentStepId || completedCount === module.steps.length;

  const completedSteps = module.steps.filter(step => isStepCompleted(progress, module.id, step.id));
  const reversedCompletedSteps = [...completedSteps].reverse();

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{module.icon}</span>
          <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
        </div>
        <p className="text-gray-600">{module.description}</p>
      </div>

      {isAllCompleted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">恭喜！</h2>
          <p className="text-xl text-gray-600 mb-8">你已经掌握了所有 Claude Code 内置命令！</p>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 max-w-md w-full mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">学习成就</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">掌握命令</span>
              <span className="font-bold text-gray-900">{module.steps.length} / {module.steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('确定要重置所有进度吗？这将清除所有学习记录和终端历史。')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-6 py-2 text-gray-500 hover:text-red-600 transition-colors cursor-pointer text-sm"
          >
            重置学习进度
          </button>
        </div>
      ) : (
        <>
          {currentStep && (
            <div className="p-3 rounded-lg border-2 border-red-400 bg-white mb-8 h-[100px] flex items-center">
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  {currentStep.commands.length > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-gray-900 text-green-400 rounded text-lg font-mono font-bold flex-shrink-0">
                        {currentStep.commands[0].split(' ')[0]}
                      </div>
                      <div className="text-gray-700 text-lg">
                        <Typewriter text={currentStep.description} speed={30} />
                      </div>
                    </div>
                  )}
                </div>

                {currentStep.commands.length === 0 && (
                  <button
                    onClick={() => onStepComplete(currentStep.id)}
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    已阅读，继续下一步 →
                  </button>
                )}
              </div>
            </div>
          )}

          {completedSteps.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">已学习的命令</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin-light pr-2">
                {reversedCompletedSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-3 text-gray-600">
                    <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono border border-gray-200 min-w-[80px] text-center">
                      {step.commands[0]?.split(' ')[0] || ''}
                    </div>
                    <div className="text-sm">
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}