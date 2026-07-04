import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiAxios,
  SiNodedotjs,
  SiGit,
  SiFramer,
} from 'react-icons/si';
import SkillCard from '../../components/Cards/SkillCard/SkillCard';
import { fadeUp } from '../../utils/animations';

const ICON_MAP = {
  React: SiReact,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  Redux: SiRedux,
  'React Query': SiReactquery,
  Axios: SiAxios,
  'Node.js': SiNodedotjs,
  'Git & GitHub': SiGit,
  'Framer Motion': SiFramer,
};

export default function Skills() {
  const { t } = useTranslation();
  const skills = t('skills.list', { returnObjects: true });

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-3 text-center"
        >
          {t('skills.subtitle')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient"
        >
          {t('skills.title')}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(skills) &&
            skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} icon={ICON_MAP[skill.name]} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
