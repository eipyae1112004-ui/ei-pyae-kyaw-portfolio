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

        {/* ---------- Session 2: philosophy pathway ---------- */}
        <div className="about__diagram reveal reveal-delay-1">
          <span className="eyebrow about__diagram-eyebrow">How I Think</span>
          <h3 className="about__diagram-title">{about.philosophy.title}</h3>

          <div className="about__diagram-stage">
            <svg className="about__diagram-lines" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="
                  M62,0 L62,10 Q62,16 56,16 L50,16
                  M50,16 L50,18 Q50,24 56,24 L76,24
                  M50,24 L50,52 Q50,58 44,58 L22,58
                  M50,52 Q50,58 56,58 L78,58
                  M50,58 L50,114
                  M50,114 Q50,120 44,120 L22,120
                  M50,120 L50,130 Q50,136 56,136 L60,136
                "
                fill="none"
                stroke="var(--blue-400)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="76" cy="24" r="1.6" fill="var(--blue-500)" />
              <circle cx="22" cy="58" r="1.6" fill="var(--blue-500)" />
              <circle cx="78" cy="58" r="1.6" fill="var(--blue-500)" />
              <circle cx="22" cy="120" r="1.6" fill="var(--blue-500)" />
            </svg>

            <div className="about__diagram-item about__diagram-item--1">
              <span className="about__diagram-index">01</span>
              <h4>{about.philosophy.points[0].heading}</h4>
              <p>{about.philosophy.points[0].text}</p>
            </div>

            <div className="about__diagram-item about__diagram-item--2">
              <span className="about__diagram-index">02</span>
              <h4>{about.philosophy.points[1].heading}</h4>
              <p>{about.philosophy.points[1].text}</p>
            </div>

            <div className="about__diagram-item about__diagram-item--3">
              <span className="about__diagram-index">03</span>
              <h4>{about.philosophy.points[2].heading}</h4>
              <p>{about.philosophy.points[2].text}</p>
            </div>

            <div className="about__diagram-item about__diagram-item--4">
              <span className="about__diagram-index">04</span>
              <h4>{about.philosophy.points[3].heading}</h4>
              <p>{about.philosophy.points[3].text}</p>
            </div>

            <div className="about__diagram-center">
              <div className="about__diagram-center-photo">
                <img src={laptopImg} alt={`${profile.name} working`} />
              </div>
              <span className="about__diagram-center-label">That's me, still building</span>
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
