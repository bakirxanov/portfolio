import { useEffect, useState } from 'react';

/**
 * Tracks normalized mouse position (-0.5 to 0.5 on each axis) for parallax effects.
 * @param {number} strength multiplier applied to the returned offsets
 */
export default function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [strength]);

  return offset;
}
