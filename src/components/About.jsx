import { about, profile } from '../data'
import profileImg from '../assets/profile.png'
import useReveal from '../hooks/useReveal'
import './About.css'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="section-inner about__grid">
        <div className="about__gallery reveal">
          <div className="about__photo about__photo--oval">
            <img src={profileImg} alt={`${profile.name} smiling`} />
          </div>
          <div className="about__photo about__photo--square">
            <img src={profileImg} alt={`${profile.name} at work`} />
          </div>
          <div className="about__blob" aria-hidden="true" />
          <div className="about__dots" aria-hidden="true" />
          <div className="about__stat-card">
            <strong>5+</strong>
            <span>Independent full-stack, ML &amp; IoT projects</span>
          </div>
        </div>

        <div className="about__content">
          <span className="eyebrow">About Me</span>
          <h2 className="section-title">
            The person behind the <span className="gradient-text">code</span>
          </h2>

          {about.intro.map((p, i) => (
            <p className={`about__paragraph reveal reveal-delay-${Math.min(i + 1, 4)}`} key={i}>
              {p}
            </p>
          ))}

          <div className="about__philosophy reveal reveal-delay-2">
            <h3>{about.philosophy.title}</h3>
            <div className="about__philosophy-grid">
              {about.philosophy.points.map((pt, i) => (
                <div className="about__philosophy-card" key={pt.heading} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className="about__philosophy-index">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{pt.heading}</h4>
                  <p>{pt.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about__lifestyle reveal reveal-delay-3">
            <h3>{about.lifestyle.title}</h3>
            <p>{about.lifestyle.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
