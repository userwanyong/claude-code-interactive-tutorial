import { FiX, FiCheckCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    icon: string;
  };
}

export default function Toast({ show, onClose, achievement }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-[100] max-w-sm transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="text-3xl animate-bounce">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FiCheckCircle className="text-white" size={18} />
              <span className="font-bold text-white">成就解锁！</span>
            </div>
            <h4 className="font-bold text-lg">{achievement.title}</h4>
            <p className="text-sm opacity-90">{achievement.description}</p>
          </div>
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
