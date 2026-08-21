import { useRef, useState } from 'react'
import { FiGithub } from 'react-icons/fi'
import { projects, profile } from '../data'
import useReveal from '../hooks/useReveal'
import './Projects.css'

export default function Projects() {
  const ref = useReveal()
  const stripRef = useRef(null)
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false })
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (e) => {
    const strip = stripRef.current
    drag.current = {
      down: true,
      moved: false,
      startX: e.pageX - strip.offsetLeft,
      scrollLeft: strip.scrollLeft,
    }
    setIsDragging(true)
  }

  const onPointerMove = (e) => {
    if (!drag.current.down) return
    const strip = stripRef.current
    const x = e.pageX - strip.offsetLeft
    const walk = x - drag.current.startX
    if (Math.abs(walk) > 4) drag.current.moved = true
    strip.scrollLeft = drag.current.scrollLeft - walk
  }

  const endDrag = () => {
    drag.current.down = false
    setIsDragging(false)
  }

  const onCardClick = (e) => {
    if (drag.current.moved) e.preventDefault()
  }

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="section-inner">
        <span className="eyebrow reveal">Recent Work</span>
        <h2 className="projects__heading reveal">PROJECTS</h2>
        <p className="section-subtitle reveal" style={{fontFamily: "var(--font-heading)", fontWeight: "500"}}>
          Every project here started with something that annoyed me or slowed someone down, and ended
          with a tool that quietly makes everyone's day easier.
        </p>

        <div className="projects__filmstrip-wrap reveal reveal-delay-1">
          <span className="projects__drag-badge">Drag →</span>

          <div
            className={`projects__filmstrip${isDragging ? ' projects__filmstrip--dragging' : ''}`}
            ref={stripRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            {projects.map((project) => (
              <article className="projects__film-card" key={project.id}>
                <span className="projects__film-year">{project.year}</span>
                <h3>{project.title}</h3>
                <p className="projects__film-subtitle">{project.subtitle}</p>

                <div className="projects__film-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <p className="projects__film-desc">{project.summary}</p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  onClick={onCardClick}
                  draggable={false}
                >
                  <FiGithub /> View on GitHub
                </a>
              </article>
            ))}
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
