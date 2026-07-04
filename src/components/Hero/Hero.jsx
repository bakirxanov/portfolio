import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Mail, FolderKanban, ChevronDown } from 'lucide-react';
import AnimatedButton from '../Buttons/AnimatedButton';
import SkillOrbit from '../SkillOrbit/SkillOrbit';
import useMouseParallax from '../../hooks/useMouseParallax';

function useTypingRoles(roles) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles?.length) return undefined;
    const current = roles[roleIndex % roles.length];
    const speed = deleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return text;
}

export default function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true });
  const typedText = useTypingRoles(Array.isArray(roles) ? roles : []);
  const parallax = useMouseParallax(10);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* LEFT */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-4"
          >
            {t('hero.greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-4"
          >
            <span className="text-gradient">{t('hero.name')}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-display font-semibold text-white/90 mb-6 h-10"
          >
            {typedText}
            <span className="inline-block w-[2px] h-7 bg-accent-hover ml-1 align-middle animate-blink" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-text-secondary text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
          >
            {t('hero.paragraph')}
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <AnimatedButton href="/cv.pdf" variant="primary" direction="left" icon={Download}>
              {t('hero.downloadCv')}
            </AnimatedButton>
            <AnimatedButton to="/contact" variant="secondary" direction="bottom" icon={Mail}>
              {t('hero.contactMe')}
            </AnimatedButton>
            <AnimatedButton to="/projects" variant="ghost" direction="right" icon={FolderKanban}>
              {t('hero.viewProjects')}
            </AnimatedButton>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center h-[420px] md:h-[520px]">
          <SkillOrbit />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)` }}
            className="relative z-10 w-44 h-44 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-br from-border via-accent to-accent-hover shadow-glow-lg animate-pulse-glow"
          >
            <img
              src="/images/profile.png"
              alt="Portrait"
              className="w-full h-full object-cover rounded-full border-4 border-bg"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
      >
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
