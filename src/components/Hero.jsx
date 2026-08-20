import { useEffect, useState } from 'react'
import { HiArrowDown } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { profile } from '../data'
import profileImg from '../assets/profile.png'
import './Hero.css'

function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1400 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        const next = deleting
          ? currentWord.slice(0, text.length - 1)
          : currentWord.slice(0, text.length + 1)
        setText(next)
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
        <span className="hero__blob hero__blob--3" />
        <div className="hero__grid" />
        <span className="hero__orbit hero__orbit--1" />
        <span className="hero__orbit hero__orbit--2" />
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <p className="hero__greeting">Hi, my name is</p>
          <h1 className="hero__name">
            {profile.name} <span className="gradient-text">({profile.nickname})</span>
          </h1>
          <h2 className="hero__role">
            I'm a <span className="hero__typed">{typed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-ghost">Let's Connect</a>
          </div>

          <div className="hero__socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>

        <div className="hero__portrait">
          <div className="hero__portrait-ring" />
          <div className="hero__portrait-frame">
            <img src={profileImg} alt={`${profile.name} portrait`} />
          </div>
          <span className="hero__badge hero__badge--1">⚙️ Automation</span>
          <span className="hero__badge hero__badge--2">💻 Full-Stack</span>
          <span className="hero__badge hero__badge--3">🤖 RPA</span>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
        <HiArrowDown size={20} />
      </a>
    </section>
  )
}
