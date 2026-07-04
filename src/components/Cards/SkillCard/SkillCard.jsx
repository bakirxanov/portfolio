import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SkillCard({ skill, icon: Icon, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 12 });
  }

  return (
    <motion.div
      ref={(node) => {
        cardRef.current = node;
        ref(node);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="relative rounded-2xl p-6 glass glow-border shadow-card transition-transform duration-300"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-border/10 border border-border/30 flex items-center justify-center text-accent-hover">
          {Icon ? <Icon size={22} /> : <span className="font-bold">{skill.name[0]}</span>}
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">{skill.name}</h3>
          <p className="text-xs text-text-secondary">{skill.level}%</p>
        </div>
      </div>

      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-border to-accent-hover"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
