import logoPng from '@/assets/logo.png';

const AnimatedCrystalLogo = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mx-auto">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b094b2]/40 to-[#d1bccd]/40 rounded-full blur-3xl animate-pulse" />
      
      {/* Additional floating glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d1bccd]/30 to-[#b094b2]/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#b094b2]/30 to-[#d1bccd]/30 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Logo Container */}
      <div className="relative z-10 w-full h-full animate-crystal-pulse">
        <img
          src={logoPng}
          alt="Adhyatma Crystal Logo"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
          }}
        />
      </div>
      
      {/* Floating particles around the crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-particle-float ${
              i % 3 === 0 ? 'bg-[#b094b2]/60' : 
              i % 3 === 1 ? 'bg-[#d1bccd]/60' : 
              'bg-indigo-400/60'
            }`}
            style={{
              left: `${20 + (i * 8)}%`,
              top: `${30 + (i * 5)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '5s',
            }}
          />
        ))}
      </div>
      
      {/* Energy waves around the crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute inset-0 border border-[#b094b2]/20 rounded-full animate-ping"
            style={{
              animationDelay: `${i * 3}s`,
              animationDuration: '8s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCrystalLogo;
