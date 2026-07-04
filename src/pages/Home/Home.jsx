import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
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
  SiGithub,
  SiVite,
  SiFramer,
} from 'react-icons/si';
import Hero from '../../components/Hero/Hero';
import { fadeUp, staggerContainer } from '../../utils/animations';

const ICONS = [Code2, Palette, Rocket];

const TECH_LOGOS = [
  { Icon: SiReact, name: 'React', color: '#61DAFB' },
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { Icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
  { Icon: SiCss, name: 'CSS3', color: '#1572B6' },
  { Icon: SiTailwindcss, name: 'Tailwind', color: '#38BDF8' },
  { Icon: SiRedux, name: 'Redux', color: '#764ABC' },
  { Icon: SiReactquery, name: 'React Query', color: '#FF4154' },
  { Icon: SiAxios, name: 'Axios', color: '#5A29E4' },
  { Icon: SiNodedotjs, name: 'Node.js', color: '#3C873A' },
  { Icon: SiGit, name: 'Git', color: '#F05032' },
  { Icon: SiGithub, name: 'GitHub', color: '#FFFFFF' },
  { Icon: SiVite, name: 'Vite', color: '#B073FF' },
  { Icon: SiFramer, name: 'Framer Motion', color: '#E63946' },
];

export default function Home() {
  const { t } = useTranslation();
  const features = t('home.features', { returnObjects: true });

  return (
    <>
      <Hero />

      <section className="relative py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {Array.isArray(features) &&
              features.map((feature, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.div
                    key={feature.title}
                    custom={i}
                    variants={fadeUp}
                    className="relative rounded-2xl p-8 glass glow-border shadow-card"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-border/10 border border-border/30 flex items-center justify-center text-accent-hover mb-6">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{feature.text}</p>
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-text-secondary">
            Technologies I work with
          </p>
        </div>
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={40}
          loop
          freeMode
          speed={4500}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          className="tech-marquee"
        >
          {[...TECH_LOGOS, ...TECH_LOGOS].map(({ Icon, name, color }, i) => (
            <SwiperSlide key={`${name}-${i}`} style={{ width: 'auto' }}>
              <div className="flex items-center gap-3 px-6 py-3 rounded-full glass border border-border/25">
                <Icon size={20} color={color} />
                <span className="text-sm text-text-secondary whitespace-nowrap">{name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
