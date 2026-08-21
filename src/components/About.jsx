import { useState } from 'react'
import {
  FiZap, FiSearch, FiTool, FiCheckCircle, FiPlus, FiMinus,
} from 'react-icons/fi'
import { about, profile } from '../data'
import smilingImg from '../assets/Kath_Profile.jpg'
import useReveal from '../hooks/useReveal'
import IDBadge from './IDBadge'
import './About.css'

const PHILOSOPHY_ICONS = [<FiSearch />, <FiZap />, <FiTool />, <FiCheckCircle />]

function cloudEdgePath(bumpsUp) {
  const width = 1440
  const step = 60
  const peakY = bumpsUp ? 0 : 60
  const baseY = 30
  let d = `M0,${bumpsUp ? 60 : 0} L0,${baseY} Q${step / 2},${peakY} ${step},${baseY}`
  for (let x = step * 2; x <= width; x += step) {
    d += ` T${x},${baseY}`
  }
  d += ` L${width},${bumpsUp ? 60 : 0} Z`
  return d
}

const CLOUD_TOP_PATH = cloudEdgePath(true)
const CLOUD_BOTTOM_PATH = cloudEdgePath(false)

export default function About() {
  const ref = useReveal()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="section-inner">
        {/* ---------- Combined session: personal info (left) + How I Think (right) ---------- */}
        <div className="about__combined-header reveal">
          <h2 className="section-title">
            The person behind the <span className="gradient-text">code</span>
          </h2>
        </div>

        <div className="about__intro">
          <div className="about__intro-left reveal reveal-delay-1">
            <IDBadge photo={smilingImg} name={profile.nickname} role="Software Developer" />

            {/* <div className="about__bubble">
              <span className="about__bubble-tail" aria-hidden="true" />
              <p>{about.bio}</p>
            </div> */}

            {/* <div className="about__pill-box">
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
            </div> */}
          </div>

          <div className="about__diagram about__intro-right reveal reveal-delay-2">
            <span className="eyebrow about__diagram-eyebrow">How I Think</span>
            <h3 className="about__diagram-title">{about.philosophy.title}</h3>

            <div className="about__accordion">
              {about.philosophy.points.map((pt, i) => {
                const isOpen = openIndex === i
                return (
                  <div className={`about__accordion-item${isOpen ? ' about__accordion-item--open' : ''}`} key={pt.heading}>
                    <button
                      type="button"
                      className="about__accordion-head"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="about__accordion-badge">{PHILOSOPHY_ICONS[i]}</span>
                      <span className="about__accordion-title">{pt.heading}</span>
                      <span className="about__accordion-toggle">{isOpen ? <FiMinus /> : <FiPlus />}</span>
                    </button>
                    <div className="about__accordion-body">
                      <p>{pt.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ---------- Session 3: beyond the screen — scalloped cloud panel ---------- */}
        {/* <div className="about__cloud reveal reveal-delay-1">
          <svg className="about__cloud-edge about__cloud-edge--top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d={CLOUD_TOP_PATH} fill="var(--blue-400)" />
          </svg>

          <div className="about__cloud-body">
            <div className="about__cloud-icons" aria-hidden="true">
              <span>💻</span>
              <span className="about__cloud-mascot">🐼</span>
              <span>📚</span>
            </div>

            <span className="eyebrow about__cloud-badge">Beyond the Screen</span>
            <p className="about__cloud-intro">{about.lifestyle.intro}</p>

            <div className="about__cloud-divider" aria-hidden="true">
              <span>✦</span>
            </div>

            <div className="about__cloud-steps">
              {about.lifestyle.steps.map((step, i) => (
                <div className="about__cloud-step" key={step.title}>
                  <span className="about__cloud-step-label">Step {i + 1}</span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <svg className="about__cloud-edge about__cloud-edge--bottom" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d={CLOUD_BOTTOM_PATH} fill="var(--blue-400)" />
          </svg>
        </div> */}
      </div>
    </section>
  )
}
