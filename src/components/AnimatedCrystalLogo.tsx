import logoPng from '@/assets/logo.png';

const AnimatedCrystalLogo = () => {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mx-auto">
      {/* Multi-layered background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d1bccd]/40 to-[#d1bccd]/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#d1bccd]/30 to-[#b094b2]/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#b094b2]/30 to-[#d1bccd]/30 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-lg animate-float" style={{ animationDelay: '6s' }} />
      
      
      {/* Logo Container with enhanced animations */}
      <div className="relative z-10 w-full h-full animate-crystal-pulse">
        <img
          src={logoPng}
          alt="Adhyatma Crystal Logo"
          className="w-full h-full object-contain drop-shadow-2xl animate-logo-glow"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(176, 148, 178, 0.3))',
          }}
        />
      </div>
      
      
      {/* Energy waves around the crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute inset-0 border border-[#b094b2]/20 rounded-full animate-pulse-glow"
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
