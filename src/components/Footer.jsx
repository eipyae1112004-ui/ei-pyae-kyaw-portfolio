import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name} ({profile.nickname}). Built with React,
          curiosity, and a lot of coffee.
        </p>
        <div className="footer__socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a>
        </div>
      </div>
    </footer>
  )
}
