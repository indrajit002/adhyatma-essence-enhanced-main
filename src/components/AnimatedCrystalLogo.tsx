import logoPng from '@/assets/logo.png';

const AnimatedCrystalLogo = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mx-auto">
      {/* Multi-layered background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-lg animate-float" style={{ animationDelay: '6s' }} />
      
      {/* Rotating ring around the logo */}
      <div className="absolute inset-0 border-2 border-purple-300/30 rounded-full animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute left-0 top-1/2 w-3 h-3 bg-indigo-400 rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute right-0 top-1/2 w-3 h-3 bg-amber-400 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
      </div>
      
      {/* Inner rotating ring */}
      <div className="absolute inset-4 border border-purple-200/40 rounded-full animate-spin-reverse">
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-300 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-indigo-300 rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute right-0 top-1/2 w-2 h-2 bg-amber-300 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
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
      
      {/* Enhanced floating particles around the crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-orbital-float ${
              i % 4 === 0 ? 'bg-purple-400/70' : 
              i % 4 === 1 ? 'bg-pink-400/70' : 
              i % 4 === 2 ? 'bg-indigo-400/70' :
              'bg-amber-400/70'
            }`}
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${25 + (i * 6)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
      
      {/* Orbital particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`orbital-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-spin-slow"
            style={{
              left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 35}%`,
              top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 35}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '12s',
            }}
          />
        ))}
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
      
      {/* Mystical energy orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className={`absolute w-4 h-4 rounded-full animate-pulse-glow ${
              i % 2 === 0 ? 'bg-gradient-to-r from-purple-400/40 to-pink-400/40' : 
              'bg-gradient-to-r from-indigo-400/40 to-amber-400/40'
            }`}
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${20 + (i * 15)}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '4s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCrystalLogo;
