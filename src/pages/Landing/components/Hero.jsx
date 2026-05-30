import Eyebrow from './hero/Eyebrow'
import PeriodicTable from './PeriodicTable'

export default function Hero() {
  return (
    <>
      {/* Mobile-only hero (hidden on desktop, shown ≤768px) */}
      <header className="hero hero-mobile">
        <Eyebrow />
        <h1 className="title">The things <em>we make</em>.</h1>
      </header>

      {/* Desktop hero — periodic table is the hero. Headline composes into its empty cells. */}
      <div className="table-wrap">
        <PeriodicTable>
          {/* WebGL particle overlay — drifts and reacts to project/brand tile hovers */}
          <canvas id="table-3d" className="table-3d" aria-hidden="true"></canvas>

          {/* Eyebrow + headline share the same column span so their centers align perfectly. */}
          <div className="hero-in-grid">
            <Eyebrow closed />
            <h1 className="title">The things <em>we make</em>.</h1>
          </div>
        </PeriodicTable>
      </div>
    </>
  )
}
