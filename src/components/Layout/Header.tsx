import { FiHelpCircle, FiAward, FiMenu } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import ProgressBar from '../Progress/ProgressBar';

interface HeaderProps {
  onHelpClick?: () => void;
  onAchievementsClick?: () => void;
  onMenuClick?: () => void;
  newAchievementsCount?: number;
}

export default function Header({ onHelpClick, onAchievementsClick, onMenuClick, newAchievementsCount = 0 }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
            >
              <FiMenu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Claude Code <span className="text-red-600">快速入门</span>
              </h1>
              <p className="text-sm text-gray-600">交互式命令行学习平台</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ProgressBar className="w-48" />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={onAchievementsClick}
                className="p-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                title="成就"
              >
                <FiAward size={20} />
              </button>
              {newAchievementsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {newAchievementsCount}
                </span>
              )}
            </div>
            <button
              onClick={onHelpClick}
              className="p-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              title="帮助"
            >
              <FiHelpCircle size={20} />
            </button>
            <a
              href="https://github.com/userwanyong/claude-code-interactive-tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-600 hover:text-red-600 transition-colors"
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}