import { useEffect } from 'react'
import { loadThree } from '../../../utils/loadThree'

const PALETTE = {
  alkali:     0xff6b5b,
  alkaline:   0xffb547,
  transition: 0x6db5ff,
  post:       0x36e5c7,
  metalloid:  0xb5e04a,
  nonmetal:   0xffe45e,
  halogen:    0xff5ba8,
  noble:      0xb47aff,
  lanthanide: 0xff8fa3,
  actinide:   0xff8c42,
}

// WebGL particle overlay on the periodic table. ~220 colored particles drift
// in 2D-ish space; the active hovered cell becomes an attractor that pulls
// nearby particles toward it and shifts them to its accent color.
//
// Hover state arrives via window 'bana:cell-enter' / 'bana:cell-leave' events
// dispatched by PeriodicTable, which knows about cells but not Three.js.
export default function TableField() {
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup = null
    let cancelled = false

    loadThree().then((THREE) => {
      if (cancelled || !THREE) return
      cleanup = init(THREE)
    }).catch(() => { /* silently skip if CDN unreachable */ })

    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [])

  return null
}

function init(THREE) {
    const canvas = document.getElementById('table-3d')
    const periodicEl = document.getElementById('periodic')
    if (!canvas || !periodicEl) return

    let W = periodicEl.offsetWidth
    let H = periodicEl.offsetHeight

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(W, H, false)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -100, 100)
    camera.position.z = 50

    const palette = Object.fromEntries(
      Object.entries(PALETTE).map(([k, v]) => [k, new THREE.Color(v)])
    )
    const paletteList = Object.values(palette)

    const COUNT = 220
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const velocities = []
    const baseColors = []

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * W
      positions[i * 3 + 1] = (Math.random() - 0.5) * H
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      velocities.push({
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.05,
      })
      const c = paletteList[Math.floor(Math.random() * paletteList.length)]
      baseColors.push(c)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 2.4,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
      depthWrite: false,
    })

    const points = new THREE.Points(geom, mat)
    scene.add(points)

    let attractor = null
    const readAccent = (cell) => {
      const v = cell.style.getPropertyValue('--accent')
      const m = v.match(/--c-(\w+)/)
      return (m && palette[m[1]]) ? palette[m[1]] : palette.alkaline
    }

    const onCellEnter = (e) => {
      const cell = e.detail?.cellEl
      if (!cell) return
      const cr = cell.getBoundingClientRect()
      const pr = periodicEl.getBoundingClientRect()
      attractor = {
        x: cr.left - pr.left + cr.width / 2 - W / 2,
        y: -(cr.top - pr.top + cr.height / 2 - H / 2),
        color: readAccent(cell),
      }
    }
    const onCellLeave = () => { attractor = null }
    window.addEventListener('bana:cell-enter', onCellEnter)
    window.addEventListener('bana:cell-leave', onCellLeave)

    let rafId = 0
    let stopped = false
    const animate = () => {
      if (stopped) return
      rafId = requestAnimationFrame(animate)
      const pos = geom.attributes.position.array
      const col = geom.attributes.color.array

      for (let i = 0; i < COUNT; i++) {
        const v = velocities[i]
        let targetColor = baseColors[i]

        if (attractor) {
          const dx = attractor.x - pos[i * 3]
          const dy = attractor.y - pos[i * 3 + 1]
          const dist = Math.hypot(dx, dy)
          if (dist < 240) {
            const force = 0.0009 * (1 - dist / 240)
            v.vx += dx * force
            v.vy += dy * force
            if (dist < 180) targetColor = attractor.color
          }
        }

        pos[i * 3]     += v.vx
        pos[i * 3 + 1] += v.vy
        pos[i * 3 + 2] += v.vz

        v.vx = v.vx * 0.97 + (Math.random() - 0.5) * 0.04
        v.vy = v.vy * 0.97 + (Math.random() - 0.5) * 0.04
        v.vz = v.vz * 0.99 + (Math.random() - 0.5) * 0.01

        const margin = 30
        if (pos[i * 3]     >  W / 2 + margin) pos[i * 3]     = -W / 2 - margin
        if (pos[i * 3]     < -W / 2 - margin) pos[i * 3]     =  W / 2 + margin
        if (pos[i * 3 + 1] >  H / 2 + margin) pos[i * 3 + 1] = -H / 2 - margin
        if (pos[i * 3 + 1] < -H / 2 - margin) pos[i * 3 + 1] =  H / 2 + margin

        col[i * 3]     += (targetColor.r - col[i * 3])     * 0.05
        col[i * 3 + 1] += (targetColor.g - col[i * 3 + 1]) * 0.05
        col[i * 3 + 2] += (targetColor.b - col[i * 3 + 2]) * 0.05
      }

      geom.attributes.position.needsUpdate = true
      geom.attributes.color.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    const resize = () => {
      W = periodicEl.offsetWidth
      H = periodicEl.offsetHeight
      camera.left = -W / 2; camera.right = W / 2
      camera.top  =  H / 2; camera.bottom = -H / 2
      camera.updateProjectionMatrix()
      renderer.setSize(W, H, false)
    }
    window.addEventListener('resize', resize)
    const resizeTimer = setTimeout(resize, 300)

    return () => {
      stopped = true
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('bana:cell-enter', onCellEnter)
      window.removeEventListener('bana:cell-leave', onCellLeave)
      geom.dispose()
      mat.dispose()
      renderer.dispose()
    }
}
