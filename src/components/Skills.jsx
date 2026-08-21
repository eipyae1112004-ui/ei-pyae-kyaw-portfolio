import { useEffect, useState } from 'react'
import {
  FiCode, FiCpu, FiTool, FiLayout,
} from 'react-icons/fi'
import {
  SiDocker, SiLinux, SiGithub, SiFirebase, SiArduino, SiFigma,
  SiGit, SiMysql, SiPostgresql, SiMongodb, SiSketch,
} from 'react-icons/si'
import { TbBrandAws, TbBrandAzure, TbBrandAdobeXd, TbBrandAdobePhotoshop } from 'react-icons/tb'
import { coreSkills, technicalSkills, designTools } from '../data'
import useReveal from '../hooks/useReveal'
import './Skills.css'

const toolIcons = {
  Docker: <SiDocker />,
  Linux: <SiLinux />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  AWS: <TbBrandAws />,
  Azure: <TbBrandAzure />,
  Firebase: <SiFirebase />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  MongoDB: <SiMongodb />,
  'Arduino / ESP32': <SiArduino />,
}

const designIcons = {
  Figma: <SiFigma />,
  'Adobe XD': <TbBrandAdobeXd />,
  Photoshop: <TbBrandAdobePhotoshop />,
  Sketch: <SiSketch />,
}

function CoreSkillBar({ name, level, delay }) {
  const [width, setWidth] = useState(0)
  const ref = useReveal()

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setWidth(level), delay)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level, delay, ref])

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__label">
        <span>{name}</span>
        <span className="skill-bar__value">{width}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="section-inner">
        <span className="eyebrow reveal">What I Bring</span>
        <h2 className="section-title reveal">
          Skills &amp; <span className="gradient-text">Toolbox</span>
        </h2>
        <p className="section-subtitle reveal" style={{fontFamily: "var(--font-heading)", fontWeight: "500"}}>
          A blend of engineering fundamentals, hands-on tooling, and design sensibility —
          gathered from real internships, competitions, and self-driven projects.
        </p>

        <div className="skills__grid">
          <div className="skills__panel reveal reveal-delay-1">
            <div className="skills__panel-head">
              <FiCpu size={22} />
              <h3>Core Skills</h3>
            </div>
            <div className="skills__core-list">
              {coreSkills.map((s, i) => (
                <CoreSkillBar key={s.name} name={s.name} level={s.level} delay={i * 120} />
              ))}
            </div>
          </div>

          <div className="skills__panel reveal reveal-delay-2">
            <div className="skills__panel-head">
              <FiCode size={22} />
              <h3>Technical Skills</h3>
            </div>
            <p className="skills__panel-sub">Proficient languages &amp; frameworks</p>
            <div className="skills__chip-row">
              {technicalSkills.proficient.map((s) => (
                <span className="skills__chip skills__chip--primary" key={s}>{s}</span>
              ))}
            </div>
            <p className="skills__panel-sub skills__panel-sub--spaced">Design tools</p>
            <div className="skills__design-list">
              {designTools.map((d) => (
                <div className="skills__design-item" key={d}>
                  <span className="skills__design-icon">
                    {designIcons[d] || <FiLayout />}
                  </span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div className="skills__panel reveal reveal-delay-3">
            <div className="skills__panel-head">
              <FiTool size={22} />
              <h3>Tools &amp; Platforms</h3>
            </div>
            <div className="skills__chip-row">
              {technicalSkills.tools.map((s) => (
                <span className="skills__chip" key={s}>
                  {toolIcons[s] && <span className="skills__chip-icon">{toolIcons[s]}</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
