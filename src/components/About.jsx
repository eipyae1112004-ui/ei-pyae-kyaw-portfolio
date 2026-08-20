import {
  FiZap, FiCpu, FiSmartphone, FiTarget, FiPenTool,
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

// 4 equal 45deg wedges swept down the right semicircle (0deg = 12 o'clock,
// sweeping clockwise to 180deg = 6 o'clock). badgeX/badgeY are the wedge's
// midpoint on the ring, as % position within the circle.
const WHEEL_SEGMENTS = [
  { badgeX: 64.5, badgeY: 14.9, bg: 'var(--navy-800)', fg: 'var(--white)' },
  { badgeX: 85.1, badgeY: 35.5, bg: 'var(--blue-600)', fg: 'var(--white)' },
  { badgeX: 85.1, badgeY: 64.5, bg: 'var(--blue-400)', fg: 'var(--white)' },
  { badgeX: 64.5, badgeY: 85.1, bg: 'var(--sky-300)', fg: 'var(--navy-800)' },
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

        {/* ---------- Session 2: segmented wheel — photo, ring, radiating labels ---------- */}
        <div className="about__diagram reveal reveal-delay-1">
          <span className="eyebrow about__diagram-eyebrow">How I Think</span>
          <h3 className="about__diagram-title">{about.philosophy.title}</h3>

          <div className="about__wheel">
            <div className="about__wheel-photo">
              <img src={smilingImg} alt={profile.name} />
            </div>

            <div className="about__wheel-circle">
              <div className="about__wheel-ring" aria-hidden="true" />
              <div className="about__wheel-hub">
                <span>How I</span>
                <span>Think</span>
              </div>
              {WHEEL_SEGMENTS.map((seg, i) => (
                <span
                  className="about__wheel-badge"
                  key={i}
                  style={{ left: `${seg.badgeX}%`, top: `${seg.badgeY}%`, background: seg.bg, color: seg.fg }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>

            <div className="about__wheel-arrows">
              {about.philosophy.points.map((pt, i) => (
                <div
                  className="about__wheel-arrow"
                  key={pt.heading}
                  style={{ top: `${WHEEL_SEGMENTS[i].badgeY}%`, background: WHEEL_SEGMENTS[i].bg, color: WHEEL_SEGMENTS[i].fg }}
                >
                  <h4>{pt.heading}</h4>
                  <p>{pt.short}</p>
                </div>
              ))}
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
