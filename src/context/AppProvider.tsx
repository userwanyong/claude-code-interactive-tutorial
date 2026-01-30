import { useState, useEffect } from 'react';
import { AppContext, type AppContextType } from './AppContext';
import { modules } from '../data/modules';
import type { UserProgress } from '../types';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentModule, setCurrentModule] = useState(modules[0].id);
  const [progress, setProgress] = useState<AppContextType['progress']>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('userProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Validate and clean up invalid steps (in case modules definition changed)
        const validCompletedSteps: Record<string, string[]> = {};
        
        Object.keys(parsed.completedSteps || {}).forEach(moduleId => {
          const module = modules.find(m => m.id === moduleId);
          if (module) {
            const validSteps = parsed.completedSteps[moduleId].filter((stepId: string) => 
              module.steps.some(s => s.id === stepId)
            );
            if (validSteps.length > 0) {
              validCompletedSteps[moduleId] = validSteps;
            }
          }
        });
        
        setProgress({
          ...parsed,
          completedSteps: validCompletedSteps
        });
      } else {
        setProgress({
          completedModules: [],
          completedSteps: {},
          masteredCommands: [],
          totalStudyTime: 0,
          achievements: [],
          lastStudyDate: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, []);

  return (
    <AppContext.Provider value={{ currentModule, setCurrentModule, progress, setProgress }}>
      {children}
    </AppContext.Provider>
  );
}
