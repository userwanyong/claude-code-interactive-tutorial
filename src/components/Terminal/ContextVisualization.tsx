import { FiDatabase, FiCpu, FiMessageSquare, FiPackage, FiGrid, FiXSquare } from 'react-icons/fi';

export default function ContextVisualization() {
  // Mock grid data based on the image
  // 10 columns, 10 rows = 100 cells
  // First row: 6 gray disks, 2 blue disks, 2 empty
  // Second row: 1 yellow disk, 2 purple disks, rest empty
  // ... and so on
  
  const renderCell = (type: string, index: number) => {
    const baseClass = "w-5 h-5 flex items-center justify-center text-xs";
    
    switch (type) {
      case 'system':
        return <div key={index} className={`${baseClass} text-gray-500`}><FiDatabase /></div>;
      case 'mcp':
        return <div key={index} className={`${baseClass} text-blue-400`}><FiPackage /></div>;
      case 'skills':
        return <div key={index} className={`${baseClass} text-yellow-500`}><FiCpu /></div>;
      case 'messages':
        return <div key={index} className={`${baseClass} text-purple-500`}><FiMessageSquare /></div>;
      case 'buffer':
        return <div key={index} className={`${baseClass} text-gray-600`}><FiXSquare /></div>;
      default: // free space
        return <div key={index} className={`${baseClass} text-gray-600 border border-dashed border-gray-600 rounded-sm opacity-70`}></div>;
    }
  };

  // Construct grid: 100 cells
  const gridCells = [];
  
  // Row 1: 6 system, 2 mcp
  for (let i = 0; i < 6; i++) gridCells.push('system');
  for (let i = 0; i < 2; i++) gridCells.push('mcp');
  for (let i = 0; i < 2; i++) gridCells.push('free'); // padding end of row 1

  // Row 2: 1 skills, 2 messages
  gridCells.push('skills');
  gridCells.push('messages');
  gridCells.push('messages');
  for (let i = 0; i < 7; i++) gridCells.push('free');

  // Rows 3-7: mostly free
  for (let i = 0; i < 50; i++) gridCells.push('free');

  // Rows 8-10: buffer (last 2 rows + part of row 8)
  // Let's just fill the last 25 cells with buffer to mimic the image look
  // Replace last 25 'free' with 'buffer'
  // Actually, let's just manually fill to 100
  while (gridCells.length < 75) gridCells.push('free');
  while (gridCells.length < 100) gridCells.push('buffer');

  return (
    <div className="font-mono text-sm my-2">
      <div className="text-white mb-2 font-bold">Context Usage</div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Grid */}
        <div className="grid grid-cols-10 gap-1 w-fit">
          {gridCells.map((type, i) => renderCell(type, i))}
        </div>

        {/* Right Info */}
        <div className="flex-1 space-y-1">
          <div className="text-gray-400 mb-4">
            claude-sonnet-4-5-20250929 • 23.4k/200k tokens (12%)
          </div>

          <div className="text-gray-500 italic mb-2">Estimated usage by category</div>
          
          <div className="flex items-center gap-2">
            <FiDatabase className="text-gray-500" />
            <span className="text-gray-300">System prompt: 2.1k tokens (1.1%)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDatabase className="text-gray-500" />
            <span className="text-gray-300">System tools: 14.7k tokens (7.4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPackage className="text-blue-400" />
            <span className="text-gray-300">MCP tools: 3.2k tokens (1.6%)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCpu className="text-yellow-500" />
            <span className="text-gray-300">Skills: 309 tokens (0.2%)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMessageSquare className="text-purple-500" />
            <span className="text-gray-300">Messages: 3.7k tokens (1.9%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-dashed border-gray-600 rounded-sm opacity-70"></div>
            <span className="text-gray-300">Free space: 131k (65.5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiXSquare className="text-gray-600" />
            <span className="text-gray-300">Autocompact buffer: 45.0k tokens (22.5%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
