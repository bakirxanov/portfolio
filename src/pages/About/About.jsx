import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Download } from 'lucide-react';
import AnimatedButton from '../../components/Buttons/AnimatedButton';
import { fadeUp, fromLeft, fromRight } from '../../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const timeline = t('about.timeline', { returnObjects: true });
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [timeline]);

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-accent-hover tracking-[0.3em] uppercase text-sm mb-3 text-center"
        >
          {t('about.subtitle')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient"
        >
          {t('about.title')}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-24">
          <motion.div variants={fromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-semibold text-white mb-4">
              {t('about.whoIAm')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">{t('about.whoIAmText')}</p>
            <AnimatedButton href="/cv.pdf" variant="primary" icon={Download}>
              {t('about.downloadCv')}
            </AnimatedButton>
          </motion.div>

          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden glass glow-border shadow-card aspect-square"
          >
            <img
              src="/images/dnx.jpg"
              alt="About"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-12 text-center">
          {t('about.timelineTitle')}
        </h2>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-accent to-transparent md:-translate-x-1/2" />

          {Array.isArray(timeline) &&
            timeline.map((item, i) => {
              const isEducation = item.type === 'education';
              const alignLeft = i % 2 === 0;
              return (
                <div
                  key={item.title + i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className={`relative mb-12 md:w-1/2 ${
                    alignLeft ? 'md:pr-12 md:ml-0 md:text-right' : 'md:pl-12 md:ml-auto'
                  }`}
                >
                  <span
                    className={`absolute -left-[2.15rem] md:left-auto top-1 w-4 h-4 rounded-full bg-accent shadow-glow border-2 border-bg ${
                      alignLeft ? 'md:-right-2' : 'md:-left-2'
                    }`}
                  />
                  <div className="rounded-2xl p-6 glass glow-border shadow-card inline-block w-full">
                    <div
                      className={`flex items-center gap-2 mb-2 text-accent-hover text-xs uppercase tracking-widest ${
                        alignLeft ? 'md:justify-end' : ''
                      }`}
                    >
                      {isEducation ? <GraduationCap size={14} /> : <Briefcase size={14} />}
                      {isEducation ? t('about.educationTitle') : t('about.experienceTitle')}
                    </div>
                    <p className="text-xs text-text-secondary mb-1">{item.year}</p>
                    <h3 className="font-display font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-accent-hover mb-2">{item.place}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
