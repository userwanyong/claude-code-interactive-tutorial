import { useProgress } from '../../hooks/useProgress';
import { FiTrendingUp } from 'react-icons/fi';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className = '' }: ProgressBarProps) {
  const { getOverallProgress } = useProgress();
  const progress = getOverallProgress();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <FiTrendingUp className="text-red-600" size={20} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">学习进度</span>
          <span className="text-sm font-bold text-red-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}