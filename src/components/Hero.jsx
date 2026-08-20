import { useEffect, useState } from 'react'
import { HiArrowDown } from 'react-icons/hi'
import { FiGithub, FiLinkedin, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { profile } from '../data'
import profileImg from '../assets/kath-smiling.jpg'
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
      </div>

      <div className="hero__inner">
        <div className="hero__layout">
          <div className="hero__intro">
            <p className="hero__greeting">Hi, I'm</p>
            <h1 className="hero__name">
              {profile.name} <span className="gradient-text">({profile.nickname})</span>
            </h1>
            <h2 className="hero__role">
              I'm a <span className="hero__typed">{typed}</span>
              <span className="hero__cursor" aria-hidden="true">|</span>
            </h2>
          </div>

          <div className="hero__portrait">
            <svg className="hero__arc-text" viewBox="0 0 300 90" aria-hidden="true">
              <path id="heroArcPath" d="M 20,85 A 130,130 0 0 1 280,85" fill="none" />
              <text>
                <textPath href="#heroArcPath" startOffset="50%" textAnchor="middle">
                  {profile.arcText}
                </textPath>
              </text>
            </svg>

            <span className="hero__orbit-ring hero__orbit-ring--1" aria-hidden="true" />
            <span className="hero__orbit-ring hero__orbit-ring--2" aria-hidden="true" />
            <span className="hero__star hero__star--1" aria-hidden="true">✦</span>
            <span className="hero__star hero__star--2" aria-hidden="true">✦</span>
            <span className="hero__star hero__star--3" aria-hidden="true">✧</span>

            <div className="hero__portrait-frame">
              <img src={profileImg} alt={`${profile.name} portrait`} />
            </div>
          </div>

          <div className="hero__quicklinks">
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="hero__quicklink">
              <FiPhone size={16} /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="hero__quicklink">
              <FiMail size={16} /> {profile.email}
            </a>
            <span className="hero__quicklink hero__quicklink--static">
              <FiMapPin size={16} /> {profile.location}
            </span>
          </div>
        </div>

        <div className="hero__objective">
          <span className="eyebrow">Objective</span>
          <p>{profile.objective}</p>
        </div>

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

      <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
        <HiArrowDown size={20} />
      </a>

      <svg className="hero__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,45 Q120,15 240,45 T480,45 T720,45 T960,45 T1200,45 T1440,45 L1440,100 L0,100 Z"
          fill="var(--ice-50)"
        />
      </svg>
    </section>
  )
}
