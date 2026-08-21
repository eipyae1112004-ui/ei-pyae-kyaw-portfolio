import { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import { FiGithub, FiFilm } from 'react-icons/fi'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  const hasMedia = project.media && project.media.length > 0

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal__close" onClick={onClose} aria-label="Close project details">
          <HiX size={22} />
        </button>

        <span className="project-modal__year">{project.year}</span>
        <h3 id="project-modal-title" className="project-modal__title">{project.title}</h3>
        <p className="project-modal__subtitle">{project.subtitle}</p>

        <div className="project-modal__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-modal__tag">{tag}</span>
          ))}
        </div>

        <div className="project-modal__section">
          <h4>Overview</h4>
          <p className="project-modal__desc">{project.description}</p>
        </div>

        <div className="project-modal__section">
          <h4>Demo</h4>
          {hasMedia ? (
            <div className="project-modal__media-strip">
              {project.media.map((m, i) => (
                <div className="project-modal__media-item" key={i}>
                  {m.type === 'video' ? (
                    <video src={m.src} poster={m.poster} controls />
                  ) : (
                    <img src={m.src} alt={m.alt || `${project.title} slide ${i + 1}`} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="project-modal__media-placeholder">
              <FiFilm size={22} />
              <span>Demo video / presentation slides coming soon.</span>
            </div>
          )}
        </div>

        <div className="project-modal__actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary">
            <FiGithub /> View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
