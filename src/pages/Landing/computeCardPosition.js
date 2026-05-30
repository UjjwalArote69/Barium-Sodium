// Position the floating card relative to the clicked cell. Mobile: anchor it
// near the bottom of the viewport, centered horizontally. Desktop: prefer the
// right of the cell, fall back to the left if it would clip, then keep it
// inside the viewport. Card height is approximated (220 / 280) since it depends
// on whether it's a brand or project tile — same tunings as the original.
export function computeCardPosition(cellRect, isBrand) {
  const isMobile = window.innerWidth <= 640
  const cardW = isMobile ? Math.min(320, window.innerWidth - 32) : 340
  const cardH = isBrand ? 220 : 280
  let left
  let top

  if (isMobile) {
    left = (window.innerWidth - cardW) / 2
    top = Math.min(cellRect.bottom + 12, window.innerHeight - cardH - 16)
    if (top < 16) top = 16
  } else {
    left = cellRect.right + 16
    top = cellRect.top + cellRect.height / 2 - cardH / 2
    if (left + cardW > window.innerWidth - 20) left = cellRect.left - cardW - 16
    if (left < 20) left = Math.max(20, cellRect.left + cellRect.width / 2 - cardW / 2)
    top = Math.max(20, Math.min(top, window.innerHeight - cardH - 20))
  }

  return { left: `${left}px`, top: `${top}px`, width: `${cardW}px` }
}
