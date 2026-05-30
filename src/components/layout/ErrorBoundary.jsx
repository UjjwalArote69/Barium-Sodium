import { Component } from 'react'
import { Link } from 'react-router-dom'
import './ErrorBoundary.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info)
    }
  }

  handleReset = () => {
    this.setState({ error: null, info: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    const isDev = import.meta.env.DEV
    const message = error?.message || String(error)

    return (
      <main className="eb-page">
        <div className="eb-eyebrow">
          <span className="line"></span>
          <span>Unexpected reaction</span>
          <span className="dot-sep">·</span>
          <span>err / 500</span>
        </div>

        <div className="eb-tile" aria-hidden="true">
          <div className="eb-tile-num">!</div>
          <div className="eb-tile-sym">Er</div>
          <div className="eb-tile-name">Error</div>
        </div>

        <h1 className="eb-title">
          Something <em>destabilized.</em>
        </h1>
        <p className="eb-lede">
          A part of this page crashed before it could render. The rest of the
          company still works — try one of these.
        </p>

        <div className="eb-actions">
          <button type="button" className="eb-btn primary" onClick={this.handleReset}>
            Try again <span className="arrow">↻</span>
          </button>
          <button type="button" className="eb-btn ghost" onClick={this.handleReload}>
            Reload page
          </button>
          <Link to="/" className="eb-btn ghost" onClick={this.handleReset}>
            Go home <span className="arrow">→</span>
          </Link>
        </div>

        {isDev && (
          <details className="eb-debug" open>
            <summary>Developer details</summary>
            <div className="eb-debug-msg">{message}</div>
            {info?.componentStack && (
              <pre className="eb-debug-stack">{info.componentStack}</pre>
            )}
            {error?.stack && (
              <pre className="eb-debug-stack">{error.stack}</pre>
            )}
          </details>
        )}
      </main>
    )
  }
}
