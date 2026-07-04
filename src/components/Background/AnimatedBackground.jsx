import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useMouseParallax from '../../hooks/useMouseParallax';

export default function AnimatedBackground({ dense = false }) {
  const parallax = useMouseParallax(14);

  const particles = useMemo(() => {
    const count = dense ? 46 : 28;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  }, [dense]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* glowing grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(193,18,31,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(193,18,31,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
        }}
      />

      {/* blur circles / moving gradient lights */}
      <motion.div
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-accent/20 blur-[120px]"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-border/20 blur-[130px]"
        style={{ transform: `translate(${-parallax.x}px, ${-parallax.y}px)` }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full bg-accent-hover/10 blur-[110px]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/40"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="noise-overlay" />
    </div>
  );
}
