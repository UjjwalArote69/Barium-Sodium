import { useEffect, useRef } from 'react'
import { loadThree } from '../../../utils/loadThree'

// Ambient floating particle field behind everything. Disabled on touch/mobile and
// for users with prefers-reduced-motion. Three.js is loaded dynamically — other
// routes don't pay for it.
export default function BackgroundField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    let cleanup = null
    let cancelled = false

    loadThree().then((THREE) => {
      if (cancelled || !THREE) return
      cleanup = init(THREE, canvas)
    }).catch(() => { /* CDN unreachable — silently skip */ })

    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [])

  return <canvas ref={canvasRef} id="bg-3d" className="bg-3d" aria-hidden="true" />
}

function init(THREE, canvas) {
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    const palette = [
      [1.00, 0.42, 0.36], // alkali coral
      [1.00, 0.71, 0.28], // alkaline amber
      [0.43, 0.71, 1.00], // transition blue
      [0.21, 0.90, 0.78], // post mint
      [0.71, 0.48, 1.00], // noble violet
      [1.00, 0.55, 0.26], // actinide orange
    ]

    const COUNT = 90
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const speeds = []

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 110
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
      speeds.push((Math.random() - 0.5) * 0.02)
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.45,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geom, mat)
    scene.add(points)

    let mx = 0, my = 0, tx = 0, ty = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true })

    let rafId = 0
    let stopped = false
    const animate = () => {
      if (stopped) return
      rafId = requestAnimationFrame(animate)
      points.rotation.y += 0.0004
      points.rotation.x += 0.00015

      const pos = geom.attributes.position.array
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i]
        if (pos[i * 3 + 1] > 35) pos[i * 3 + 1] = -35
        else if (pos[i * 3 + 1] < -35) pos[i * 3 + 1] = 35
      }
      geom.attributes.position.needsUpdate = true

      tx += (mx * 6 - tx) * 0.04
      ty += (-my * 4 - ty) * 0.04
      camera.position.x = tx
      camera.position.y = ty
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight, false)
    }
    window.addEventListener('resize', onResize)

    return () => {
      stopped = true
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geom.dispose()
      mat.dispose()
      renderer.dispose()
    }
}
