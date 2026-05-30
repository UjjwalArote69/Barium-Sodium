import { forwardRef } from 'react'

const PeriodicCell = forwardRef(function PeriodicCell(
  { num, sym, name, accentVar, row, col, project, brand, delaySeconds, isHovered, onClick, onMouseEnter, onMouseLeave },
  ref
) {
  const className = [
    'cell',
    project && 'project',
    brand && 'brand',
    isHovered && 'is-hovered',
  ].filter(Boolean).join(' ')

  const style = {
    gridRow: row,
    gridColumn: col,
    '--accent': `var(${accentVar})`,
  }
  if (project) style['--delay'] = `${delaySeconds}s`

  const interactive = Boolean(project || brand)
  const displayName = project ? project.name : name
  const displaySym = project?.sym || sym

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onClick={interactive ? onClick : undefined}
      onMouseEnter={interactive ? onMouseEnter : undefined}
      onMouseLeave={interactive ? onMouseLeave : undefined}
    >
      <div className="num">{num}</div>
      <div className="sym">{displaySym}</div>
      <div className="name">{displayName}</div>
    </div>
  )
})

export default PeriodicCell
