import { FiX, FiCommand } from 'react-icons/fi';
import { commands } from '../../data/commands';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <FiCommand className="text-red-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">命令参考</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 gap-2">
            {commands.map((command) => (
              <div key={command.name} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-colors">
                <div className="flex-shrink-0 w-32">
                  <code className="px-2 py-1 bg-gray-900 text-green-400 rounded text-sm font-mono block text-center">
                    {command.name}
                  </code>
                </div>
                <div className="text-gray-700 text-sm font-medium">
                  {command.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
