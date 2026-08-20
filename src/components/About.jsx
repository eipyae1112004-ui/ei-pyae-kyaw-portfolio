import {
  FiZap, FiCpu, FiSmartphone, FiTarget, FiPenTool,
  FiSearch, FiTool, FiCheckCircle,
} from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'
import { about, profile } from '../data'
import smilingImg from '../assets/kath-smiling.jpg'
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

const TICKET_CARDS = [
  { icon: <FiSearch />, accent: 'var(--navy-800)' },
  { icon: <FiZap />, accent: 'var(--blue-600)' },
  { icon: <FiTool />, accent: 'var(--blue-400)' },
  { icon: <FiCheckCircle />, accent: 'var(--sky-300)' },
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

        {/* ---------- Session 2: ticket cards — icon+flag, title, desc, number band ---------- */}
        <div className="about__diagram reveal reveal-delay-1">
          <span className="eyebrow about__diagram-eyebrow">How I Think</span>
          <h3 className="about__diagram-title">{about.philosophy.title}</h3>

          <div className="about__tickets">
            {about.philosophy.points.map((pt, i) => (
              <div className="about__ticket" key={pt.heading} style={{ '--accent': TICKET_CARDS[i].accent }}>
                <span className="about__ticket-flag" aria-hidden="true" />
                <span className="about__ticket-icon">{TICKET_CARDS[i].icon}</span>
                <h4 className="about__ticket-title">{pt.heading}</h4>
                <p className="about__ticket-text">{pt.short}</p>
                <span className="about__ticket-band" aria-hidden="true" />
                <span className="about__ticket-number">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
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
