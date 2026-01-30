import { FiActivity } from 'react-icons/fi';

export default function StatsVisualization() {
  // Generate dummy heat map data
  // 12 months, ~4 weeks per month, just a grid of dots
  // 52 weeks * 7 days
  
  return (
    <div className="font-mono text-sm my-2 text-gray-300">
      {/* Header Tabs */}
      <div className="flex gap-4 mb-6">
        <span className="bg-[#D97757] text-black px-1 font-bold">Overview</span>
        <span className="text-gray-500">Models</span>
        <span className="text-gray-600 ml-2">(←/→ or tab to cycle)</span>
      </div>

      {/* Heatmap Area */}
      <div className="mb-6 relative">
        {/* Months Label */}
        <div className="flex justify-between text-gray-400 mb-2 w-3/4">
          <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
          <span>Dec</span><span>Jan</span>
        </div>
        
        <div className="flex">
          {/* Days Label */}
          <div className="flex flex-col justify-between mr-2 text-gray-400 h-24 text-xs">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {Array.from({ length: 52 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  // Simulate some data
                  const isActive = Math.random() > 0.8;
                  const intensity = Math.random();
                  let colorClass = "bg-gray-800"; // empty
                  
                  // Make the last few columns more active to match "Jan" in screenshot
                  if (weekIndex > 48) {
                     if (dayIndex === 1 || dayIndex === 3 || dayIndex === 5) {
                        colorClass = "bg-[#D97757]"; // active color
                     }
                  }

                  return (
                    <div 
                      key={dayIndex} 
                      className={`w-2 h-2 rounded-sm ${colorClass}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs">
          <span className="text-gray-400">Less</span>
          <div className="w-2 h-2 bg-gray-800 rounded-sm"></div>
          <div className="w-2 h-2 bg-[#D97757] opacity-30 rounded-sm"></div>
          <div className="w-2 h-2 bg-[#D97757] opacity-60 rounded-sm"></div>
          <div className="w-2 h-2 bg-[#D97757] rounded-sm"></div>
          <span className="text-gray-400">More</span>
        </div>
      </div>

      {/* Stats Details */}
      <div className="flex gap-4 mb-4 text-gray-500">
        <span className="text-[#D97757] font-bold">All time</span>
        <span>·</span>
        <span>Last 7 days</span>
        <span>·</span>
        <span>Last 30 days</span>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Favorite model:</span>
          <span className="text-[#D97757]">glm-4.7</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total tokens:</span>
          <span className="text-[#D97757]">181.0k</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Sessions:</span>
          <span className="text-[#D97757]">29</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Longest session:</span>
          <span className="text-[#D97757]">2h 51m 11s</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Active days:</span>
          <span className="text-[#D97757]">4<span className="text-gray-600">/6</span></span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Longest streak:</span>
          <span className="text-[#D97757]">3 days</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Most active day:</span>
          <span className="text-[#D97757]">Jan 26</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Current streak:</span>
          <span className="text-[#D97757]">2 days</span>
        </div>
      </div>

      <div className="text-blue-400 mb-6 italic">
        You've used the same number of tokens as To Kill a Mockingbird
      </div>

      <div className="text-gray-500 text-xs">
        Esc to cancel · r to cycle dates
      </div>
    </div>
  );
}
