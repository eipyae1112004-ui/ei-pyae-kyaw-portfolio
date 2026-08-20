import {
  FiZap, FiCpu, FiSmartphone, FiTarget, FiPenTool,
} from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'
import { about, profile } from '../data'
import smilingImg from '../assets/kath-smiling.jpg'
import laptopImg from '../assets/kath-laptop.jpg'
import useReveal from '../hooks/useReveal'
import IDBadge from './IDBadge'
import './About.css'

const interestIcons = {
  Automation: <FiZap />,
  'New Tech': <FiCpu />,
  Gadgets: <FiSmartphone />,
  'Problem Solving': <FiTarget />,
  Robotics: <TbRobot />,
  'UI/UX': <FiPenTool />,
}

const PINWHEEL_LAYOUT = [
  { rot: '-14deg', tx: '4px', ty: '-54px', z: 2, bg: 'var(--sky-100)', fg: 'var(--navy-800)' },
  { rot: '-4deg', tx: '42px', ty: '-26px', z: 3, bg: 'var(--sky-300)', fg: 'var(--navy-800)' },
  { rot: '6deg', tx: '78px', ty: '10px', z: 6, bg: 'var(--blue-400)', fg: 'var(--white)' },
  { rot: '17deg', tx: '104px', ty: '48px', z: 7, bg: 'linear-gradient(135deg, var(--blue-600), var(--navy-700))', fg: 'var(--white)' },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="section-inner">
        {/* ---------- Session 1: profile — badge centered, meta left, bio right ---------- */}
        <div className="about__intro">
          <div className="about__intro-meta reveal">
            <span className="eyebrow">About Me</span>
            <h2 className="section-title">
              The person behind the <span className="gradient-text">code</span>
            </h2>

            <div className="about__pill-box">
              <span className="about__pill-label">Education</span>
              <div className="about__education">
                <strong>{about.education.period}</strong>
                <div>
                  <span className="about__education-degree">{about.education.degree}</span>
                  <span className="about__education-school">{about.education.school}</span>
                </div>
              </div>
            </div>

            <div className="about__pill-box">
              <span className="about__pill-label">Interests</span>
              <div className="about__tag-row">
                {about.interests.map((tag) => (
                  <span className="about__tag" key={tag}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="about__intro-badge reveal reveal-delay-1">
            <IDBadge photo={smilingImg} name={profile.nickname} role="Software Developer" />
          </div>

          <div className="about__intro-bubble reveal reveal-delay-2">
            <div className="about__bubble">
              <span className="about__bubble-tail" aria-hidden="true" />
              <p>{about.bio}</p>
            </div>
          </div>
        </div>

        {/* ---------- Session 2: philosophy pinwheel — circle + hover-reveal cards ---------- */}
        <div className="about__diagram reveal reveal-delay-1">
          <span className="eyebrow about__diagram-eyebrow">How I Think</span>
          <h3 className="about__diagram-title">{about.philosophy.title}</h3>

          <div className="about__pinwheel">
            {about.philosophy.points.map((pt, i) => (
              <div
                className="about__pinwheel-card"
                key={pt.heading}
                style={{
                  '--rot': PINWHEEL_LAYOUT[i].rot,
                  '--tx': PINWHEEL_LAYOUT[i].tx,
                  '--ty': PINWHEEL_LAYOUT[i].ty,
                  '--z': PINWHEEL_LAYOUT[i].z,
                  '--bg': PINWHEEL_LAYOUT[i].bg,
                  '--fg': PINWHEEL_LAYOUT[i].fg,
                }}
                tabIndex={0}
              >
                <span className="about__pinwheel-step">Step {String(i + 1).padStart(2, '0')}</span>
                <h4 className="about__pinwheel-title">{pt.heading}</h4>
                <p className="about__pinwheel-desc">{pt.text}</p>
              </div>
            ))}

            <div className="about__pinwheel-circle">
              <img src={laptopImg} alt={`${profile.name} portrait`} />
            </div>
          </div>
        </div>

        {/* ---------- Session 3: beyond the screen ---------- */}
        <div className="about__beyond reveal reveal-delay-1">
          <div className="about__beyond-copy">
            <span className="eyebrow">Off Duty</span>
            <h3 className="about__beyond-title">
              Beyond the <span className="gradient-text">screen</span>
            </h3>
            <p className="about__beyond-script">Outside of coding —</p>
            <p className="about__beyond-text">{about.lifestyle.text}</p>
          </div>

          <div className="about__beyond-chips">
            {about.interests.map((tag, i) => (
              <div
                className={`about__beyond-chip about__beyond-chip--${(i % 4) + 1}`}
                key={tag}
                style={{ '--i': i }}
              >
                <span className="about__beyond-chip-icon">{interestIcons[tag]}</span>
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
