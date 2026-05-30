// Real product entries for the table tiles whose chemical symbol matches a product's
// initials. Symbol → product info. Order in PROJECT_ORDER drives the projects-detail
// section list (numbered 01/09, 02/09, ...).

const env = import.meta.env
const URL_TENDER_IQ = env.VITE_URL_TENDER_IQ || 'https://tenderiq.meka.com/'
const URL_MY_MACHINE = env.VITE_URL_MY_MACHINE || 'https://mymachine.in/'
const URL_STARBOARD_OS = env.VITE_URL_STARBOARD_OS || 'https://starboardos.com/'
// Iframe-only URL: starboardos.com/login returns 404 (no SPA fallback on the host),
// but the root returns the SPA's index.html with 200, so embed the root.
const URL_STARBOARD_OS_PREVIEW = env.VITE_URL_STARBOARD_OS_PREVIEW || 'https://starboardos.com/'
const URL_TOW_AND_LIFT = env.VITE_URL_TOW_AND_LIFT || 'https://towandlift.com/'
const URL_KLINK = env.VITE_URL_KLINK || 'https://klink.in/'
const URL_PUGMARK_HR = env.VITE_URL_PUGMARK_HR || 'https://pugmarkhr.com/'
const URL_SITE_SAM = env.VITE_URL_SITE_SAM || 'https://sitesam.com/'
const URL_OLIVE = env.VITE_URL_OLIVE || 'https://oliveing.com/'

export const PROJECTS = {
  Sc: {
    slug: "suppliers-first",
    sym: "Sf",
    name: "Suppliers First",
    category: "Supply Chain",
    tagline: "Procurement, inventory, and vendor scoring — unified.",
    desc: "End-to-end supply chain visibility for mid-market manufacturers — procurement, inventory, logistics, and vendor scoring, unified in real time.",
    longDesc:
      "Suppliers First replaces the spreadsheet-and-email tangle most mid-market supply chains run on. Live inventory, PO workflows, vendor scorecards and shipment tracking sit in one console — so a procurement lead, a warehouse manager and a CFO are looking at the same numbers, not three different exports.",
    features: [
      { title: "Vendor scorecards", body: "Composite scoring across price, on-time delivery, defect rate and responsiveness — auto-updated from your PO history." },
      { title: "Live inventory", body: "Real-time stock positions across warehouses, with reorder thresholds and alert routing." },
      { title: "PO workflows", body: "Approval chains, three-way match, and contract terms enforced at issue time." },
      { title: "Logistics tracking", body: "Carrier pings, ETA drift and exception alerts — without rebuilding integrations per vendor." },
    ],
    stack: ["React", "Node", "Postgres", "Kafka"],
    status: "In production",
    live: "#",
  },
  Ti: {
    slug: "tender-iq",
    sym: "Tq",
    name: "Tender IQ",
    category: "Procurement / AI",
    tagline: "Find the right RFPs. Respond in hours, not weeks.",
    desc: "AI-assisted tender intelligence. Surfaces relevant RFPs, scores them against your capability profile, and drafts compliant first-pass responses.",
    longDesc:
      "Tender IQ ingests public and private RFP feeds, matches each against your firm's capability profile, and pre-drafts the boilerplate that eats 60% of bid writing time. Your bid manager spends time on price strategy and win themes — not formatting compliance matrices.",
    features: [
      { title: "Relevance scoring", body: "Each tender is scored against your past wins, certifications and geography — high-fit ones surface first." },
      { title: "First-pass drafts", body: "Compliance matrices and standard responses pre-filled from your bid library, ready for editing." },
      { title: "Deadline tracking", body: "Milestones, clarifications and submission windows in one calendar with reminders." },
      { title: "Win-loss analytics", body: "See which tender types you actually win, and stop chasing the ones you don't." },
    ],
    stack: ["Next.js", "Python", "Anthropic", "Postgres"],
    status: "Beta",
    year: "2025",
    live: URL_TENDER_IQ,
    previewUrl: URL_TENDER_IQ,
  },
  Mn: {
    slug: "my-machine",
    sym: "Mm",
    name: "My Machine",
    category: "Developer Tools",
    tagline: "A self-hostable stack for your one box.",
    desc: "A self-hostable infrastructure stack for solo developers and small teams. Reproducible automation, media, and workflows in a single box.",
    longDesc:
      "My Machine is the opinionated, reproducible homelab — the things you'd reach for as a solo dev or a two-person team, packaged so you can stand them up on a fresh box in an afternoon and tear them down without remembering how. Backups, secrets, networking, and updates handled.",
    features: [
      { title: "One-command bootstrap", body: "Single declarative file describes your stack — services, secrets, volumes, networking — applied idempotently." },
      { title: "Reproducible upgrades", body: "Pinned versions and dry-run upgrades; you see exactly what's going to change before it does." },
      { title: "Backups, by default", body: "Encrypted snapshots to S3-compatible storage on a schedule, with restore drills built in." },
      { title: "Honest dashboard", body: "What's running, what's drifted, what's about to fall over — no Grafana setup required." },
    ],
    stack: ["Go", "Docker", "Caddy", "Litestream"],
    status: "Public beta",
    year: "2025",
    live: URL_MY_MACHINE,
    previewUrl: URL_MY_MACHINE,
  },
  Kr: {
    slug: "klink-qr",
    sym: "Kq",
    name: "Klink QR Code",
    category: "Utilities",
    tagline: "QR codes that look like they belong on your brand.",
    desc: "A privacy-first QR toolkit for generating, branding, and tracking codes — bulk operations, custom logos, on-device analytics.",
    longDesc:
      "Klink generates QR codes that look like part of your brand instead of a black-and-white square — embedded logos, custom error correction, bulk CSV → 5,000 codes. Tracking is on-device first; we don't proxy scans through our servers unless you want us to.",
    features: [
      { title: "Branded codes", body: "Logos, color, frame and call-to-action — without breaking scan reliability across phones." },
      { title: "Bulk generation", body: "CSV in, ZIP out. Per-row destinations, per-row labels, deterministic filenames." },
      { title: "Privacy-first scans", body: "Scans don't bounce through our servers by default — opt in per code if you want analytics." },
      { title: "Re-pointable URLs", body: "Print once, change destinations later without reprinting." },
    ],
    stack: ["SvelteKit", "Rust (wasm)", "Cloudflare"],
    status: "Live",
    live: URL_KLINK,
    previewUrl: URL_KLINK,
  },
  Os: {
    slug: "starboard-os",
    sym: "So",
    name: "Starboard Os",
    category: "Maritime / Fleet",
    tagline: "The operational backbone for fleets at sea.",
    desc: "An operational backbone for maritime and fleet teams — voyage planning, crew rotation, harbor logistics, and compliance in a single console.",
    longDesc:
      "Maritime ops still run on email chains, PDFs and ship-to-shore phone calls. Starboard pulls voyage planning, crew rotation, port calls, bunkering and compliance into one console — built with the people doing it, in the language they actually use.",
    features: [
      { title: "Voyage planning", body: "Routes with weather and ETA windows, fuel estimates, and exception alerts when things drift." },
      { title: "Crew rotation", body: "Rotation schedules, certifications, and rest-hour compliance — visible to everyone who needs it." },
      { title: "Port calls", body: "Agent contacts, berth windows, document checklists — coordinated before the ship is anywhere near port." },
      { title: "Compliance log", body: "MARPOL, ISM, port-state inspections — with audit-ready exports." },
    ],
    stack: ["React", "Elixir", "Postgres", "Mapbox"],
    status: "Pilot",
    year: "2025",
    live: URL_STARBOARD_OS,
    previewUrl: URL_STARBOARD_OS_PREVIEW,
  },
  Au: {
    slug: "olive",
    sym: "Ol",
    name: "Olive",
    category: "Productivity",
    tagline: "Notes, tasks and AI in one OS-style window.",
    desc: "A desktop-class productivity suite that wraps notes, tasks, files, and AI into a single OS-style interface in the browser.",
    longDesc:
      "Olive is what happens when notes and tasks stop pretending to be separate apps. One window, one search, one keyboard. AI is a citizen of the OS, not a chat panel bolted on — it can read your context, edit your files, and finish your thought.",
    features: [
      { title: "OS-style window manager", body: "Tile, stack and snap notes, tasks, and docs the way you would on a real desktop." },
      { title: "Universal search", body: "One palette across notes, tasks, files and chat history — keyboard-first." },
      { title: "AI as a primitive", body: "Write a prompt anywhere; it reads the surrounding context and writes back into your doc." },
      { title: "Local-first sync", body: "Edits work offline and merge cleanly when you're back — your laptop is the source of truth." },
    ],
    stack: ["Tauri", "React", "SQLite", "Anthropic"],
    status: "Early access",
    year: "2025",
    live: URL_OLIVE,
    previewUrl: URL_OLIVE,
  },
  Tl: {
    slug: "tow-and-lift",
    sym: "Tw",
    name: "Tow and Lift",
    category: "Logistics",
    tagline: "Dispatch the nearest verified operator. Now.",
    desc: "On-demand towing and heavy-lift dispatch — connecting drivers and operators with the nearest verified service in real time.",
    longDesc:
      "Towing and heavy-lift dispatch is still mostly phone trees. Tow and Lift is a real-time matching layer between people who need a vehicle moved and verified operators with capacity nearby — with pricing transparency, in-app payment, and the paperwork pre-filled.",
    features: [
      { title: "Real-time matching", body: "Operators within range get the request; first qualifying response wins, fairly." },
      { title: "Verified operators", body: "Insurance, licenses and equipment specs validated up front — no on-the-spot surprises." },
      { title: "Transparent pricing", body: "Distance, equipment class and surge factors visible before the operator is dispatched." },
      { title: "Paperwork, prefilled", body: "POD, condition reports and invoicing emitted automatically at completion." },
    ],
    stack: ["React Native", "Node", "Postgres", "Mapbox"],
    status: "Pilot",
    year: "2025",
    live: URL_TOW_AND_LIFT,
    previewUrl: URL_TOW_AND_LIFT,
  },
  Pu: {
    slug: "pugmark-hr",
    sym: "Ph",
    name: "Pugmark HR",
    category: "HR Tech",
    tagline: "An HRMS for teams that have outgrown the spreadsheet.",
    desc: "A modern HRMS for growing teams. Employee lifecycle, attendance, payroll, and performance — built for companies that have outgrown spreadsheets.",
    longDesc:
      "Pugmark HR is the HRMS your founders should have moved to a year before they did. Onboarding, attendance, leave, payroll, performance and offboarding — without the enterprise pricing or the enterprise UI. Built for the 30-300 employee window, the painful one.",
    features: [
      { title: "Lifecycle in one place", body: "Onboard, manage, offboard — every state change writes to the same record, no parallel files." },
      { title: "Attendance & leave", body: "Geofenced check-in, leave balances, holiday calendars and exception flows that managers can actually run." },
      { title: "Payroll, locally compliant", body: "Tax tables, deductions and statutory filings handled per region, not as an afterthought." },
      { title: "Performance reviews", body: "Lightweight cycles with goals, peer feedback and one-on-one notes — not a 14-step Workday flow." },
    ],
    stack: ["Next.js", "Postgres", "TypeScript"],
    status: "Live",
    live: URL_PUGMARK_HR,
    previewUrl: URL_PUGMARK_HR,
  },
  Es: {
    slug: "site-sam",
    sym: "Ss",
    name: "Site Sam",
    category: "Construction Tech",
    tagline: "EPC project comms — without the email chaos.",
    desc: "A unified workspace for engineering, procurement, and construction teams. Drawings, RFIs, submittals, and schedules — without the email chaos.",
    longDesc:
      "Site Sam is the workspace EPC teams keep trying to assemble out of Outlook, Excel and a shared drive. Drawings, RFIs, submittals, schedules and field reports — versioned, threaded, and tied back to the same project structure that the GC and the client see.",
    features: [
      { title: "Drawings, versioned", body: "Latest revisions surface to the field automatically; old ones marked superseded with audit trail." },
      { title: "RFI / submittal flow", body: "Threaded, tracked, and tied to spec sections — no more 'did you reply on email or in the portal?'." },
      { title: "Schedule, but readable", body: "Critical-path views the field foreman will actually open — not a 5,000-row Primavera dump." },
      { title: "Field reports", body: "Daily logs, photos and weather pulled into one record per day, search-friendly across the project." },
    ],
    stack: ["React", "Node", "Postgres", "S3"],
    status: "Pilot",
    year: "2025",
    live: URL_SITE_SAM,
    previewUrl: URL_SITE_SAM,
  },
  Hg: {
    slug: "medical-hub",
    sym: "Mh",
    name: "Medical Hub",
    category: "HealthTech / Operations",
    tagline: "Run a clinic without ten different tools.",
    desc: "An operations console for outpatient clinics and small hospitals — appointments, billing, prescriptions and records in one workspace built for the way clinics actually run.",
    longDesc:
      "Most clinic  was built for hospitals and bolted onto clinics. Medical Hub starts with the clinic — a 6-doctor practice, a 30-bed hospital, a multi-specialty center — and treats the front desk, the doctor and the billing team as one team looking at one patient. Appointments, prescriptions, billing, and records flow through the same record, in the language clinic staff actually use.",
    features: [
      { title: "Appointments, integrated", body: "Booking, reminders, no-show tracking and check-in flow on one screen the front desk actually wants to use." },
      { title: "Prescriptions, structured", body: "Diagnosis codes, medication interactions and repeat-prescription rules — typed once, not handwritten and re-typed three times." },
      { title: "Billing without the second system", body: "Invoicing, insurance claims and the patient ledger live in the same record as the visit. No CSV exports between tools." },
      { title: "Multi-clinic from day one", body: "One organization, many sites, shared records and shared rosters — with per-site permissions when you need them." },
    ],
    stack: ["React", "Node", "Postgres", "TypeScript"],
    status: "Pilot",
    year: "2025",
    live: "#",
  },
}

export const PROJECT_ORDER = ["Sc","Ti","Mn","Kr","Os","Au","Tl","Pu","Es","Hg"]

// Slug → symbol for routing
export const PROJECT_BY_SLUG = Object.fromEntries(
  Object.entries(PROJECTS).map(([sym, p]) => [p.slug, sym])
)
