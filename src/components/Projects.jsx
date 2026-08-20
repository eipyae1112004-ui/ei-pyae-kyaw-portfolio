import { useState } from 'react'
import { FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { projects, profile } from '../data'
import useReveal from '../hooks/useReveal'
import './Projects.css'

export default function Projects() {
  const ref = useReveal()
  const [index, setIndex] = useState(0)
  const total = projects.length
  const active = projects[index]

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

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
          Browse the stack, or use the arrows to step through.
        </p>

        <div className="projects__carousel reveal reveal-delay-1">
          <div className="projects__detail" key={active.id}>
            <span className="projects__detail-year">{active.year}</span>
            <h3 className="projects__detail-title">{active.title}</h3>
            <p className="projects__detail-subtitle">{active.subtitle}</p>

            <div className="projects__detail-tags">
              {active.tags.map((tag) => (
                <span key={tag} className="projects__detail-tag">{tag}</span>
              ))}
            </div>

            <p className="projects__detail-desc">{active.description}</p>

            <div className="projects__detail-actions">
              <a href={active.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FiGithub /> View on GitHub
              </a>

              <div className="projects__controls">
                <button type="button" onClick={prev} aria-label="Previous project" className="projects__nav-btn">
                  <FiChevronLeft size={18} />
                </button>
                <span className="projects__counter">{index + 1} / {total}</span>
                <button type="button" onClick={next} aria-label="Next project" className="projects__nav-btn">
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="projects__stack">
            {projects.map((project, i) => {
              const depth = (i - index + total) % total
              if (depth > 3) return null
              return (
                <button
                  type="button"
                  key={project.id}
                  className={`projects__card projects__card--depth-${depth}`}
                  style={{ '--depth': depth, zIndex: total - depth }}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${project.title}`}
                  aria-current={depth === 0}
                >
                  <span className="projects__card-year">{project.year}</span>
                  <h4>{project.title}</h4>
                  <p>{project.summary}</p>
                  <div className="projects__card-tags">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="projects__more reveal">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <FiGithub /> See more on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
