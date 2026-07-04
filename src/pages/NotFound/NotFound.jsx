import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';
import AnimatedButton from '../../components/Buttons/AnimatedButton';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[7rem] sm:text-[10rem] font-extrabold leading-none text-gradient select-none"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-2xl md:text-3xl font-semibold text-white mb-3"
        >
          {t('notFound.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-text-secondary mb-10 max-w-md mx-auto"
        >
          {t('notFound.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnimatedButton to="/" variant="primary" icon={HomeIcon}>
            {t('notFound.backHome')}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
