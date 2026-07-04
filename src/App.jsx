import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Skills from './pages/Skills/Skills';
import Statistics from './pages/Statistics/Statistics';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <>
      <Loader />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
