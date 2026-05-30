import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_VAR } from '../data/categories'
import './careers.css'

// Where role applications and general inquiries land. Swap when a real
// inbox is wired up — the form on /contact already targets this address.
const CAREERS_EMAIL = 'careers@bana.work'

// Published Google Sheet (File → Share → Publish to web → CSV).
// HR-facing columns only (header row, exact names): title, type, location, pinned, body
// The element symbol / number / category are allocated client-side from the title.
// Set VITE_ROLES_CSV_URL in .env. Empty/missing falls back to FALLBACK_ROLES below.
const ROLES_CSV_URL = import.meta.env.VITE_ROLES_CSV_URL || ''

// Minimal RFC-4180 CSV parser: handles quoted fields, embedded commas,
// newlines inside quotes, and "" as an escaped quote. Returns array of objects keyed by header row.
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQuotes = false
      else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\r') { /* skip */ }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else field += c
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  if (!rows.length) return []
  const headers = rows[0].map((h) => h.trim())
  return rows.slice(1)
    .filter((r) => r.some((cell) => cell.trim() !== ''))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])))
}

// Map a role title (or "Speculative" type) to a periodic-table tile so the page
// stays on-theme without HR ever touching chemistry. First match wins; falls
// through to a generic transition-metal default for unmatched titles.
const TAXONOMY_RULES = [
  { match: /open\s*application|speculative/i,                    sym: 'Xe', num: 54, cat: 'noble' },
  { match: /full[\s-]?stack|backend| engineer\b/i,       sym: 'Fe', num: 26, cat: 'transition' },
  { match: /front[\s-]?end/i,                                    sym: 'Cu', num: 29, cat: 'transition' },
  { match: /designer|design|ux|\bui\b/i,                         sym: 'Tb', num: 65, cat: 'lanthanide' },
  { match: /devops|platform|infra|sre|reliability/i,             sym: 'Sn', num: 50, cat: 'post' },
  { match: /\b(ai|ml)\b|machine learning|llm|data scientist/i,   sym: 'Si', num: 14, cat: 'metalloid' },
  { match: /mobile|ios|android/i,                                sym: 'Ge', num: 32, cat: 'metalloid' },
  { match: /security|infosec/i,                                  sym: 'Pb', num: 82, cat: 'post' },
  { match: /product manager|\bpm\b|product lead/i,               sym: 'Au', num: 79, cat: 'transition' },
  { match: /market|growth|content|writer/i,                      sym: 'Cu', num: 29, cat: 'transition' },
  { match: /sales|account exec/i,                                sym: 'Ag', num: 47, cat: 'transition' },
]
const TAXONOMY_DEFAULT = { sym: 'Co', num: 27, cat: 'transition' }

function withTaxonomy(role) {
  const haystack = `${role.title || ''} ${role.type || ''}`
  const hit = TAXONOMY_RULES.find((rule) => rule.match.test(haystack))
  return { ...(hit || TAXONOMY_DEFAULT), ...role }
}

const VALUES = [
  {
    accent: '--c-alkaline',
    tag: 'Long arc',
    title: 'You ship, then maintain.',
    body: "We don't write throwaway code. Every system you ship here, you'll likely be maintaining or extending two and three years from now. That changes how you write it — and we like that.",
  },
  {
    accent: '--c-alkali',
    tag: 'Slow hiring',
    title: 'Small team, deliberate growth.',
    body: "We hire infrequently and slowly because every new person changes the texture of the company. You won't be one of fifty engineers — you'll be one of ten or twelve, with real ownership.",
  },
  {
    accent: '--c-transition',
    tag: 'Async-first',
    title: 'Calendars are the exception.',
    body: 'Most of the work happens async. We meet when we genuinely need to. The rest of the time you keep your blocks of focus — that hour where you actually moved the thing forward.',
  },
  {
    accent: '--c-post',
    tag: 'Equal weight',
    title: 'Designers & engineers, same room.',
    body: "There's no 'hand off the spec' here. Designers code prototypes; engineers care about how things look and feel. The line between disciplines stays usefully blurry.",
  },
  {
    accent: '--c-noble',
    tag: 'Honest products',
    title: 'No vanity launches.',
    body: "We don't ship to the press. We ship to the customer. If a feature isn't ready it doesn't go out — even if a competitor announced it last week. We have nine products to be patient with.",
  },
  {
    accent: '--c-halogen',
    tag: 'Real time off',
    title: 'Your life outside work, kept whole.',
    body: "When you're off, you're off. No DMs, no on-call rotations for product engineers. The company is built so a four-week absence doesn't break anything — and yours won't.",
  },
]

const FALLBACK_ROLES = [
  {
    title: 'Senior Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote · APAC / Europe',
    pinned: 'Across two product lines, with real ownership.',
    body:
      "You'll work across two or three of our products — pick what to focus on each cycle. Senior here means: take a problem, scope it, build it, own the bugs three months later. We won't manage you; we'll match you with people who do good work and stay out of the way.",
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Remote · any timezone',
    pinned: 'Lead design on our healthtech product.',
    body:
      "We need a designer who can hold a healthtech product in their head — patient flows, clinic workflows, the regulatory edges. You'll lead design on Medical Hub, partner with two engineers, and weigh in across the rest of the company.",
  },
  {
    title: 'Platform / DevOps Engineer',
    type: 'Full-time',
    location: 'Remote · APAC preferred',
    pinned: 'Shared infrastructure for all eleven products.',
    body:
      "All of our products run on a small shared platform. You'll be the person who keeps it boring — backups that work, deploys that don't break, observability we actually look at. Not a Kubernetes cult; we'll happily run a container on a VM if it's the right answer.",
  },
  {
    title: 'AI / ML Engineer',
    type: 'Contract → full-time',
    location: 'Remote',
    pinned: 'Tender IQ + Olive AI primitives.',
    body:
      "You've shipped LLM-driven features in production — not demos, real ones. RAG that retrieves the right thing, structured-output tool calling, fine-tuning when it actually helps. You'll own the AI primitives across two products and influence how the rest of the company uses them.",
  },
  {
    title: 'Open application',
    type: 'Speculative',
    location: 'Anywhere',
    pinned: "Don't see your role here?",
    body:
      "We hire infrequently. If you'd be a fit but don't see a posting, write anyway — tell us what you'd want to do here, and what you've already made. We read every application, even the speculative ones. Especially those.",
  },
]

const HIRE_STEPS = [
  {
    title: 'Hello.',
    body: 'A 30-minute call. No whiteboards, no riddles. We want to know what you make and what you care about.',
    time: '30 min · week 1',
  },
  {
    title: 'Your work.',
    body: "Share something you've made — a project, a write-up, a side thing. Any form, any size. We read it carefully.",
    time: 'Async · week 1-2',
  },
  {
    title: 'Trial run.',
    body: 'A short paid project — 1 to 2 weeks of real work, on a real product. Both sides see what working together is actually like.',
    time: '1-2 weeks · paid',
  },
  {
    title: 'Decide.',
    body: 'Both ways. Within a week of the trial wrapping up. If it is yes, we agree on a start date and a first project together.',
    time: '<1 week',
  },
]

const BENEFITS = [
  { icon: '⌖', title: 'Remote-first', body: 'Work from where you do good work. We hire across timezones and design our cadence around that.' },
  { icon: '◴', title: 'Real time off', body: 'Four-week minimum, no questions, no approvals. The company is built to absorb your absence.' },
  { icon: '♢', title: 'Equipment & workspace', body: 'A budget for a real laptop, a real desk, and the chair your back deserves. Refresh every three years.' },
  { icon: '∙', title: 'Profit share', body: 'Annual share of company profits, distributed against tenure and impact. We win as a company, not as roles.' },
  { icon: '↗', title: 'Conference + sabbatical', body: 'One conference of your choice each year, plus a paid sabbatical week beyond regular leave.' },
  { icon: '⌗', title: 'Annual gathering', body: "Once a year we're in the same room for a week — not a retreat with trust falls. Just working together, in person, properly." },
]

export default function Careers() {
  const [ROLES, setRoles] = useState(() => FALLBACK_ROLES.map(withTaxonomy))

  useEffect(() => {
    if (!ROLES_CSV_URL) return
    let cancelled = false
    fetch(ROLES_CSV_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((csv) => {
        if (cancelled) return
        const parsed = parseCsv(csv)
        if (parsed.length) setRoles(parsed.map(withTaxonomy))
      })
      .catch(() => { /* keep fallback on any failure */ })
    return () => { cancelled = true }
  }, [])

  const speculativeCount = ROLES.filter((r) => /speculative/i.test(r.type || '')).length
  const openCount = ROLES.length - speculativeCount

  return (
    <main className="careers-page">
      {/* ========== HERO ========== */}
      <header>
        <div className="cr-eyebrow">
          <span className="line"></span>
          <span>Careers</span>
          <span className="dot-sep">·</span>
          <span>{openCount} open role{openCount === 1 ? '' : 's'} · {speculativeCount} open application{speculativeCount === 1 ? '' : 's'}</span>
        </div>

        <div className="cr-hero">
          <div>
            <h1 className="cr-title">
              Make things,<br />
              <em>not press releases.</em>
            </h1>
            <p className="cr-lede">
              We&apos;re a small company building long-running products in domains that
              don&apos;t make the front page — supply chains, clinic ops, EPC project
              comms, healthcare records. If those problems sound interesting and
              the speed of an agency sounds awful, you&apos;ll probably like it here.
            </p>
            <div className="cr-meta">
              <span><span className="pulse"></span><strong>Hiring</strong></span>
              <span>—</span>
              <span><strong>{openCount}</strong> open role{openCount === 1 ? '' : 's'}</span>
              <span>—</span>
              <span><strong>Remote-first</strong> · APAC base</span>
            </div>
          </div>

          <div className="cr-hero-tile" aria-hidden="true">
            <div className="cr-hero-tile-top">
              <span className="num">24</span>
              <span>Transition</span>
            </div>
            <div className="cr-hero-tile-sym">Cr</div>
            <div className="cr-hero-tile-bottom">
              <span className="name">Chromium · Career</span>
              <span>Cr</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========== WORKING HERE ========== */}
      <section className="cr-section">
        <div className="cr-section-head">
          <h2>Working here.</h2>
          <div className="meta">Six things<br />we actually mean</div>
        </div>

        <div className="cr-values">
          {VALUES.map((v) => (
            <article
              key={v.title}
              className="cr-value"
              style={{ '--accent': `var(${v.accent})` }}
            >
              <div className="cr-value-tag">
                <span className="swatch"></span>
                <span>{v.tag}</span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ========== OPEN ROLES ========== */}
      <section className="cr-section" id="roles">
        <div className="cr-section-head">
          <h2>Open roles.</h2>
          <div className="meta">{openCount} active<br />+ {speculativeCount} open application{speculativeCount === 1 ? '' : 's'}</div>
        </div>

        <div className="cr-roles">
          {ROLES.map((r) => {
            const accentVar = CATEGORY_VAR[r.cat] || '--c-unknown'
            const subject = encodeURIComponent(`Application — ${r.title}`)
            const body = encodeURIComponent(
              `Hi BaNa,\n\nI'd like to apply for ${r.title}.\n\n— Name:\n— Where you're based:\n— A link or two to your work:\n— Why this role:\n\nThanks.`
            )
            const href = `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
            return (
              <a
                key={r.title}
                className="cr-role"
                href={href}
                style={{ '--accent': `var(${accentVar})` }}
              >
                <div className="cr-role-tile" aria-hidden="true">
                  <span className="num">{r.num}</span>
                  <span className="sym">{r.sym}</span>
                </div>
                <div className="cr-role-body">
                  <div className="cr-role-meta">
                    <span>{r.type}</span>
                    <span className="dot">·</span>
                    <span>{r.location}</span>
                  </div>
                  <h3 className="cr-role-title">{r.title}</h3>
                  <p className="cr-role-pinned">{r.pinned} <span style={{ color: 'var(--ink-faint)' }}>—</span> {r.body}</p>
                </div>
                <span className="cr-role-cta">
                  Apply <span className="arrow">→</span>
                </span>
              </a>
            )
          })}
        </div>
      </section>

      {/* ========== HOW WE HIRE ========== */}
      <section className="cr-section">
        <div className="cr-section-head">
          <h2>How we hire.</h2>
          <div className="meta">Four steps<br />total · ~3 weeks</div>
        </div>

        <div className="cr-steps">
          {HIRE_STEPS.map((s, i) => (
            <article key={s.title} className="cr-step">
              <div className="cr-step-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="cr-step-time">{s.time}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ========== WHAT YOU GET ========== */}
      <section className="cr-section">
        <div className="cr-section-head">
          <h2>What you get.</h2>
          <div className="meta">In addition<br />to a salary that respects you</div>
        </div>

        <div className="cr-benefits">
          {BENEFITS.map((b) => (
            <div key={b.title} className="cr-benefit">
              <div className="cr-benefit-icon" aria-hidden="true">{b.icon}</div>
              <div className="cr-benefit-text">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cr-cta">
        <h2>Don&apos;t see <em>your role?</em></h2>
        <p>
          Write anyway. We hire infrequently — every great person we meet
          stays in our notes for the next time we&apos;re ready. Tell us what
          you&apos;d like to do and what you&apos;ve already made.
        </p>
        <div className="cr-cta-actions">
          <a
            href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent('Open application')}`}
            className="btn primary"
          >
            Send a general application <span className="arrow">→</span>
          </a>
          <Link to="/about" className="btn ghost">
            Read about the company
          </Link>
        </div>
      </section>
    </main>
  )
}
