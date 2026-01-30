export default function WelcomeBanner() {
  const primaryColor = '#D97757'; // 提取自截图的赤陶色

  return (
    <div className="mb-6 font-mono pt-3">
      <div 
        className="border rounded-xl p-6 flex flex-col md:flex-row gap-8 relative"
        style={{ borderColor: primaryColor }}
      >
        {/* 版本号标签 */}
        <div 
          className="absolute -top-3 left-6 px-2 text-sm font-medium"
          style={{ backgroundColor: '#1a1a1a', color: '#a0a0a0' }}
        >
          <span style={{ color: primaryColor }}>Claude Code</span> v2.1.19
        </div>

        {/* 左侧区域 */}
        <div className="flex flex-col items-center text-center md:basis-[30%] flex-shrink-0">
          <div className="text-white text-xl font-bold mb-6">Welcome back!</div>
          
          {/* 像素风格图标 */}
          <div className="mb-6 relative">
            <div className="w-16 h-12 relative mx-auto">
              {/* 这里用简单的 div 模拟像素画，或者使用 SVG */}
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="16" width="32" height="24" fill={primaryColor} />
                <rect x="12" y="24" width="4" height="8" fill={primaryColor} />
                <rect x="48" y="24" width="4" height="8" fill={primaryColor} />
                <rect x="20" y="40" width="4" height="8" fill={primaryColor} />
                <rect x="40" y="40" width="4" height="8" fill={primaryColor} />
                <rect x="24" y="24" width="4" height="4" fill="#1a1a1a" />
                <rect x="36" y="24" width="4" height="4" fill="#1a1a1a" />
              </svg>
            </div>
          </div>
          
          <div className="mt-auto space-y-1 text-gray-400 text-sm">
            <div>Sonnet 4.5 · API Usage Billing</div>
            <div className="truncate max-w-[200px] md:max-w-full">C:\Users\example\cc</div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="hidden md:block w-px bg-gray-700" style={{ backgroundColor: primaryColor }}></div>

        {/* 右侧区域 */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <div className="font-bold mb-2" style={{ color: primaryColor }}>Tips for getting started</div>
            <div className="text-gray-300">Ask Claude to create a new app or clone a repository</div>
            <div className="h-px bg-gray-700 mt-4" style={{ backgroundColor: primaryColor }}></div>
          </div>
          
          <div>
            <div className="font-bold mb-2" style={{ color: primaryColor }}>Recent activity</div>
            <div className="text-gray-400">No recent activity</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-gray-500">
        /model to try Opus 4.5
      </div>
    </div>
  );
}
