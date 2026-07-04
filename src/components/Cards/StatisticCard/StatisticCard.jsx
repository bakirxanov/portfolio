import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function StatisticCard({ icon: Icon, value, suffix = '+', label, index = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl p-8 text-center glass glow-border shadow-card"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-border/10 border border-border/30 flex items-center justify-center text-accent-hover">
        <Icon size={26} />
      </div>
      <p className="font-display text-4xl font-extrabold text-white mb-1">
        {inView && <CountUp end={value} duration={2.2} separator="," />}
        {suffix}
      </p>
      <p className="text-sm text-text-secondary uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
