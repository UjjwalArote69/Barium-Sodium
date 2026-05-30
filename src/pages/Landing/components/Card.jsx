/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react'
import { useCard } from '../CardContext'

export default function Card() {
  const { payload, close } = useCard()
  const [animateIn, setAnimateIn] = useState(false)
  const cardRef = useRef(null)

  // One-frame delay before adding .show so the CSS opacity/transform transition fires.
  useEffect(() => {
    if (!payload) {
      setAnimateIn(false)
      return
    }
    const id = requestAnimationFrame(() => setAnimateIn(true))
    return () => cancelAnimationFrame(id)
  }, [payload])

  // Dismiss on Escape or click outside the card. Clicks on another tile fall through
  // so its onClick can switch the card to the new payload instead of closing.
  useEffect(() => {
    if (!payload) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onClick = (e) => {
      if (e.target.closest('.cell.project, .cell.brand')) return
      if (cardRef.current && !cardRef.current.contains(e.target)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [payload, close])

  if (!payload) return null

  const {
    sym, displaySym, num, name, accentVar, isBrand,
    title, desc, category, live, logoHtml, logoText,
    position,
  } = payload

  const className = [
    'card',
    isBrand && 'is-brand',
    animateIn && 'show',
  ].filter(Boolean).join(' ')

  const style = {
    '--accent': `var(${accentVar})`,
    left: position?.left,
    top: position?.top,
    width: position?.width,
  }

  return (
    <div ref={cardRef} className={className} id="card" style={style}>
      <button
        className="card-close"
        aria-label="Close"
        type="button"
        onClick={(e) => { e.stopPropagation(); close() }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="head">
        <div className="logo">
          {logoHtml
            ? <span dangerouslySetInnerHTML={{ __html: logoHtml }} />
            : logoText}
        </div>
        <div className="meta">
          <div className="num-sym">
            <span>{displaySym || sym}</span>
            <span className="sep">·</span>
            <span>{num}</span>
          </div>
          <div className="elname">{name}</div>
        </div>
      </div>

      <h3 className="proj">{title}</h3>
      {category && <div className="category">{category}</div>}
      <p className="desc">{desc}</p>

      {live && (
        <div className="actions">
          <a className="btn primary" href={live}>
            <span>{isBrand ? 'Visit' : `Visit ${title}`}</span>{' '}
            <span className="arrow">→</span>
          </a>
        </div>
      )}
    </div>
  )
}
