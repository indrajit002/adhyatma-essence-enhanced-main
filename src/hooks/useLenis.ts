import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis if not already initialized
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
    }

    // Animation frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo: (target: string | number | HTMLElement, options?: any) => {
      lenisRef.current?.scrollTo(target, options);
    },
    stop: () => {
      lenisRef.current?.stop();
    },
    start: () => {
      lenisRef.current?.start();
    },
    destroy: () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    },
  };
};
