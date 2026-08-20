import { useState } from 'react'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { projects, profile } from '../data'
import useReveal from '../hooks/useReveal'
import ProjectModal from './ProjectModal'
import './Projects.css'

export default function Projects() {
  const ref = useReveal()
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="section-inner">
        <span className="eyebrow reveal">Recent Work</span>
        <h2 className="section-title reveal">
          Projects that <span className="gradient-text">solve real problems</span>
        </h2>
        <p className="section-subtitle reveal">
          A snapshot of what I've shipped — from production automation at work to
          independent explorations in AI, embedded systems, and full-stack apps.
          Click any card for the full story, or head straight to GitHub.
        </p>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project-card reveal reveal-delay-${(i % 4) + 1}`}
              onClick={() => setActive(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(project)
              }}
            >
              <div className="project-card__glow" aria-hidden="true" />
              <div className="project-card__top">
                <span className="project-card__year">{project.year}</span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__github"
                  aria-label={`Open ${project.title} on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={18} />
                </a>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__subtitle">{project.subtitle}</p>
              <p className="project-card__summary">{project.summary}</p>

              <div className="project-card__tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="project-card__tag">{tag}</span>
                ))}
                {project.tags.length > 3 && (
                  <span className="project-card__tag project-card__tag--more">+{project.tags.length - 3}</span>
                )}
              </div>

              <span className="project-card__cta">
                View details <FiArrowUpRight />
              </span>
            </article>
          ))}
        </div>

        <div className="projects__more reveal">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <FiGithub /> See more on GitHub
          </a>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
