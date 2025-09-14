import { useLenis } from '@/hooks/useLenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  // Initialize Lenis using the custom hook
  useLenis();

  return <>{children}</>;
};

export default LenisProvider;
