import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ELEMENTS } from '../../data/elements'
import { PROJECTS, PROJECT_ORDER } from '../../data/projects'
import { CATEGORY_VAR } from '../../data/categories'
import { LOGOS } from '../../data/logos'
import './products.css'

const COUNT_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',
  'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
  'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
]
const wordFor = (n) => COUNT_WORDS[n] || String(n)

// Status buckets — collapse the long-form statuses into 3 maturity groups
// that someone evaluating products actually cares about.
const STATUS_BUCKETS = [
  { key: 'all',      label: 'All',      match: () => true },
  { key: 'shipping', label: 'Shipping', match: (s) => /^(live|in production)$/i.test(s) },
  { key: 'beta',     label: 'Beta',     match: (s) => /(beta|early access)/i.test(s) },
  { key: 'pilot',    label: 'Pilot',    match: (s) => /^pilot$/i.test(s) },
]

const SORT_MODES = [
  { key: 'order',  label: 'Order' },
  { key: 'latest', label: 'Latest' },
  { key: 'az',     label: 'A — Z' },
]

export default function ProductsPage() {
  const gridRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('order')
  const [pulseSym, setPulseSym] = useState(null)

  // Build the full row set once.
  const all = useMemo(() => (
    PROJECT_ORDER.map((sym, i) => {
      const el = ELEMENTS.find((e) => e[1] === sym)
      if (!el) return null
      const [num, , name, cat] = el
      return {
        sym,
        num,
        elementName: name,
        cat,
        project: PROJECTS[sym],
        order: i,
      }
    }).filter(Boolean)
  ), [])

  const total = all.length
  const totalStr = String(total).padStart(2, '0')

  // Counts per bucket (drives the pill chip badges).
  const counts = useMemo(() => (
    Object.fromEntries(
      STATUS_BUCKETS.map((b) => [b.key, all.filter((r) => b.match(r.project.status)).length])
    )
  ), [all])

  // Filter + sort.
  const rows = useMemo(() => {
    const bucket = STATUS_BUCKETS.find((b) => b.key === filter) || STATUS_BUCKETS[0]
    const filtered = all.filter((r) => bucket.match(r.project.status))
    const sorted = [...filtered]
    if (sort === 'latest') {
      sorted.sort((a, b) => Number(b.project.year) - Number(a.project.year) || a.order - b.order)
    } else if (sort === 'az') {
      sorted.sort((a, b) => a.project.name.localeCompare(b.project.name))
    } else {
      sorted.sort((a, b) => a.order - b.order)
    }
    return sorted
  }, [all, filter, sort])

  // Initial card reveal — only run once, then we hand off to CSS for filter
  // transitions (cheaper than re-animating the grid every state change).
  useEffect(() => {
    const root = gridRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = root.querySelectorAll('.product-card')
    gsap.set(cards, { y: 28, opacity: 0 })
    const obs = new IntersectionObserver(
      (entries, o) => {
        if (entries[0].isIntersecting) {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
          })
          o.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(root)
    return () => obs.disconnect()
  }, [])

  // Click the periodic strip → smooth-scroll to the matching card and
  // briefly pulse its glow so the user sees what they jumped to.
  const handleStripClick = (sym) => {
    const node = document.getElementById(`pc-${sym}`)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setPulseSym(sym)
    setTimeout(() => setPulseSym((cur) => (cur === sym ? null : cur)), 1400)
  }

  return (
    <main className="products-page">
      {/* ========== HERO ========== */}
      <header className="ph-hero">
        <div className="ph-eyebrow">
          <span className="line"></span>
          <span>The Lineup</span>
          <span className="dot-sep">·</span>
          <span>{totalStr} / {totalStr}</span>
        </div>

        <h1 className="ph-title">
          {wordFor(total)} products,<br />
          <em>one company.</em>
        </h1>

        <p className="ph-sub">
          Every product we ship lives at a real address on the periodic table — the
          symbol matches the product's initials. Pick one to read what it does, who
          it's for, and how far along it is.
        </p>

        <div className="ph-meta">
          <span><strong>{totalStr}</strong> products</span>
          <span>—</span>
          <span><strong>{new Set(all.map((r) => r.project.category.split(/\s\/\s|\s/)[0])).size}</strong> domains</span>
          <span>—</span>
          <span>Updated <strong>2026</strong></span>
        </div>

        {/* Mini periodic strip — every product as a tiny tile, click to jump */}
        <div className="ph-strip" role="navigation" aria-label="Jump to a product">
          {all.map((r) => {
            const accentVar = CATEGORY_VAR[r.cat] || '--c-unknown'
            return (
              <button
                key={r.sym}
                type="button"
                className="ph-strip-tile"
                style={{ '--accent': `var(${accentVar})` }}
                onClick={() => handleStripClick(r.sym)}
                aria-label={`Jump to ${r.project.name}`}
                title={r.project.name}
              >
                <span className="num">{r.num}</span>
                <span className="sym">{r.project.sym || r.sym}</span>
              </button>
            )
          })}
        </div>
      </header>

      {/* ========== TOOLBAR ========== */}
      <div className="ph-toolbar">
        <div className="ph-segment" role="tablist" aria-label="Filter by status">
          {STATUS_BUCKETS.map((b) => (
            <button
              key={b.key}
              type="button"
              role="tab"
              aria-selected={filter === b.key}
              className={`ph-pill${filter === b.key ? ' is-active' : ''}`}
              onClick={() => setFilter(b.key)}
            >
              {b.label}
              <span className="pill-count">{counts[b.key]}</span>
            </button>
          ))}
        </div>

        <div className="ph-segment" role="tablist" aria-label="Sort">
          <span className="ph-segment-label">Sort</span>
          {SORT_MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              role="tab"
              aria-selected={sort === m.key}
              className={`ph-pill${sort === m.key ? ' is-active' : ''}`}
              onClick={() => setSort(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ph-result">
        Showing <strong>{rows.length}</strong> of <strong>{total}</strong>
        {filter !== 'all' && (
          <button type="button" className="ph-clear" onClick={() => setFilter('all')}>
            Clear filter <span className="x">×</span>
          </button>
        )}
      </div>

      {/* ========== GRID / EMPTY ========== */}
      {rows.length === 0 ? (
        <div className="ph-empty">
          <div className="ph-empty-tile">
            <span className="num">∅</span>
            <span className="sym">No</span>
          </div>
          <h2>Nothing matches.</h2>
          <p>Try a different filter — or see the full lineup.</p>
          <button type="button" className="ph-empty-btn" onClick={() => setFilter('all')}>
            Show all <span className="arrow">→</span>
          </button>
        </div>
      ) : (
        <div className="products-grid" ref={gridRef}>
          {rows.map(({ sym, num, elementName, cat, project, order }) => {
            const accentVar = CATEGORY_VAR[cat] || '--c-unknown'
            const url = project.slug + '.bana.work'
            const logoSvg = LOGOS[sym] || ''
            const idxStr = String(order + 1).padStart(2, '0')
            return (
              <Link
                key={sym}
                id={`pc-${sym}`}
                to={`/products/${project.slug}`}
                className={`product-card${pulseSym === sym ? ' is-pulse' : ''}`}
                style={{ '--accent': `var(${accentVar})` }}
              >
                {/* Mini browser chrome — favicon + URL bar, accent-tinted */}
                <div className="pc-chrome" aria-hidden="true">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <div className="pc-url">
                    <span
                      className="favicon"
                      dangerouslySetInnerHTML={{ __html: logoSvg }}
                    />
                    <span className="url-text">{url}</span>
                  </div>
                </div>

                <div className="pc-top">
                  <span className="pc-num">{num}</span>
                  <span>{idxStr} / {totalStr}</span>
                </div>
                <div className="pc-symbol">{project.sym || sym}</div>
                <div className="pc-elname">{elementName}</div>
                <div className="pc-divider"></div>
                <div className="pc-name">{project.name}</div>
                <div className="pc-cat">{project.category}</div>
                <p className="pc-tag">{project.tagline}</p>
                <div className="pc-foot">
                  <span className="pc-status">
                    <span className="pulse"></span>
                    {project.status}
                  </span>
                  <span className="pc-cta">
                    Read <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
