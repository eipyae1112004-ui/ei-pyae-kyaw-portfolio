import { useState } from 'react'
import { FiGithub } from 'react-icons/fi'
import { projects, profile } from '../data'
import useReveal from '../hooks/useReveal'
import './Projects.css'

export default function Projects() {
  const ref = useReveal()
  const [index, setIndex] = useState(0)
  const total = projects.length
  const active = projects[index]

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
          Click any card in the stack to bring it forward.
        </p>

        <div className="projects__carousel reveal reveal-delay-1">
          <div className="projects__detail">
            <svg className="projects__detail-blob" viewBox="0 0 240 220" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28,96 C20,58 48,18 100,10 C160,1 214,22 228,66 C240,102 224,132 196,148 C182,156 172,148 158,158 C142,170 130,182 108,176 C88,171 88,156 70,148 C34,132 34,128 28,96 Z"
                fill="url(#projectsBlobGrad)"
              />
              <defs>
                <linearGradient id="projectsBlobGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--sky-100)" />
                  <stop offset="55%" stopColor="var(--sky-300)" />
                  <stop offset="100%" stopColor="var(--blue-400)" />
                </linearGradient>
              </defs>
            </svg>

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
              <span className="projects__counter">{index + 1} / {total}</span>
            </div>
          </div>

          <div className="projects__stack">
            <span className="projects__stack-dot projects__stack-dot--1" aria-hidden="true" />
            <span className="projects__stack-dot projects__stack-dot--2" aria-hidden="true" />
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
