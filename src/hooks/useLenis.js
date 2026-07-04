import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth-scroll for the whole app.
 * Safe to mount once at the top of the tree (e.g. in MainLayout).
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    document.documentElement.classList.add('has-lenis');

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('has-lenis');
    };
  }, []);
}
