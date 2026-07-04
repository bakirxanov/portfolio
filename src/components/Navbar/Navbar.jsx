import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const LINKS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/skills', key: 'skills' },
  { to: '/statistics', key: 'statistics' },
  { to: '/projects', key: 'projects' },
  { to: '/contact', key: 'contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-card py-3' : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <NavLink
            to="/"
            className="font-display text-2xl font-bold tracking-tight text-white"
            data-cursor-hover
          >
            A<span className="text-accent">.</span>B
          </NavLink>

          <ul className="hidden lg:flex items-center gap-9">
            {LINKS.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={link.to}
                  data-cursor-hover
                  className={({ isActive }) =>
                    `relative py-1 text-sm tracking-wide uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                    } nav-link-underline`
                  }
                >
                  {({ isActive }) => (
                    <span className="relative inline-block">
                      {t(`nav.${link.key}`)}
                      <span
                        className={`absolute left-0 -bottom-1.5 h-[2px] bg-gradient-to-r from-accent to-accent-hover transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] glass rounded-lg"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-white block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[2px] bg-white block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-white block origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass-strong lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-display font-medium ${
                        isActive ? 'text-accent-hover' : 'text-white'
                      }`
                    }
                  >
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
