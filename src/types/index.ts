export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: Step[];
  prerequisites: string[];
  estimatedTime: number;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  instruction: string;
  commands: string[];
  expectedOutput: string;
  hints: string[];
}

export interface Command {
  name: string;
  description: string;
  examples: CommandExample[];
  parameters?: Parameter[];
}

export interface CommandExample {
  command: string;
  description: string;
  output: string;
}

export interface Parameter {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface UserProgress {
  completedModules: string[];
  completedSteps: Record<string, string[]>;
  masteredCommands: string[];
  totalStudyTime: number;
  achievements: Achievement[];
  lastStudyDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface CommandValidation {
  valid: boolean;
  error?: string;
  command?: Command;
  args?: string[];
  suggestions?: string[];
}

export interface CommandResult {
  success: boolean;
  output: string;
  type: 'success' | 'error' | 'info';
}