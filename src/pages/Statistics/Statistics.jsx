import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FolderCheck, Clock3, Users, GitBranch, Code, Layers } from 'lucide-react';
import StatisticCard from '../../components/Cards/StatisticCard/StatisticCard';
import CircularProgress from '../../components/Charts/CircularProgress';
import { fadeUp } from '../../utils/animations';

export default function Statistics() {
  const { t } = useTranslation();
  const { ref: barsRef, inView: barsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { icon: FolderCheck, value: 68, label: t('statistics.projectsCompleted') },
    { icon: Clock3, value: 5, label: t('statistics.yearsLearning') },
    { icon: Users, value: 42, label: t('statistics.happyClients') },
    { icon: GitBranch, value: 130, label: t('statistics.repositories') },
    { icon: Code, value: 9400, label: t('statistics.hoursCoding') },
    { icon: Layers, value: 24, label: t('statistics.technologies') },
  ];

  const radialStats = [
    { value: 95, label: 'React' },
    { value: 88, label: 'UI/UX' },
    { value: 90, label: 'Performance' },
    { value: 85, label: 'Accessibility' },
  ];

  const barStats = [
    { label: 'Frontend Architecture', value: 96 },
    { label: 'Animation & Motion', value: 91 },
    { label: 'API Integration', value: 89 },
    { label: 'Team Collaboration', value: 93 },
  ];

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-3 text-center"
        >
          {t('statistics.subtitle')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient"
        >
          {t('statistics.title')}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((s, i) => (
            <StatisticCard key={s.label} {...s} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl p-8 glass glow-border shadow-card">
            <h3 className="font-display text-xl font-semibold text-white mb-8 text-center">
              Core Strengths
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {radialStats.map((r) => (
                <CircularProgress key={r.label} value={r.value} label={r.label} size={110} />
              ))}
            </div>
          </div>

          <div ref={barsRef} className="rounded-2xl p-8 glass glow-border shadow-card">
            <h3 className="font-display text-xl font-semibold text-white mb-8 text-center">
              Focus Areas
            </h3>
            <div className="space-y-6">
              {barStats.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">{b.label}</span>
                    <span className="text-white font-medium">{b.value}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-border to-accent-hover"
                      initial={{ width: 0 }}
                      animate={barsInView ? { width: `${b.value}%` } : { width: 0 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
