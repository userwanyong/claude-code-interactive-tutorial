import { useCallback } from 'react';
import type { UserProgress, Achievement } from '../types';
import { modules } from '../data/modules';
import { useApp } from './useApp';

export const COMMON_COMMANDS = [
  '/clear', '/config', '/context', '/cost', '/doctor', '/export', '/help',
  '/init', '/mcp', '/memory', '/model', '/permissions', '/plan', '/rename',
  '/resume', '/rewind', '/stats', '/status', '/statusline', '/tasks',
  '/teleport', '/theme', '/todos', '/usage', '/exit', '/compact'
];

export const useProgress = () => {
  const { progress, setProgress } = useApp();
  const loading = progress === null;

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => {
      if (!prev) return null;
      
      // 合并 achievements，避免并发更新覆盖
      let mergedAchievements = prev.achievements;
      if (updates.achievements) {
        const achievementMap = new Map(prev.achievements.map(a => [a.id, a]));
        updates.achievements.forEach(a => achievementMap.set(a.id, a));
        mergedAchievements = Array.from(achievementMap.values());
      }

      const newProgress: UserProgress = {
        ...prev,
        ...updates,
        completedSteps: updates.completedSteps 
          ? { ...prev.completedSteps, ...updates.completedSteps }
          : prev.completedSteps,
        achievements: mergedAchievements
      };
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const completeStep = (moduleId: string, stepId: string) => {
    if (!progress) return;
    
    const completedSteps = progress.completedSteps[moduleId] || [];
    if (!completedSteps.includes(stepId)) {
      const newModuleCompletedSteps = [...completedSteps, stepId];
      const newCompletedSteps = {
        ...progress.completedSteps,
        [moduleId]: newModuleCompletedSteps
      };
      
      const module = modules.find(m => m.id === moduleId);
      const isModuleComplete = module && newModuleCompletedSteps.length === module.steps.length;
      
      const currentCompletedModules = progress.completedModules || [];
      const newCompletedModules = isModuleComplete && !currentCompletedModules.includes(moduleId)
        ? [...currentCompletedModules, moduleId]
        : currentCompletedModules;
      
      const newProgress: UserProgress = {
        ...progress,
        completedSteps: newCompletedSteps,
        completedModules: newCompletedModules
      };
      
      const updates: Partial<UserProgress> = {
        completedSteps: newCompletedSteps
      };
      
      if (isModuleComplete && !currentCompletedModules.includes(moduleId)) {
        updates.completedModules = newCompletedModules;
      }
      
      updateProgress(updates);
      checkAchievementsWithProgress(newProgress);
    }
  };

  const completeModule = (moduleId: string) => {
    if (!progress) return;
    
    const currentCompletedModules = progress.completedModules || [];
    if (!currentCompletedModules.includes(moduleId)) {
      const newCompletedModules = [...currentCompletedModules, moduleId];
      const newProgress: UserProgress = {
        ...progress,
        completedModules: newCompletedModules
      };
      
      updateProgress({ completedModules: newCompletedModules });
      checkAchievementsWithProgress(newProgress);
    }
  };

  const addMasteredCommand = (command: string) => {
    if (!progress) return;
    
    const masteredCommands = progress.masteredCommands || [];
    if (!masteredCommands.includes(command)) {
      const newMasteredCommands = [...masteredCommands, command];
      const newProgress: UserProgress = {
        ...progress,
        masteredCommands: newMasteredCommands
      };
      
      updateProgress({ masteredCommands: newMasteredCommands });
      checkAchievementsWithProgress(newProgress);
    }
  };

  const checkAchievementsInternal = (currentProgress: UserProgress) => {
    const newAchievements: Achievement[] = [];
    const totalModules = modules.length;
    const completedModuleCount = currentProgress.completedModules?.length || 0;
    
    const totalSteps = modules.reduce((acc, module) => acc + module.steps.length, 0);
    const completedSteps = Object.values(currentProgress.completedSteps || {}).flat().length;

    if (completedModuleCount >= 1 && !currentProgress.achievements?.find(a => a.id === 'first-module')) {
      newAchievements.push({
        id: 'first-module',
        title: '初学者',
        description: '完成第一个学习模块',
        icon: '🎓',
        unlockedAt: new Date().toISOString()
      });
    }

    if (completedSteps >= totalSteps / 2 && !currentProgress.achievements?.find(a => a.id === 'half-progress')) {
      newAchievements.push({
        id: 'half-progress',
        title: '进阶学习者',
        description: '完成 50% 的学习进度',
        icon: '🌟',
        unlockedAt: new Date().toISOString()
      });
    }

    if (completedModuleCount >= totalModules && !currentProgress.achievements?.find(a => a.id === 'all-modules')) {
      newAchievements.push({
        id: 'all-modules',
        title: 'Claude Code 大师',
        description: '完成所有学习模块',
        icon: '👑',
        unlockedAt: new Date().toISOString()
      });
    }

    if ((currentProgress.masteredCommands?.length || 0) >= 1 && !currentProgress.achievements?.find(a => a.id === 'first-command')) {
      newAchievements.push({
        id: 'first-command',
        title: '第一次交互',
        description: '成功执行第一条命令',
        icon: '💻',
        unlockedAt: new Date().toISOString()
      });
    }

    const masteredCommonCommands = (currentProgress.masteredCommands || []).filter(cmd => 
      COMMON_COMMANDS.includes(cmd)
    );
    
    if (masteredCommonCommands.length >= COMMON_COMMANDS.length && !currentProgress.achievements?.find(a => a.id === 'command-master')) {
      newAchievements.push({
        id: 'command-master',
        title: '命令大师',
        description: '掌握所有常用命令',
        icon: '⚡',
        unlockedAt: new Date().toISOString()
      });
    }

    if (newAchievements.length > 0) {
      updateProgress({
        achievements: [...currentProgress.achievements, ...newAchievements]
      });
      return newAchievements;
    }
    return [];
  };

  const checkAchievements = useCallback(() => {
    if (!progress) return;
    checkAchievementsInternal(progress);
  }, [progress]);

  const checkAchievementsWithProgress = (currentProgress: UserProgress) => {
    checkAchievementsInternal(currentProgress);
  };

  const getOverallProgress = () => {
    if (!progress) return 0;
    const totalSteps = modules.reduce((acc, module) => acc + module.steps.length, 0);
    const completedSteps = Object.values(progress.completedSteps).flat().length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const getModuleProgress = (moduleId: string) => {
    if (!progress) return 0;
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completedSteps = progress.completedSteps[moduleId]?.length || 0;
    return Math.round((completedSteps / module.steps.length) * 100);
  };

  const isStepCompleted = (moduleId: string, stepId: string) => {
    return progress?.completedSteps[moduleId]?.includes(stepId) || false;
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress?.completedModules.includes(moduleId) || false;
  };

  const isModuleUnlocked = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return false;
    if (module.prerequisites.length === 0) return true;
    return module.prerequisites.every(prereq => isModuleCompleted(prereq));
  };

  return {
    progress,
    loading,
    updateProgress,
    completeStep,
    completeModule,
    addMasteredCommand,
    getOverallProgress,
    getModuleProgress,
    isStepCompleted,
    isModuleCompleted,
    isModuleUnlocked,
    checkAchievements
  };
};
