# Premium Developer Portfolio

An extremely premium, award-winning-style developer portfolio built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Lenis** smooth scroll. Fully multilingual (Uzbek / English / Russian) via **react-i18next**.

![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tech](https://img.shields.io/badge/Vite-6-B073FF?logo=vite&logoColor=white)
![Tech](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)

## ✨ Features

- **Glassmorphism & neumorphism UI** with glow, gradient and blur effects
- **Custom cursor**, scroll progress bar, animated loading screen
- **Animated hero** with typing effect and an orbiting technology-icon ring around the profile photo
- **GSAP-powered scroll timeline** on the About page
- **3D tilt project & skill cards** with glassmorphic glow borders
- **Animated statistics dashboard** — CountUp counters, circular progress rings, animated bars
- **Premium contact form** with client-side validation and TanStack Query mutation
- **Full i18n**: Uzbek 🇺🇿, English 🇺🇸, Russian 🇷🇺 — every string in the UI is translatable
- **Smooth scrolling** via Lenis, mouse-parallax backgrounds, floating particles
- Fully responsive: desktop, laptop, tablet, mobile
- Respects `prefers-reduced-motion`

## 🧱 Tech Stack

| Category      | Tools                                                        |
| -------------- | ------------------------------------------------------------ |
| Framework      | React 19, Vite 6                                              |
| Routing        | React Router DOM                                              |
| Data / State   | TanStack React Query, Axios                                   |
| Styling        | Tailwind CSS                                                  |
| Animation      | Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll      |
| Icons          | react-icons, lucide-react                                     |
| i18n           | i18next, react-i18next, i18next-browser-languagedetector      |
| Utilities      | clsx, react-intersection-observer, react-countup, swiper      |

## 📁 Project Structure

```
src/
  assets/            # images, icons, animation assets
  components/
    Navbar/          # sticky glass navbar + mobile menu
    Footer/          # animated footer, back-to-top
    Hero/            # hero section, typing effect
    SkillOrbit/       # orbiting technology icons
    Buttons/         # reusable animated button
    Cards/
      ProjectCard/
      SkillCard/
      StatisticCard/
    Charts/          # circular progress
    LanguageSwitcher/
    Loader/          # animated boot loader
    Cursor/          # custom cursor
    ScrollProgress/  # top scroll progress bar
    Background/      # particles, blur circles, glow grid
  layouts/
    MainLayout.jsx   # navbar + footer + page transitions wrapper
  pages/
    Home/ About/ Skills/ Statistics/ Projects/ Contact/ NotFound/
  hooks/             # useLenis, useMouseParallax
  services/api/      # axios client + contact form service
  context/
  routes/
  locales/
    uz/translation.json
    en/translation.json
    ru/translation.json
  styles/
  utils/             # framer-motion animation variants
  App.jsx
  main.jsx
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

## 🌍 Environment Variables

Copy `.env.example` to `.env` if you want to wire the contact form to a real backend:

```
VITE_API_BASE_URL=https://your-api.com
```

If left empty, the contact form runs in **demo mode** and simulates a successful submission — perfect for showcasing the UI without a backend.

## 🖼️ Replacing Placeholder Assets

- `public/images/profile.png` — replace with your real profile photo (square image recommended).
- `public/cv.pdf` — replace with your real resume/CV.
- Project screenshots in `src/pages/Projects/Projects.jsx` currently use Unsplash placeholder URLs — swap them for real project images.
- Social links (Telegram, Instagram, GitHub, LinkedIn) in `Footer.jsx` and `Contact.jsx` — update with your real profile URLs.

## 🌐 Adding / Editing Translations

All UI copy lives in `src/locales/{uz,en,ru}/translation.json`. Keys are organized by page/section (`nav`, `hero`, `about`, `skills`, `statistics`, `projects`, `contact`, `footer`, `notFound`, `loader`, `home`). Add a new language by creating a new folder + JSON file and registering it in `src/i18n.js`.

## 🎨 Color Palette

| Token              | Hex       |
| ------------------ | --------- |
| Background          | `#071426` |
| Secondary Background| `#0D1B2A` |
| Card                | `#10243D` |
| Border (dark red)   | `#8B0000` |
| Accent              | `#C1121F` |
| Accent Hover        | `#E63946` |
| Text                | `#FFFFFF` |
| Secondary Text      | `#CFCFCF` |

## 📄 License

Free to use and modify for personal or commercial portfolio purposes.
