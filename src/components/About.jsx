import { about, profile } from '../data'
import smilingImg from '../assets/kath-smiling.jpg'
import laptopImg from '../assets/kath-laptop.jpg'
import useReveal from '../hooks/useReveal'
import IDBadge from './IDBadge'
import './About.css'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="section-inner">
        <div className="about__top">
          <div className="about__badge-col reveal">
            <IDBadge photo={smilingImg} name={profile.nickname} role="Software Developer" />
            <div className="about__bubble">
              <span className="about__bubble-tail" aria-hidden="true" />
              <p>{about.bio}</p>
            </div>
          </div>

          <div className="about__meta-col reveal reveal-delay-1">
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

          <div className="about__thread-col reveal reveal-delay-2">
            <span className="about__thread-line" aria-hidden="true" />

            <p className="about__thread-title">Beyond the screen.</p>
            <p className="about__thread-title about__thread-title--sub">Outside of coding —</p>
            <p className="about__thread-text">{about.lifestyle.text}</p>

            <div className="about__diagram">
              <span className="eyebrow about__diagram-eyebrow">How I Think</span>
              <h3 className="about__diagram-title">{about.philosophy.title}</h3>

              <div className="about__diagram-stage">
                {about.philosophy.points.map((pt, i) => (
                  <div className="about__diagram-item" key={pt.heading}>
                    <svg className="about__diagram-connector" viewBox="0 0 26 16" preserveAspectRatio="none" aria-hidden="true">
                      <circle cx="1" cy="8" r="2.2" fill="var(--blue-500)" />
                      <path d="M1,8 L4,8 Q4,2 10,2 L16,2 Q22,2 22,8 L26,8" fill="none" stroke="var(--blue-400)" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="about__diagram-index">{String(i + 1).padStart(2, '0')}</span>
                    <h4>{pt.heading}</h4>
                    <p>{pt.text}</p>
                  </div>
                ))}

                <div className="about__diagram-center">
                  <svg className="about__diagram-connector about__diagram-connector--center" viewBox="0 0 34 16" preserveAspectRatio="none" aria-hidden="true">
                    <circle cx="1" cy="8" r="2.2" fill="var(--blue-500)" />
                    <path d="M1,8 L6,8 Q6,2 12,2 L22,2 Q30,2 30,8 L34,8" fill="none" stroke="var(--blue-400)" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <div className="about__diagram-center-photo">
                    <img src={laptopImg} alt={`${profile.name} working`} />
                  </div>
                  <span className="about__diagram-center-label">That's me, still building</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
