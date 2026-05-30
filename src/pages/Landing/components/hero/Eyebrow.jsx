import { Fragment } from 'react'

const ITEMS = ['BaNa']

export default function Eyebrow({ closed = false }) {
  return (
    <div className="eyebrow">
      <span className="line"></span>
      {ITEMS.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <span className="dot-sep">·</span>}
          <span>{item}</span>
        </Fragment>
      ))}
      {closed && <span className="line"></span>}
    </div>
  )
}
