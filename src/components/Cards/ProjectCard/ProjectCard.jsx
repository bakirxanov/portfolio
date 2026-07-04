import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project, index, image, liveUrl, repoUrl }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 14 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative rounded-2xl overflow-hidden glass glow-border shadow-card transition-transform duration-300 will-change-transform"
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-115 transition-transform duration-700"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-border/10 border border-border/40 text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-white transition-colors"
          >
            <ExternalLink size={14} /> {t('projects.liveDemo')}
          </a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass border border-border/40 hover:border-accent-hover text-white transition-colors"
          >
            <Github size={14} /> {t('projects.sourceCode')}
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow" />
    </motion.div>
  );
}
