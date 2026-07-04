import { motion } from 'framer-motion';
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiAxios,
  SiGit,
  SiGithub,
  SiVite,
  SiNodedotjs,
  SiFramer,
} from 'react-icons/si';

const ICONS = [
  { Icon: SiReact, color: '#61DAFB' },
  { Icon: SiHtml5, color: '#E34F26' },
  { Icon: SiCss, color: '#1572B6' },
  { Icon: SiJavascript, color: '#F7DF1E' },
  { Icon: SiTypescript, color: '#3178C6' },
  { Icon: SiTailwindcss, color: '#38BDF8' },
  { Icon: SiRedux, color: '#764ABC' },
  { Icon: SiReactquery, color: '#FF4154' },
  { Icon: SiAxios, color: '#5A29E4' },
  { Icon: SiGit, color: '#F05032' },
  { Icon: SiGithub, color: '#FFFFFF' },
  { Icon: SiVite, color: '#B073FF' },
  { Icon: SiNodedotjs, color: '#3C873A' },
  { Icon: SiFramer, color: '#E63946' },
];

export default function SkillOrbit() {
  const count = ICONS.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* orbit rings (decorative) */}
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-border/25" />
      <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-border/15" />

      {ICONS.map(({ Icon, color }, i) => {
        const angle = (360 / count) * i;
        const radiusDesktop = i % 2 === 0 ? 190 : 240;
        const duration = 22 + (i % 4) * 6;
        const reverse = i % 2 === 0;

        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 0,
              height: 0,
              transform: `rotate(${angle}deg)`,
            }}
          >
            <motion.div
              className="absolute"
              style={{ '--orbit-radius': `${radiusDesktop}px` }}
              animate={{ rotate: reverse ? -360 : 360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                style={{ transform: `translateX(${radiusDesktop}px)` }}
                whileHover={{ scale: 1.35 }}
                className="w-11 h-11 md:w-14 md:h-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl glass flex items-center justify-center shadow-glow"
              >
                <motion.div
                  animate={{ rotate: reverse ? 360 : -360 }}
                  transition={{ duration, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon size={22} color={color} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
