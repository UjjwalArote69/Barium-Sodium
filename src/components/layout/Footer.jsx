import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
  { label: 'Twitter', href: 'https://twitter.com/', external: true },
  { label: 'Press', href: '#', external: true },
  { label: 'Contact', to: '/contact', external: false },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="brand-line">
        © {year} — <span className="ba">Ba</span><span className="na">Na</span>
      </div>
      <div className="links">
        {LINKS.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          )
        )}
      </div>
    </footer>
  )
}
