/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('bana-theme', theme)
  }, [theme])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className={menuOpen ? 'menu-open' : undefined}>
      <div className="logo">
        <div className="mini-tile" style={{ '--accent': 'var(--c-alkaline)' }}>
          <span className="mn-num">56</span>
          <span className="mn-sym">Ba</span>
        </div>
        <div className="mini-tile" style={{ '--accent': 'var(--c-alkali)' }}>
          <span className="mn-num">11</span>
          <span className="mn-sym">Na</span>
        </div>
        <div className="logo-meta">
          <span className="l1">Barium Sodium</span>
          <span className="l2" lang="hi">बना</span>
        </div>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : undefined}>Products</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink></li>
          <li><NavLink to="/careers" className={({ isActive }) => isActive ? 'active' : undefined}>Careers</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined}>Contact</NavLink></li>
        </ul>

        <button
          type="button"
          className="theme-toggle"
          id="theme-toggle"
          aria-label="Toggle color theme"
          title="Toggle theme"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {/* Sun: shown in dark mode (click to go light) */}
          <svg className="icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m4.93 19.07 1.41-1.41" />
            <path d="m17.66 6.34 1.41-1.41" />
          </svg>
          {/* Moon: shown in light mode (click to go dark) */}
          <svg className="icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-burger"
          id="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o) }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
