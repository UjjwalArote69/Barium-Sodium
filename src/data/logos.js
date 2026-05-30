// Distinct SVG mark per product. Each uses currentColor so it picks up the accent.
// Stored as raw SVG strings so they can be inlined into iframe srcdoc previews
// (the project-row mock chrome uses one as the favicon). React components render
// them via dangerouslySetInnerHTML in <Logo />.
export const LOGOS = {
  // Suppliers First — supply chain network (4 connected nodes)
  Sc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.2" fill="currentColor" fill-opacity="0.18"/><circle cx="12" cy="5.5" r="2.2" fill="currentColor" fill-opacity="0.18"/><circle cx="12" cy="18.5" r="2.2" fill="currentColor" fill-opacity="0.18"/><circle cx="19" cy="12" r="2.2" fill="currentColor" fill-opacity="0.18"/><line x1="6.7" y1="11" x2="10.3" y2="6.6"/><line x1="6.7" y1="13" x2="10.3" y2="17.4"/><line x1="13.7" y1="6.6" x2="17.3" y2="11"/><line x1="13.7" y1="17.4" x2="17.3" y2="13"/></svg>`,

  // Tender IQ — document with AI sparkle
  Ti: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><path d="M11.5 12l0.9 1.9 2 0.6-2 0.6-0.9 1.9-0.9-1.9-2-0.6 2-0.6z" fill="currentColor"/></svg>`,

  // My Machine — real product mark
  Mn: `<img src="/icons/mymachine.png" alt="My Machine"/>`,

  // Klink QR Code — finder squares (corner pattern)
  Kr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="5.5" y="5.5" width="2" height="2" fill="currentColor" stroke="none"/><rect x="16.5" y="5.5" width="2" height="2" fill="currentColor" stroke="none"/><rect x="5.5" y="16.5" width="2" height="2" fill="currentColor" stroke="none"/><rect x="14" y="14" width="2.5" height="2.5" fill="currentColor" stroke="none"/><rect x="18" y="14" width="3" height="2.5" fill="currentColor" stroke="none"/><rect x="14" y="17.5" width="2.5" height="3.5" fill="currentColor" stroke="none"/><rect x="18.5" y="18.5" width="2.5" height="2.5" fill="currentColor" stroke="none"/></svg>`,

  // Starboard Os — real product mark
  Os: `<img src="/icons/starboardos.png" alt="Starboard Os"/>`,

  // Olive — desktop window with sidebar
  Au: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="20"/><circle cx="6" cy="6.5" r="0.7" fill="currentColor"/><circle cx="8.5" cy="6.5" r="0.7" fill="currentColor"/><line x1="5" y1="13" x2="7" y2="13"/><line x1="5" y1="16" x2="7" y2="16"/></svg>`,

  // Tow and Lift — real product mark
  Tl: `<img src="/icons/towandlift.png" alt="Tow and Lift"/>`,

  // Pugmark HR — paw print (the literal meaning of "pugmark")
  Pu: `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="16.5" rx="4.5" ry="3.8"/><ellipse cx="6" cy="9" rx="1.7" ry="2.2"/><ellipse cx="9.5" cy="6" rx="1.7" ry="2.2"/><ellipse cx="14.5" cy="6" rx="1.7" ry="2.2"/><ellipse cx="18" cy="9" rx="1.7" ry="2.2"/></svg>`,

  // Site Sam — real product mark
  Es: `<img src="/icons/site_sam.png" alt="Site Sam"/>`,

  // Medical Hub — central node with caduceus-style branches (medical hub network)
  Hg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.18"/><circle cx="5" cy="6" r="1.8" fill="currentColor" fill-opacity="0.18"/><circle cx="19" cy="6" r="1.8" fill="currentColor" fill-opacity="0.18"/><circle cx="5" cy="18" r="1.8" fill="currentColor" fill-opacity="0.18"/><circle cx="19" cy="18" r="1.8" fill="currentColor" fill-opacity="0.18"/><line x1="6.4" y1="7" x2="9.8" y2="10.5"/><line x1="17.6" y1="7" x2="14.2" y2="10.5"/><line x1="6.4" y1="17" x2="9.8" y2="13.5"/><line x1="17.6" y1="17" x2="14.2" y2="13.5"/><line x1="11" y1="11" x2="13" y2="13"/><line x1="13" y1="11" x2="11" y2="13"/></svg>`,
}
