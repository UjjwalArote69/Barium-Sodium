import { Link } from 'react-router-dom'
import { PROJECTS, PROJECT_ORDER } from '../../data/projects'
import './about.css'

const PRINCIPLES = [
  {
    accent: '--c-alkaline',
    tag: 'Heavy work',
    title: 'Ship the boring parts.',
    body: "Most teams have an HR system, a CRM, a procurement workflow. They don't need another novelty. They need the unglamorous things to actually work — quickly, every day, for the people doing the job.",
  },
  {
    accent: '--c-alkali',
    tag: 'One stack',
    title: 'Opinionated, not modular.',
    body: "We don't ship configurable frameworks. Every product makes choices — about who it's for, what it does, what it refuses to do. If a workflow needs four toggles to work, we got it wrong.",
  },
  {
    accent: '--c-transition',
    tag: 'Long arc',
    title: 'Built to keep, not to flip.',
    body: 'Each product is a long-running line, not a campaign. We expect to be maintaining and extending these systems years from now — so we write them in languages we like, on stacks we can still read in 2030.',
  },
  {
    accent: '--c-post',
    tag: 'Honest stuff',
    title: 'AI is a primitive, not a sticker.',
    body: 'When AI shows up in a product, it does work — drafts a tender response, finds a vendor, generates a layout. We don\'t bolt a chat panel onto a sidebar and call it a feature.',
  },
]

export default function AboutPage() {
  const total = PROJECT_ORDER.length
  const totalStr = String(total).padStart(2, '0')
  const categoryCount = new Set(PROJECT_ORDER.map((s) => PROJECTS[s].category)).size

  const stats = [
    { num: totalStr, label: 'Products in the lineup', accent: '--c-alkaline' },
    { num: String(categoryCount).padStart(2, '0'), label: 'Domains, from supply chain to healthtech', accent: '--c-transition' },
    { num: '01', label: 'company, no agency, no whitelabel', accent: '--c-noble' },
  ]

  return (
    <main className="about-page">
      {/* ========== HERO ========== */}
      <header className="ab-hero">
        <div className="ab-eyebrow">
          <span className="line"></span>
          <span>About the company</span>
        </div>

        <h1 className="ab-title">
          Two elements.<br />
          <em>One company.</em>
        </h1>

        <p className="ab-lede">
          <strong>bariumSodium</strong> is a  company that builds long-running
          products for unglamorous problems — supply chains, HR, EPC project comms,
          maritime ops. The name spells <span className="ba">Ba</span><span className="na">Na</span>{' '}
          on the periodic table. Every product we ship lives at a real address there.
        </p>

        <div className="ab-meta">
          <span><strong>{totalStr}</strong> products</span>
          <span>—</span>
          <span><strong>{categoryCount}</strong> domains</span>
          <span>—</span>
          <span>Based <strong>remote-first</strong></span>
          <span>—</span>
          <span>Independent <strong>·</strong> not for sale</span>
        </div>
      </header>

      {/* ========== BRAND TILES ========== */}
      <section className="ab-brand">
        <div className="ab-tile-pair">
          <div
            className="ab-tile"
            style={{ '--accent': 'var(--c-alkaline)' }}
            aria-label="barium tile"
          >
            <div className="ab-tile-num">56</div>
            <div className="ab-tile-sym">Ba</div>
            <div className="ab-tile-name">barium</div>
          </div>
          <div
            className="ab-tile"
            style={{ '--accent': 'var(--c-alkali)' }}
            aria-label="Sodium tile"
          >
            <div className="ab-tile-num">11</div>
            <div className="ab-tile-sym">Na</div>
            <div className="ab-tile-name">Sodium</div>
          </div>
        </div>

        <div className="ab-brand-copy">
          <h2>Why the name.</h2>
          <p>
            <span className="ba">Ba</span> is barium. Atomic number 56. The Greek
            root <em>barys</em> means heavy. <span className="na">Na</span> is
            sodium — atomic number 11, from the Latin <em>natrium</em>, which is
            also why the symbol isn't &quot;So.&quot;
          </p>
          <p>
            Put them together and you get <strong>BaNa</strong> — two real entries
            in the periodic table that happen to spell our name. We liked that
            the name was already there, waiting in a system someone else built.
            That felt about right for what we do.
          </p>
          <p>
            Our products get their own symbols — <strong>Sf</strong>,{' '}
            <strong>Tq</strong>, <strong>Mm</strong>, <strong>Kq</strong>,{' '}
            <strong>So</strong>, <strong>Go</strong>, <strong>Tw</strong>,{' '}
            <strong>Ph</strong>, <strong>Ss</strong>, <strong>Mh</strong> —
            two-letter marks drawn from each product's name, sitting alongside the
            real elements on the homepage table without pretending to be them.
          </p>
        </div>
      </section>

      {/* ========== PRINCIPLES ========== */}
      <section className="ab-section">
        <div className="ab-section-head">
          <h2>How we work.</h2>
          <div className="ab-section-meta">
            Four rules<br />we keep coming back to
          </div>
        </div>

        <div className="ab-principles">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.title}
              className="ab-principle"
              style={{ '--accent': `var(${p.accent})` }}
            >
              <div className="ab-principle-tag">
                <span className="swatch"></span>
                <span>{String(i + 1).padStart(2, '0')} · {p.tag}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ========== NUMBERS ========== */}
      <section className="ab-section">
        <div className="ab-section-head">
          <h2>By the numbers.</h2>
          <div className="ab-section-meta">
            Snapshot<br />today
          </div>
        </div>

        <div className="ab-numbers">
          {stats.map((s) => (
            <div
              key={s.label}
              className="ab-stat"
              style={{ '--accent': `var(${s.accent})` }}
            >
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="ab-cta">
        <h2>Want to <em>build</em> something with us?</h2>
        <p>
          We take on a small number of partner projects each year — usually in
          the domains we already ship in. If that sounds like you, drop us a line.
        </p>
        <div className="ab-cta-actions">
          <Link to="/contact" className="btn primary">
            Talk to the team <span className="arrow">→</span>
          </Link>
          <Link to="/products" className="btn ghost">
            See the lineup
          </Link>
        </div>
      </section>
    </main>
  )
}
