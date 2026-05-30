import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CATEGORY_VAR } from '../../../data/categories'
import { LOGOS } from '../../../data/logos'
import { useCard } from '../CardContext'
import { computeCardPosition } from '../computeCardPosition'
import ProjectPreview from './ProjectPreview'

const REVEAL_SELECTOR =
  '.proj-meta-top, .proj-symbol-large, .proj-title, .proj-category, .proj-desc, .proj-actions, .proj-preview'

export default function ProjectRow({ index, total, sym, num, name, cat, project }) {
  const rowRef = useRef(null)
  const symbolRef = useRef(null)
  const { open } = useCard()
  const flip = index % 2 === 1
  const idx = String(index + 1).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')
  const accentVar = CATEGORY_VAR[cat]

  // Scroll-triggered reveal: each row's pieces fade up + stagger when the row
  // enters the viewport. Skipped when the user prefers reduced motion.
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = el.querySelectorAll(REVEAL_SELECTOR)
    gsap.set(targets, { y: 36, opacity: 0 })

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: 'power3.out',
          })
          obs.unobserve(el)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  // Click the giant element symbol → same card as clicking the periodic-table tile.
  const handleSymbolClick = () => {
    const el = symbolRef.current
    if (!el) return
    open({
      sym, num, name,
      displaySym: project.sym || sym,
      accentVar,
      isBrand: false,
      title: project.name,
      desc: project.desc,
      category: project.category,
      live: project.live,
      logoHtml: LOGOS[sym] || null,
      logoText: null,
      position: computeCardPosition(el.getBoundingClientRect(), false),
    })
  }
  const handleSymbolKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSymbolClick()
    }
  }

  return (
    <article
      ref={rowRef}
      className={`proj-row${flip ? ' flip' : ''}`}
      style={{ '--accent': `var(${accentVar})` }}
    >
      <div className="proj-info">
        <div className="proj-meta-top">
          <span>{idx} / {totalStr}</span>
          <span className="proj-divider"></span>
          <span className="el-tag">{project.sym || sym}</span>
          <span>{num} · {name}</span>
        </div>
        <div
          ref={symbolRef}
          className="proj-symbol-large proj-symbol-clickable"
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.name} info card`}
          onClick={handleSymbolClick}
          onKeyDown={handleSymbolKeyDown}
        >
          {project.sym || sym}
        </div>
        <h3 className="proj-title">{project.name}</h3>
        <div className="proj-category">{project.category}</div>
        <p className="proj-desc">{project.desc}</p>
        <div className="proj-actions">
          <a href={project.live} className="btn primary">
            Visit {project.name} <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <ProjectPreview sym={sym} project={project} cat={cat} name={name} />
    </article>
  )
}
