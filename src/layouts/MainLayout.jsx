import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import AnimatedBackground from '../components/Background/AnimatedBackground';
import CustomCursor from '../components/Cursor/CustomCursor';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import useLenis from '../hooks/useLenis';
import { pageTransition } from '../utils/animations';

export default function MainLayout() {
  const location = useLocation();
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg text-text font-body">
      <AnimatedBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
