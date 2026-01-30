import { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Layout/Header';
import Terminal from './components/Terminal/Terminal';
import ModuleContent from './components/Module/ModuleContent';
import HelpModal from './components/Help/HelpModal';
import AchievementModal from './components/Progress/AchievementModal';
import Toast from './components/Toast/Toast';
import { useProgress } from './hooks/useProgress';
import { getModuleById, getNextModule } from './data/modules';
import type { CommandResult, LearningModule } from './types';

function App() {
  const [currentModule, setCurrentModule] = useState('module-1');
  const [showHelp, setShowHelp] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentToastAchievement, setCurrentToastAchievement] = useState<{ title: string; description: string; icon: string } | null>(null);
  const [newAchievementsCount, setNewAchievementsCount] = useState(0);
  const lastProcessedAchievementsRef = useRef<string[]>([]);
  const { progress, completeStep, completeModule, addMasteredCommand, isStepCompleted, checkAchievements } = useProgress();

  useEffect(() => {
    if (!progress) return;

    const currentAchievementIds = progress.achievements.map(a => a.id);
    const newAchievementIds = currentAchievementIds.filter(id => !lastProcessedAchievementsRef.current.includes(id));

    if (newAchievementIds.length > 0) {
      setNewAchievementsCount(prev => prev + newAchievementIds.length);
      const newAchievements = progress.achievements.filter(a => newAchievementIds.includes(a.id));
      
      newAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          setCurrentToastAchievement({
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon
          });
          setShowToast(true);
        }, index * 1500);
      });

      lastProcessedAchievementsRef.current = currentAchievementIds;
    }
  }, [progress?.achievements]);

  const handleAchievementsClick = () => {
    setNewAchievementsCount(0);
    setShowAchievements(true);
  };

  const module: LearningModule | undefined = getModuleById(currentModule);
  const nextModule = module ? getNextModule(module.id) : undefined;

  const currentStepId = useMemo(() => {
    if (!module || !progress) return null;
    const firstUncompletedStep = module.steps.find(step => !isStepCompleted(module.id, step.id));
    return firstUncompletedStep?.id || null;
  }, [module, progress, isStepCompleted]);

  const handleStepComplete = (stepId: string) => {
    if (module) {
      completeStep(module.id, stepId);
    }
  };

  const handleCommandExecuted = (command: string, result: CommandResult) => {
    if (result.success) {
      addMasteredCommand(command.split(' ')[0]);
      
      if (module && currentStepId) {
        const currentStep = module.steps.find(s => s.id === currentStepId);
          
        if (currentStep && currentStep.commands.length > 0) {
          const commandMatches = currentStep.commands.some(cmd => {
            const normalizedCmd = cmd.trim();
            const normalizedInput = command.trim();
            
            // Exact match
            if (normalizedInput === normalizedCmd) return true;
            
            // Starts with match (for commands with variable arguments)
            if (normalizedInput.startsWith(normalizedCmd + ' ')) return true;
            
            // Special handling for long commands or commands with quotes
            // If the expected command contains quotes, we try to be more flexible
            if (normalizedCmd.includes('"') || normalizedCmd.includes("'")) {
              // Extract the base command (e.g., "claude -p")
              const baseCmd = normalizedCmd.split(/["']/)[0].trim();
              if (normalizedInput.startsWith(baseCmd)) {
                return true;
              }
            }
            
            return false;
          });
          
          if (commandMatches) {
            handleStepComplete(currentStep.id);
          }
        }
      }
    }
  };

  const handleNextModule = () => {
    if (module) {
      completeModule(module.id);
      if (nextModule) {
        setCurrentModule(nextModule.id);
      }
    }
  };

  const getPresetCommands = () => {
    if (!module || !currentStepId) return [];
    const currentStep = module.steps.find(s => s.id === currentStepId);
    return currentStep?.commands || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onHelpClick={() => setShowHelp(true)}
        onAchievementsClick={handleAchievementsClick}
        onMenuClick={() => setShowMobileSidebar(true)}
        newAchievementsCount={newAchievementsCount}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar currentModule={currentModule} onModuleSelect={setCurrentModule} progress={progress} />
        </div>

        {showMobileSidebar && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setShowMobileSidebar(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-white">
              <Sidebar 
                currentModule={currentModule} 
                onModuleSelect={(id) => {
                  setCurrentModule(id);
                  setShowMobileSidebar(false);
                }}
                progress={progress}
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="order-2 lg:order-1 lg:col-span-4">
                {module && (
                  <ModuleContent
                    module={module}
                    currentStepId={currentStepId}
                    onStepComplete={handleStepComplete}
                    onNextModule={handleNextModule}
                    progress={progress}
                  />
                )}
              </div>

              <div className="order-1 lg:order-2 lg:col-span-8">
                <Terminal
                  onCommandExecuted={handleCommandExecuted}
                  presetCommands={getPresetCommands()}
                  className="sticky top-6"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <AchievementModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
      {currentToastAchievement && (
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          achievement={currentToastAchievement}
        />
      )}
    </div>
  );
}

export default App;