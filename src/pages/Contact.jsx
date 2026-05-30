import { useState } from 'react'
import { Link } from 'react-router-dom'
import './contact.css'

// Where the form's mailto should send. Swap when a real inbox is wired up.
const CONTACT_EMAIL = 'hello@bana.work'

// Apps Script Web App URL that appends a row to the contact-submissions sheet.
// Set VITE_CONTACT_SHEET_URL in .env. Empty/missing skips the POST and falls
// straight through to the mailto handoff.
const CONTACT_SHEET_URL = import.meta.env.VITE_CONTACT_SHEET_URL || ''

const TOPICS = [
  { value: '', label: 'Pick one…' },
  { value: 'Partnership', label: 'Partnership / build with us' },
  { value: 'Demo', label: 'Demo or sales question' },
  { value: 'Press', label: 'Press / interview request' },
  { value: 'Hiring', label: 'Hiring / careers' },
  { value: 'Support', label: 'Support for an existing product' },
  { value: 'Hello', label: 'Just saying hi' },
]

const REASONS = [
  {
    tag: 'Partnership',
    title: 'Build a product with us.',
    body: "We take on a small number of partner projects each year, usually in domains where we already ship. Bring the problem; we'll bring the team.",
    cta: 'Use the form, topic = Partnership',
    href: '#contact-form',
  },
  {
    tag: 'Hiring',
    title: 'Want to join the company?',
    body: "We hire infrequently and slowly — but we always want to know who you are. Open roles live on the careers page.",
    cta: 'See careers',
    href: '/careers',
    isInternal: true,
  },
  {
    tag: 'Press',
    title: 'Writing about BaNa?',
    body: 'Logos, founder bios, product fact-sheets — we keep them ready. Email with your outlet and angle and we will get back within a day.',
    cta: 'Email press',
    href: `mailto:${CONTACT_EMAIL}?subject=Press%20enquiry`,
  },
  {
    tag: 'Support',
    title: 'Existing product trouble?',
    body: "If you're already on one of our products, the in-app support channel is fastest. The form here is fine too — we read everything.",
    cta: 'Use the form',
    href: '#contact-form',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    topic: '',
    message: '',
  })
  // 'idle' before submit, 'sending' during POST, 'sent' on sheet success,
  // 'mailto' when we fell back to opening the user's mail client.
  const [status, setStatus] = useState('idle')

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const openMailto = () => {
    const subject = form.topic
      ? `[${form.topic}] from ${form.name || 'someone'}`
      : `Hello from ${form.name || 'someone'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.org ? `Organization: ${form.org}` : null,
      `Topic: ${form.topic || '—'}`,
      '',
      form.message,
    ].filter(Boolean).join('\n')
    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // POST to the sheet first. We use FormData (not JSON) on purpose: it
    // counts as a "simple request" so the browser skips the CORS preflight
    // that Apps Script Web Apps don't handle cleanly.
    if (CONTACT_SHEET_URL) {
      setStatus('sending')
      try {
        const fd = new FormData()
        fd.append('name', form.name)
        fd.append('email', form.email)
        fd.append('org', form.org)
        fd.append('topic', form.topic)
        fd.append('message', form.message)
        const res = await fetch(CONTACT_SHEET_URL, { method: 'POST', body: fd })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setStatus('sent')
        setForm({ name: '', email: '', org: '', topic: '', message: '' })
        return
      } catch {
        // Fall through to mailto so the user isn't left with a dead form.
      }
    }

    openMailto()
    setStatus('mailto')
  }

  return (
    <main className="contact-page">
      {/* ========== HERO ========== */}
      <header className="ct-hero">
        <div className="ct-eyebrow">
          <span className="line"></span>
          <span>Get in touch</span>
          <span className="dot-sep">·</span>
          <span>we read everything</span>
        </div>

        <h1 className="ct-title">
          Tell us what you&apos;re<br />
          <em>working on.</em>
        </h1>

        <p className="ct-lede">
          Whether it&apos;s a partnership, a question about one of our products, or
          you just want to say hello — write to us. A real person reads every
          message; you&apos;ll usually hear back within a day or two.
        </p>

        <div className="ct-meta">
          <span><span className="pulse"></span><strong>Online</strong> now</span>
          <span>—</span>
          <span>Reply within <strong>24-48h</strong></span>
          <span>—</span>
          <span><strong>Remote-first</strong> · Asia-Pacific</span>
        </div>
      </header>

      {/* ========== TILE + FORM ========== */}
      <section className="ct-grid" id="contact-form">
        {/* LEFT: tile + channels */}
        <div className="ct-left">
          <div className="ct-tile" aria-hidden="true">
            <div className="ct-tile-top">
              <span className="num">27</span>
              <span>Transition</span>
            </div>
            <div className="ct-tile-sym">Co</div>
            <div className="ct-tile-bottom">
              <span className="name">Cobalt · Contact</span>
              <span>Co</span>
            </div>
          </div>

          <div className="ct-channels">
            <a className="ct-channel" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="ct-channel-label">Email</span>
              <span className="ct-channel-value">{CONTACT_EMAIL}</span>
              <span className="arrow">→</span>
            </a>
            <a
              className="ct-channel"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ct-channel-label">LinkedIn</span>
              <span className="ct-channel-value">/company/bana</span>
              <span className="arrow">↗</span>
            </a>
            <a
              className="ct-channel"
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ct-channel-label">Twitter</span>
              <span className="ct-channel-value">@banacompany</span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        {/* RIGHT: form */}
        <form className="ct-form" onSubmit={handleSubmit} noValidate>
          <div className="ct-form-head">
            <span className="tag">Form · 01</span>
            <span>Tell us about it</span>
            <span className="line"></span>
          </div>

          <div className="ct-row">
            <div className="ct-field">
              <label htmlFor="ct-name">
                Your name <span className="req">*</span>
              </label>
              <input
                id="ct-name"
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Ada Lovelace"
                required
              />
            </div>
            <div className="ct-field">
              <label htmlFor="ct-email">
                Email <span className="req">*</span>
              </label>
              <input
                id="ct-email"
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="ada@example.com"
                required
              />
            </div>
          </div>

          <div className="ct-row">
            <div className="ct-field">
              <label htmlFor="ct-org">Organization</label>
              <input
                id="ct-org"
                type="text"
                value={form.org}
                onChange={update('org')}
                placeholder="Optional"
              />
            </div>
            <div className="ct-field">
              <label htmlFor="ct-topic">
                Topic <span className="req">*</span>
              </label>
              <select
                id="ct-topic"
                value={form.topic}
                onChange={update('topic')}
                required
              >
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value} disabled={t.value === ''}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ct-field">
            <label htmlFor="ct-msg">
              Message <span className="req">*</span>
            </label>
            <textarea
              id="ct-msg"
              value={form.message}
              onChange={update('message')}
              placeholder="What's the project, the question, the thing you'd like us to know? Pretend we just sat down across from you."
              required
            />
          </div>

          {status === 'sending' && (
            <div className="ct-status" role="status">
              Sending…
            </div>
          )}
          {status === 'sent' && (
            <div className="ct-status" role="status">
              <span className="check">✓</span>
              Got it. A real person will reply within 24-48h.
            </div>
          )}
          {status === 'mailto' && (
            <div className="ct-status" role="status">
              <span className="check">✓</span>
              Your email client should have opened. If nothing happened, send
              the message directly to <strong>&nbsp;{CONTACT_EMAIL}</strong>.
            </div>
          )}

          <div className="ct-actions">
            <button type="submit" className="ct-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send message <span className="arrow">→</span></>}
            </button>
            <span className="ct-note">
              No tracking. No newsletter signup. We just read your message.
            </span>
          </div>
        </form>
      </section>

      {/* ========== REASONS ========== */}
      <section className="ct-reasons">
        <div className="ct-reasons-head">
          <h2>Why might you write?</h2>
          <div className="meta">
            Four common reasons<br />and where each one goes
          </div>
        </div>

        <div className="ct-reasons-grid">
          {REASONS.map((r) =>
            r.isInternal ? (
              <Link key={r.tag} className="ct-reason" to={r.href}>
                <ReasonContent {...r} />
              </Link>
            ) : (
              <a
                key={r.tag}
                className="ct-reason"
                href={r.href}
                {...(r.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <ReasonContent {...r} />
              </a>
            )
          )}
        </div>
      </section>
    </main>
  )
}

function ReasonContent({ tag, title, body, cta }) {
  return (
    <>
      <span className="ct-reason-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="go">
        {cta} <span className="arrow">→</span>
      </span>
    </>
  )
}
