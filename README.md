# Ei Pyae Kyaw — Developer Portfolio

A personal portfolio site for **Ei Pyae Kyaw (Kathryn Ei)** — Software Developer | RPA Developer | IT Technician | Web Developer.

Built as a single-page React app with a calm blue / navy visual theme, scroll-triggered animations, an animated hero section, and clickable project cards that pop open with details and a link through to GitHub.

**Live demo:** _add your deployed URL here once published (Vercel / Netlify / GitHub Pages)_

---

## ✨ Features

- **Landing / Hero** — animated intro with a rotating role typewriter, floating gradient blobs, and a framed portrait.
- **About Me** — personal story, engineering philosophy, and lifestyle section with layered oval + square photo shapes.
- **Skills** — Core Skills (animated progress bars), Technical Skills, and Design Tools, grouped into cards.
- **Projects** — a responsive grid of real projects; click a card to open a modal with the full description and a link to the GitHub repo.
- **Contact** — quick-access cards for LinkedIn, WhatsApp, and Email.
- Scroll-reveal animations built with `IntersectionObserver` (no heavy animation library required).
- Fully responsive, mobile-first layout with a slide-out navigation menu.

## 🛠 Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- Plain CSS (custom properties, keyframe animations, gradients)
- [react-icons](https://react-icons.github.io/react-icons/) for iconography

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

The dev server runs at `http://localhost:5173` by default.

## 📁 Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/            # profile photo(s)
│   ├── components/        # Navbar, Hero, About, Skills, Projects, Contact, Footer, ProjectModal
│   ├── hooks/
│   │   └── useReveal.js   # scroll-reveal IntersectionObserver hook
│   ├── data.js            # all editable content: profile, skills, projects, about copy
│   ├── App.jsx
│   ├── index.css          # design tokens, global styles, shared animations
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## ✏️ Editing Content

Almost everything on the site — bio text, skills, project descriptions, GitHub links, contact info — lives in **`src/data.js`**. Update that file to change the copy without touching component code.

To swap in real photos for the About section's lifestyle layout, drop new images into `src/assets/` and update the `import profileImg from '../assets/profile.png'` line(s) in `Hero.jsx` and `About.jsx`.

> Note: project GitHub links in `src/data.js` currently use placeholder repo names under `github.com/eipyae1112004-ui/...`. Update each `github` field with your real repository URL once it's pushed.

## 🎨 Design Notes

The palette is built around calm navy and light blue tones:

| Token | Hex | Use |
|---|---|---|
| `--navy-900` / `--navy-800` | `#061229` / `#0a1f44` | Hero & contact backgrounds |
| `--blue-600` / `--blue-500` | `#2563eb` / `#3b82f6` | Primary accents, buttons |
| `--sky-300` | `#7dd3fc` | Highlights, gradients |
| `--sky-100` / `--ice-50` | `#e6f4ff` / `#f4f9ff` | Light section backgrounds |

## 📦 Deployment

This is a static Vite build, so it deploys cleanly to **Vercel**, **Netlify**, or **GitHub Pages**:

```bash
npm run build
# deploy the generated dist/ folder
```

For GitHub Pages, set `base: '/<repo-name>/'` in `vite.config.js` before building.

## 📄 License

Personal portfolio — feel free to fork the structure for your own site, but please swap out the content and photos.

---

Made with React, curiosity, and a genuine love for solving real-world problems with technology.
