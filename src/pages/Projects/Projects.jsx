import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/Cards/ProjectCard/ProjectCard';
import { fadeUp } from '../../utils/animations';

const IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
];

export default function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true });

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-3 text-center"
        >
          {t('projects.subtitle')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient"
        >
          {t('projects.title')}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(projects) &&
            projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                image={IMAGES[i % IMAGES.length]}
                liveUrl={`https://example.com/projects/${i + 1}`}
                repoUrl={`https://github.com/example/project-${i + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
