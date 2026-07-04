import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';

const SOCIALS = [
  { icon: FaTelegramPlane, href: 'https://t.me/bakirxanov', label: 'Telegram' },
  { icon: FaInstagram, href: 'https://www.instagram.com/bakirxanovv_/', label: 'Instagram' },
  { icon: FaGithub, href: 'https://github.com/bakirxanov', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/example', label: 'LinkedIn' },
];

const LINKS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/skills', key: 'skills' },
  { to: '/projects', key: 'projects' },
  { to: '/contact', key: 'contact' },
];

export default function Footer() {
  const { t } = useTranslation();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="relative border-t border-border/20 bg-bg-secondary/60 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold mb-3">
            A<span className="text-accent">.</span>B
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white mb-4">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={link.to}
                  className="text-text-secondary text-sm hover:text-accent-hover transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white mb-4">
            {t('contact.followMe')}
          </h4>
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor-hover
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-11 h-11 flex items-center justify-center rounded-full glass border border-border/40 text-white hover:text-accent-hover hover:shadow-glow transition-all"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-white/5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-secondary">
          © {new Date().getFullYear()} Akmal Bakirxanov. {t('footer.rights')}
        </p>

        <motion.button
          onClick={scrollToTop}
          data-cursor-hover
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-white glass px-4 py-2 rounded-full border border-border/40 hover:shadow-glow transition-all"
        >
          <ArrowUp size={14} />
          {t('footer.backToTop')}
        </motion.button>
      </div>
    </footer>
  );
}
