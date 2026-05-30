import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ELEMENTS } from '../../data/elements'
import { PROJECTS, PROJECT_ORDER, PROJECT_BY_SLUG } from '../../data/projects'
import { CATEGORY_VAR } from '../../data/categories'
import ProjectPreview from '../Landing/components/ProjectPreview'
import './products.css'

export default function ProductDetail() {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const sym = PROJECT_BY_SLUG[slug]
  const project = sym ? PROJECTS[sym] : null

  if (!project) {
    return (
      <main className="product-detail">
        <div className="pd-missing">
          <h1>No such product.</h1>
          <p>The product you're looking for isn't in our table.</p>
          <Link to="/products">← Back to all products</Link>
        </div>
      </main>
    )
  }

  const el = ELEMENTS.find((e) => e[1] === sym)
  const [num, , elementName, cat] = el
  const accentVar = CATEGORY_VAR[cat] || '--c-unknown'

  const order = PROJECT_ORDER
  const i = order.indexOf(sym)
  const total = order.length
  const idxStr = String(i + 1).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')

  const prevSym = i > 0 ? order[i - 1] : order[order.length - 1]
  const nextSym = i < order.length - 1 ? order[i + 1] : order[0]
  const prev = PROJECTS[prevSym]
  const next = PROJECTS[nextSym]

  return (
    <main className="product-detail" style={{ '--accent': `var(${accentVar})` }}>
      <div className="pd-crumb">
        <Link to="/products">Products</Link>
        <span className="sep">/</span>
        <span className="here">{project.name}</span>
        <span className="sep" style={{ marginLeft: 'auto' }}>{idxStr} / {totalStr}</span>
      </div>

      <section className="pd-hero">
        <div
          className="pd-tile"
          style={{ '--accent': `var(${accentVar})` }}
        >
          <div className="pd-tile-top">
            <span className="num">{num}</span>
            <span>{cat}</span>
          </div>
          <div className="pd-tile-symbol">{project.sym || sym}</div>
          <div className="pd-tile-bottom">
            <span className="pd-elname">{elementName}</span>
            <span>{project.year}</span>
          </div>
        </div>

        <div className="pd-info">
          <div className="pd-cat">{project.category}</div>
          <h1 className="pd-name">{project.name}</h1>
          <p className="pd-tagline">{project.tagline}</p>
          <p className="pd-long">{project.longDesc}</p>

          <div className="pd-stats">
            <div className="pd-stat">
              <div className="label">Status</div>
              <div className="value"><span className="pulse"></span>{project.status}</div>
            </div>
            <div className="pd-stat">
              <div className="label">Year</div>
              <div className="value">{project.year}</div>
            </div>
            <div className="pd-stat">
              <div className="label">Domain</div>
              <div className="value">{project.category}</div>
            </div>
          </div>

          <div className="pd-stack">
            {project.stack.map((s) => (
              <span key={s} className="pd-chip">{s}</span>
            ))}
          </div>

          <div className="pd-actions">
            <a href={project.live} className="btn primary">
              Visit {project.name} <span className="arrow">→</span>
            </a>
            <Link to="/contact" className="btn ghost">
              Talk to the team
            </Link>
          </div>
        </div>
      </section>

      <section className="pd-preview-wrap" style={{ '--accent': `var(${accentVar})` }}>
        <div className="pd-section-head">
          <span className="tag">Preview</span>
          <span>·</span>
          <span>{project.slug}.bana.work</span>
          <span className="line"></span>
        </div>
        <ProjectPreview sym={sym} project={project} cat={cat} name={project.name} />
      </section>

      <section className="pd-features" style={{ '--accent': `var(${accentVar})` }}>
        <h2>What you get.</h2>
        <div className="pd-feat-grid">
          {project.features.map((f, idx) => (
            <article className="pd-feat" key={f.title}>
              <span className="pd-feat-num">F · {String(idx + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="pd-pager" aria-label="Product navigation">
        <Link
          to={`/products/${prev.slug}`}
          className="prev"
          style={{ '--accent-pager': `var(${CATEGORY_VAR[ELEMENTS.find(e => e[1] === prevSym)[3]]})` }}
        >
          <span className="label"><span className="arrow">←</span> Previous</span>
          <span className="name"><span className="arrow">←</span> {prev.name}</span>
        </Link>
        <Link
          to={`/products/${next.slug}`}
          className="next"
          style={{ '--accent-pager': `var(${CATEGORY_VAR[ELEMENTS.find(e => e[1] === nextSym)[3]]})` }}
        >
          <span className="label">Next <span className="arrow">→</span></span>
          <span className="name">{next.name} <span className="arrow">→</span></span>
        </Link>
      </nav>
    </main>
  )
}
