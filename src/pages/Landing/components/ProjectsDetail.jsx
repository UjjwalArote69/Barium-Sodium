import { ELEMENTS } from '../../../data/elements'
import { PROJECTS, PROJECT_ORDER } from '../../../data/projects'
import ProjectRow from './ProjectRow'
import './ProjectRow.css'

export default function ProjectsDetail() {
  const total = PROJECT_ORDER.length

  const rows = PROJECT_ORDER
    .map((sym) => {
      const el = ELEMENTS.find((e) => e[1] === sym)
      if (!el) return null
      const [num, , name, cat] = el
      return { sym, num, name, cat, project: PROJECTS[sym] }
    })
    .filter(Boolean)

  return (
    <section className="projects-detail">
      <div className="section-head">
        <h2>Our products.</h2>
        <div className="head-meta">{total} made<br />scroll to read</div>
      </div>
      <div className="proj-list">
        {rows.map((row, i) => (
          <ProjectRow key={row.sym} index={i} total={total} {...row} />
        ))}
      </div>
    </section>
  )
}
