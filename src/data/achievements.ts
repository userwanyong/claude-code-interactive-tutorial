import type { Achievement } from '../types';

export const achievements: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first-module',
    title: '初学者',
    description: '完成第一个学习模块',
    icon: '🎓'
  },
  {
    id: 'half-progress',
    title: '进阶学习者',
    description: '完成 50% 的学习进度',
    icon: '🌟'
  },
  {
    id: 'all-modules',
    title: 'Claude Code 大师',
    description: '完成所有学习模块',
    icon: '👑'
  },
  {
    id: 'first-command',
    title: '第一次交互',
    description: '成功执行第一条命令',
    icon: '💻'
  },
  {
    id: 'command-master',
    title: '命令大师',
    description: '掌握所有常用命令',
    icon: '⚡'
  }
];

export const getAchievementById = (id: string): Omit<Achievement, 'unlockedAt'> | undefined => {
  return achievements.find(a => a.id === id);
};