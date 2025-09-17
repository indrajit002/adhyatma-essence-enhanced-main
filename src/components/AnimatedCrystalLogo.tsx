import logoPng from '@/assets/logo.png';

const AnimatedCrystalLogo = () => {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mx-auto">
      {/* Multi-layered background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-lg animate-float" style={{ animationDelay: '6s' }} />
      
      {/* Rotating ring around the logo with realistic planets */}
      <div className="absolute inset-0 border-2 border-purple-300/30 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}>
        {/* Mercury - Small, cratered, orange */}
        <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)',
               boxShadow: '0 0 8px rgba(251, 146, 60, 0.4), inset 0 0 4px rgba(0,0,0,0.2)'
             }}>
          {/* Mercury's craters */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-black/20 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-black/15 rounded-full"></div>
          <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-black/10 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-black/12 rounded-full"></div>
        </div>
        
        {/* Venus - Bright, cloudy, yellow-white */}
        <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 20% 20%, #fde68a, #fbbf24, #f59e0b)',
               boxShadow: '0 0 10px rgba(251, 191, 36, 0.5), inset 0 0 5px rgba(255,255,255,0.3)'
             }}>
          {/* Venus's cloud patterns */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-white/15 rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-white/25 rounded-full"></div>
        </div>
        
        {/* Earth - Blue-green with continents */}
        <div className="absolute left-0 top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 25% 25%, #60a5fa, #3b82f6, #1d4ed8)',
               boxShadow: '0 0 10px rgba(59, 130, 246, 0.4), inset 0 0 5px rgba(34, 197, 94, 0.2)'
             }}>
          {/* Earth's continents */}
          <div className="absolute top-1 left-2 w-2 h-1 bg-green-600/60 rounded-full"></div>
          <div className="absolute bottom-2 right-1 w-1 h-2 bg-green-600/60 rounded-full"></div>
          <div className="absolute top-3 right-2 w-1.5 h-1 bg-green-500/50 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-700/50 rounded-full"></div>
          {/* Earth's atmosphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        {/* Mars - Red with polar caps */}
        <div className="absolute right-0 top-1/2 w-5 h-5 rounded-full transform -translate-y-1/2 translate-x-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 30% 30%, #f87171, #ef4444, #dc2626)',
               boxShadow: '0 0 8px rgba(239, 68, 68, 0.4), inset 0 0 4px rgba(0,0,0,0.15)'
             }}>
          {/* Mars's polar ice caps */}
          <div className="absolute top-0 left-1/2 w-2 h-1 bg-white/40 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-1 bg-white/40 rounded-full transform -translate-x-1/2"></div>
          {/* Mars's surface features */}
          <div className="absolute top-2 left-1 w-1 h-0.5 bg-red-600/60 rounded-full"></div>
          <div className="absolute bottom-2 right-1 w-0.5 h-1 bg-red-700/50 rounded-full"></div>
        </div>
      </div>
      
      {/* Inner rotating ring with realistic gas giants */}
      <div className="absolute inset-4 border border-purple-200/40 rounded-full animate-spin-reverse" style={{ animationDuration: '40s' }}>
        {/* Jupiter - Large, orange with atmospheric bands */}
        <div className="absolute top-0 left-1/2 w-10 h-10 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 20% 20%, #fcd34d, #f59e0b, #d97706)',
               boxShadow: '0 0 12px rgba(245, 158, 11, 0.4), inset 0 0 6px rgba(0,0,0,0.15)'
             }}>
          {/* Jupiter's atmospheric bands */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
          <div className="absolute top-2 left-0 right-0 h-1 bg-orange-400/60 rounded-full"></div>
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-orange-500/60 rounded-full"></div>
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-orange-400/60 rounded-full"></div>
          <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-orange-500/60 rounded-full"></div>
          {/* Great Red Spot */}
          <div className="absolute top-3 left-2 w-2 h-1.5 bg-red-500/40 rounded-full"></div>
          {/* Additional storm spots */}
          <div className="absolute top-1 right-2 w-1 h-1 bg-red-400/30 rounded-full"></div>
          <div className="absolute bottom-3 right-1 w-1 h-1 bg-red-400/30 rounded-full"></div>
        </div>
        
        {/* Saturn - Yellow with detailed rings */}
        <div className="absolute bottom-0 left-1/2 w-8 h-8 rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 25% 25%, #fef3c7, #fde68a, #f59e0b)',
               boxShadow: '0 0 10px rgba(251, 191, 36, 0.3), inset 0 0 5px rgba(255,255,255,0.2)'
             }}>
          {/* Saturn's atmospheric bands */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-yellow-300/50 rounded-full"></div>
          <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-yellow-300/50 rounded-full"></div>
          {/* Saturn's rings */}
          <div className="absolute -inset-3 border-2 border-yellow-300/50 rounded-full"></div>
          <div className="absolute -inset-5 border border-yellow-200/30 rounded-full"></div>
          <div className="absolute -inset-7 border border-yellow-100/20 rounded-full"></div>
        </div>
        
        {/* Neptune - Deep blue with storm spots */}
        <div className="absolute left-0 top-1/2 w-7 h-7 rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 25% 25%, #3b82f6, #1d4ed8, #1e3a8a)',
               boxShadow: '0 0 10px rgba(59, 130, 246, 0.4), inset 0 0 5px rgba(0,0,0,0.2)'
             }}>
          {/* Neptune's storm spots */}
          <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/30 rounded-full"></div>
          {/* Atmospheric bands */}
          <div className="absolute top-1 left-0 right-0 h-0.5 bg-blue-400/40 rounded-full"></div>
          <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-blue-400/40 rounded-full"></div>
        </div>
        
        {/* Uranus - Light blue-green with subtle bands */}
        <div className="absolute right-0 top-1/2 w-7 h-7 rounded-full transform -translate-y-1/2 translate-x-1/2 shadow-lg overflow-hidden"
             style={{ 
               background: 'radial-gradient(circle at 25% 25%, #67e8f9, #22d3ee, #0891b2)',
               boxShadow: '0 0 10px rgba(34, 211, 238, 0.4), inset 0 0 5px rgba(255,255,255,0.15)'
             }}>
          {/* Uranus's atmospheric bands */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"></div>
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-cyan-300/50 rounded-full"></div>
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-cyan-200/40 rounded-full"></div>
          <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-cyan-300/50 rounded-full"></div>
          <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-cyan-200/40 rounded-full"></div>
          {/* Cloud features */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/15 rounded-full"></div>
        </div>
      </div>
      
      {/* Logo Container with enhanced animations */}
      <div className="relative z-10 w-full h-full animate-crystal-pulse">
        <img
          src={logoPng}
          alt="Adhyatma Crystal Logo"
          className="w-full h-full object-contain drop-shadow-2xl animate-logo-glow"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
          }}
        />
      </div>
      
      
      {/* Energy waves around the crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute inset-0 border border-purple-300/20 rounded-full animate-pulse-glow"
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: '6s',
              transform: `scale(${0.8 + i * 0.2})`,
            }}
          />
        ))}
      </div>
      
    </div>
  );
};

export default AnimatedCrystalLogo;
