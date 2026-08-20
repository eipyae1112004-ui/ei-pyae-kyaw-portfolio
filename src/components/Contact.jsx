import { FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { profile } from '../data'
import useReveal from '../hooks/useReveal'
import './Contact.css'

const channels = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'ei-pyae-kyaw',
    href: profile.linkedin,
    icon: <FiLinkedin size={24} />,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: profile.phone,
    href: `https://wa.me/${profile.whatsapp}`,
    icon: <FaWhatsapp size={24} />,
  },
  {
    key: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <FiMail size={24} />,
  },
]

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <svg className="contact__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,55 Q120,85 240,55 T480,55 T720,55 T960,55 T1200,55 T1440,55 L1440,0 L0,0 Z"
          fill="var(--ice-50)"
        />
      </svg>

      <div className="contact__bg" aria-hidden="true">
        <span className="contact__blob contact__blob--1" />
        <span className="contact__blob contact__blob--2" />
      </div>

      <div className="section-inner contact__inner">
        <span className="eyebrow reveal">Get In Touch</span>
        <h2 className="section-title reveal">
          Let's build something <span className="gradient-text">meaningful</span>
        </h2>
        <p className="section-subtitle reveal" style={{ margin: '0 auto 3rem' }}>
          Whether it's a role, a collaboration, or just a good conversation about automation
          and technology — my inbox (and WhatsApp) are open.
        </p>

        <div className="contact__grid">
          {channels.map((c, i) => (
            <a
              key={c.key}
              href={c.href}
              target={c.key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              className={`contact-card reveal reveal-delay-${i + 1}`}
            >
              <span className="contact-card__icon">{c.icon}</span>
              <span className="contact-card__label">{c.label}</span>
              <span className="contact-card__value">{c.value}</span>
            </a>
          ))}
        </div>

        <div className="contact__location reveal">
          <FiMapPin /> Based in {profile.location} — open to opportunities locally &amp; remote
        </div>
      </div>
    </section>
  )
}
