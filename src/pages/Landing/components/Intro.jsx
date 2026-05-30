import { PROJECTS } from '../../../data/projects'
import { ELEMENTS } from '../../../data/elements'

export default function Intro() {
  const productCount = Object.keys(PROJECTS).length
  const elementCount = ELEMENTS.length

  return (
    <section className="intro">
      <p className="subtitle">
        Welcome to Barium Sodium. Our name combines the chemical symbols of{' '}
        <span className="ba">Ba</span>rium and <span className="na">Na</span>sodium, to create
        BaNa (to make or create, in Hindi) — a small periodic-table joke that runs through
        everything we make.
      </p>
      <p className="subtitle">
        We are innovators, ideators, imagineers, programmers, engineers and creators —
        creating each product like fine craftsmen, with passion and vision. Our BaNa Periodic
        chart is mapped to the various elements we are creating. Hover any glowing tile to
        learn more.
      </p>
      <div className="meta-row">
        <span><strong>{elementCount}</strong> elements</span>
        <span><strong>{productCount}</strong> products</span>
        <span><strong>1</strong> company</span>
      </div>
    </section>
  )
}
