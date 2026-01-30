import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { UserProgress } from '../types';

export interface AppContextType {
  currentModule: string;
  setCurrentModule: Dispatch<SetStateAction<string>>;
  progress: UserProgress | null;
  setProgress: Dispatch<SetStateAction<UserProgress | null>>;
}

export const AppContext = createContext<AppContextType | null>(null);
