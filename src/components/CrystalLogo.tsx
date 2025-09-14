import { cn } from '@/lib/utils';

interface CrystalLogoProps {
  className?: string;
}

const CrystalLogo = ({ className }: CrystalLogoProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* Crystal Shape */}
      <path
        d="M50 10 L70 35 L65 75 L50 90 L35 75 L30 35 Z"
        fill="url(#crystal-gradient)"
        stroke="url(#crystal-stroke)"
        strokeWidth="2"
      />
      <path
        d="M50 10 L50 90 M30 35 L70 35 M35 75 L65 75"
        stroke="url(#crystal-lines)"
        strokeWidth="1"
        opacity="0.6"
      />
      
      {/* Lotus Petals */}
      <g transform="translate(50, 65)">
        <path
          d="M0,-10 Q-8,-8 -10,0 Q-8,8 0,10 Q8,8 10,0 Q8,-8 0,-10"
          fill="url(#lotus-gradient)"
          opacity="0.9"
        />
        <path
          d="M-12,-5 Q-15,0 -12,5 Q-8,3 -5,0 Q-8,-3 -12,-5"
          fill="url(#lotus-gradient)"
          opacity="0.8"
        />
        <path
          d="M12,-5 Q15,0 12,5 Q8,3 5,0 Q8,-3 12,-5"
          fill="url(#lotus-gradient)"
          opacity="0.8"
        />
      </g>
      
      {/* Golden Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#golden-circle)"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.6"
      />
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="crystal-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="crystal-lines" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="lotus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id="golden-circle">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default CrystalLogo;