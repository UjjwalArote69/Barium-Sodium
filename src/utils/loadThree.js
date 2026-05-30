// Dynamically inject Three.js (r128) only when a scene that needs it mounts.
// Cached across calls — second caller awaits the first call's <script>.
// Other routes (/careers, /products, /about, /contact) never pay for Three.

const THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'

let cached = null

export function loadThree() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.THREE) return Promise.resolve(window.THREE)
  if (cached) return cached

  cached = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${THREE_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.THREE))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = THREE_SRC
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = () => resolve(window.THREE)
    script.onerror = () => {
      cached = null // allow retry
      reject(new Error('Failed to load Three.js'))
    }
    document.head.appendChild(script)
  })

  return cached
}
