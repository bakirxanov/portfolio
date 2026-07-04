import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const VARIANTS = {
  hidden: (dir = 'bottom') => {
    const map = {
      left: { x: -60, y: 0 },
      right: { x: 60, y: 0 },
      top: { x: 0, y: -60 },
      bottom: { x: 0, y: 60 },
    };
    return { opacity: 0, ...map[dir] };
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * @param {'primary'|'secondary'|'ghost'} variant
 * @param {'left'|'right'|'top'|'bottom'} direction entry direction for the reveal animation
 */
export default function AnimatedButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  direction = 'bottom',
  type = 'button',
  className = '',
  icon: Icon,
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide overflow-hidden transition-colors duration-300';

  const styles = {
    primary: `${base} bg-accent text-white hover:bg-accent-hover shadow-glow`,
    secondary: `${base} glass border border-border/50 text-white hover:border-accent-hover`,
    ghost: `${base} text-white hover:text-accent-hover`,
  };

  const content = (
    <motion.span
      custom={direction}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={VARIANTS}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`${styles[variant]} ${className}`}
      data-cursor-hover
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <NavLink to={to} className="inline-block">
        {content}
      </NavLink>
    );
  }

  if (href) {
    return (
      <a href={href} download className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
