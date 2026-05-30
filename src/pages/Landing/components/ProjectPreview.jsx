import { useEffect, useRef, useState } from 'react'
import { LOGOS } from '../../../data/logos'
import { MOCKS } from '../../../data/mocks'
import { CATEGORY_HEX, CATEGORY_VAR } from '../../../data/categories'

// Mini browser-chrome wrapper around an iframe-rendered mock site.
// `interactive` lifts the click-through shield so the iframe receives input.
//
// Implementation note: we keep the .preview-shield element in the DOM at all
// times and toggle the .interactive class on .proj-preview instead of
// conditionally rendering. The original CSS uses
// `.proj-preview.interactive .preview-shield { opacity: 0; pointer-events: none }`
// to deactivate the shield — that pattern lets clicks pass through to the
// iframe immediately, with no race against React unmounting/remounting nodes.
export default function ProjectPreview({ sym, project, cat, name }) {
  const previewRef = useRef(null)
  const [interactive, setInteractive] = useState(false)
  const accentHex = CATEGORY_HEX[CATEGORY_VAR[cat]] || '#ffb547'
  const mockHtml = MOCKS[sym] ? MOCKS[sym](project.sym || sym, project, accentHex) : ''
  const hasLive = Boolean(project.previewUrl)
  const url = hasLive
    ? project.previewUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : project.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.bana.work'
  const logoSvg = LOGOS[sym] || sym

  // Click outside the preview to "lock" the iframe again.
  useEffect(() => {
    if (!interactive) return
    const onClick = (e) => {
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        setInteractive(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [interactive])

  return (
    <div ref={previewRef} className={`proj-preview${interactive ? ' interactive' : ''}`}>
      <div className="preview-chrome">
        <span className="dot"></span><span className="dot"></span><span className="dot"></span>
        <div className="url-bar">
          <span className="favicon" dangerouslySetInnerHTML={{ __html: logoSvg }} />
          <span className="url-text">{url}</span>
        </div>
      </div>
      {hasLive ? (
        <iframe
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title={`${name} preview`}
          src={project.previewUrl}
          data-lenis-prevent
        />
      ) : (
        <iframe
          loading="lazy"
          sandbox="allow-scripts"
          title={`${name} preview`}
          srcDoc={mockHtml}
          data-lenis-prevent
        />
      )}
      <div
        className="preview-shield"
        aria-label="Click to interact with preview"
        onClick={() => setInteractive(true)}
      >
        <span className="label"><span className="arrow">↗</span> Click to interact</span>
      </div>
    </div>
  )
}
