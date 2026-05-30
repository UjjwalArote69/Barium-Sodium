import { useCallback, useRef } from 'react'
import { ELEMENTS } from '../../../data/elements'
import { PROJECTS } from '../../../data/projects'
import { BRAND } from '../../../data/brand'
import { CATEGORY_VAR } from '../../../data/categories'
import { LOGOS } from '../../../data/logos'
import { useCard } from '../CardContext'
import { computeCardPosition } from '../computeCardPosition'
import PeriodicCell from './PeriodicCell'

export default function PeriodicTable({ children }) {
  const { payload, open } = useCard()
  const cellRefs = useRef({})
  const tableRef = useRef(null)

  // The "active" cell is whichever symbol the open card describes — this
  // drives the .is-hovered class on the cell and .has-hover on the table.
  const activeSym = payload?.sym ?? null

  const handleCellClick = useCallback((sym, num, name, cat) => {
    const project = PROJECTS[sym]
    const brand = BRAND[sym]
    const content = project || brand
    if (!content) return
    const isBrand = !project && Boolean(brand)
    const cellEl = cellRefs.current[sym]
    if (!cellEl) return
    const position = computeCardPosition(cellEl.getBoundingClientRect(), isBrand)
    open({
      sym, num, name,
      displaySym: project?.sym || sym,
      accentVar: CATEGORY_VAR[cat],
      isBrand,
      title: isBrand ? content.label : content.name,
      desc: content.desc,
      category: isBrand ? null : content.category,
      live: isBrand ? null : content.live,
      logoHtml: isBrand ? null : (LOGOS[sym] || null),
      logoText: isBrand ? sym : null,
      position,
    })
  }, [open])

  // Hover sets the Three.js attractor (read by TableField via a custom event).
  const handleCellEnter = (sym) => {
    const cellEl = cellRefs.current[sym]
    if (cellEl) {
      window.dispatchEvent(new CustomEvent('bana:cell-enter', { detail: { cellEl } }))
    }
  }
  const handleCellLeave = () => {
    window.dispatchEvent(new CustomEvent('bana:cell-leave'))
  }

  return (
    <div
      ref={tableRef}
      className={`periodic${activeSym ? ' has-hover' : ''}`}
      id="periodic"
    >
      {children}

      {ELEMENTS.map(([num, sym, name, cat, row, col], i) => {
        const project = PROJECTS[sym]
        const brand = BRAND[sym]
        return (
          <PeriodicCell
            key={sym}
            ref={(el) => { if (el) cellRefs.current[sym] = el; else delete cellRefs.current[sym] }}
            num={num}
            sym={sym}
            name={name}
            accentVar={CATEGORY_VAR[cat]}
            row={row}
            col={col}
            project={project || null}
            brand={brand || null}
            delaySeconds={(i % 8) * 0.4}
            isHovered={activeSym === sym}
            onClick={(e) => { e.stopPropagation(); handleCellClick(sym, num, name, cat) }}
            onMouseEnter={() => handleCellEnter(sym)}
            onMouseLeave={handleCellLeave}
          />
        )
      })}

      <div className="ghost-row-label" style={{ gridRow: 9 }}>Lanthanides</div>
      <div className="ghost-row-label" style={{ gridRow: 10 }}>Actinides</div>
    </div>
  )
}
