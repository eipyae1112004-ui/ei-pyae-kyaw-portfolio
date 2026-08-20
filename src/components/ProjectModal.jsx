import { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <HiX size={22} />
        </button>

        <span className="modal-year">{project.year}</span>
        <h3 id="modal-title" className="modal-title">{project.title}</h3>
        <p className="modal-subtitle">{project.subtitle}</p>

        <div className="modal-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="modal-tag">{tag}</span>
          ))}
        </div>

        <p className="modal-description">{project.description}</p>

        <div className="modal-actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary">
            <FiGithub /> View on GitHub
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            More Details <FiExternalLink />
          </a>
        </div>
      </div>
    </div>
  )
}
