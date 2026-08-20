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
                <svg className="about__diagram-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M50,2 L50,96" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M50,16 C60,16 60,16 74,16" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M50,49 C40,49 40,49 26,49" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M50,49 C60,49 60,49 74,49" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M50,82 C40,82 40,82 26,82" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M50,82 C60,82 60,82 74,82" fill="none" stroke="var(--blue-400)" strokeWidth="1" strokeLinecap="round" />
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
                  <img src={laptopImg} alt={`${profile.name} working`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
