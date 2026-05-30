// Mock site builders -- each function returns a complete <html> document string
// rendered inside an iframe srcdoc preview in the projects-detail section.
// Extracted verbatim from bariumSodium.html (function mockShell + const MOCKS).
//
// Each MOCKS entry has signature (sym, project, accentHex) => htmlString.

function mockShell(body, accent) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--accent:${accent};--bg:#0d0d10;--bg2:#15151a;--bg3:#1d1d24;--ink:#f0eee8;--dim:#8a8a92;--faint:#4a4a52;--line:rgba(255,255,255,.07);--mono:ui-monospace,"JetBrains Mono",Menlo,monospace;--sans:ui-sans-serif,system-ui,-apple-system,sans-serif;--serif:Georgia,serif}
html{scroll-behavior:smooth;color-scheme:dark}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:13px;line-height:1.55;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:var(--faint);border-radius:4px}::-webkit-scrollbar-track{background:transparent}
.nv{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:rgba(13,13,16,.78);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nv-l{display:flex;align-items:center;gap:10px;font-weight:600;font-size:13px}
.nv-l .s{font-family:var(--mono);font-weight:700;color:var(--accent);background:color-mix(in oklab,var(--accent) 14%,transparent);border:1px solid color-mix(in oklab,var(--accent) 40%,transparent);width:24px;height:24px;display:grid;place-items:center;border-radius:5px;font-size:10px}
.nv-m{display:flex;gap:18px}
.nv-m a{color:var(--dim);text-decoration:none;font-size:12px;cursor:pointer;transition:color .15s}
.nv-m a:hover,.nv-m a.act{color:var(--ink)}
.nv-r{display:flex;align-items:center;gap:12px}
.cta{background:var(--accent);color:#0d0d10;padding:7px 13px;border-radius:6px;font-size:11px;font-weight:600;border:none;cursor:pointer}
.av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--accent),color-mix(in oklab,var(--accent) 30%,#000));display:grid;place-items:center;font-size:10px;font-weight:700;color:#0d0d10}
.hero{padding:54px 24px 44px;border-bottom:1px solid var(--line)}
.eb{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;display:inline-flex;align-items:center;gap:8px}
.eb::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.hero h1{font-family:var(--serif);font-size:36px;line-height:1.1;font-weight:400;letter-spacing:-.02em;margin-bottom:14px;max-width:600px}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero p{font-size:15px;color:var(--dim);max-width:540px}
.sec{padding:32px 24px;border-bottom:1px solid var(--line)}
.sh{display:flex;justify-content:space-between;align-items:end;margin-bottom:18px}
.sh h2{font-family:var(--serif);font-style:italic;font-size:22px;font-weight:400}
.sh .m{font-family:var(--mono);font-size:10px;color:var(--dim);letter-spacing:.08em;text-transform:uppercase}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.kpi{padding:14px 16px;background:var(--bg2);display:flex;flex-direction:column;gap:4px}
.kpi-l{font-family:var(--mono);font-size:10px;color:var(--dim);letter-spacing:.06em;text-transform:uppercase}
.kpi-v{font-family:var(--serif);font-size:26px;line-height:1}
.kpi-c{font-family:var(--mono);font-size:10px;color:var(--accent)}
.kpi-c.dn{color:#ff7065}
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{text-align:left;padding:9px 12px;font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);border-bottom:1px solid var(--line)}
.tbl td{padding:11px 12px;border-bottom:1px solid var(--line)}
.tbl tr:hover td{background:rgba(255,255,255,.02)}
.tbl td.mono{font-family:var(--mono);font-size:11px}
.pl{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;font-family:var(--mono);font-size:10px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.pl.live{color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,transparent);border-color:color-mix(in oklab,var(--accent) 30%,transparent)}
.pl.warn{color:#ffb547;background:rgba(255,181,71,.1);border-color:rgba(255,181,71,.3)}
.pl.late{color:#ff6b5b;background:rgba(255,107,91,.1);border-color:rgba(255,107,91,.3)}
.pl.ok{color:#36e5c7;background:rgba(54,229,199,.08);border-color:rgba(54,229,199,.3)}
.pl .d{width:5px;height:5px;border-radius:50%;background:currentColor}
.crd{background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:16px;transition:border-color .2s}
.crd:hover{border-color:color-mix(in oklab,var(--accent) 40%,transparent)}
.crd h3{font-size:13px;margin-bottom:4px}
.crd p{font-size:11px;color:var(--dim);line-height:1.5}
.crd .num{font-family:var(--mono);font-size:9px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px}
.gr3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.gr2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ftr{padding:22px 24px;display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.08em;text-transform:uppercase}
.bar{height:4px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px}
.bar>span{display:block;height:100%;background:var(--accent);border-radius:2px}
.acc{color:var(--accent)}
code,kbd,pre{font-family:var(--mono);font-size:12px}
pre{background:var(--bg2);border:1px solid var(--line);border-radius:8px;padding:14px 16px;overflow-x:auto;line-height:1.6}
pre .c{color:var(--dim)}.k{color:var(--accent)}
@media (max-width:640px){
  .nv{padding:10px 14px}.nv-m{display:none}.nv-l{font-size:12px}
  .hero{padding:36px 14px 30px}.hero h1{font-size:26px}.hero p{font-size:13px}
  .sec{padding:24px 14px}.sh h2{font-size:18px}
  .kpis{grid-template-columns:repeat(2,1fr)}.kpi{padding:12px}.kpi-v{font-size:22px}
  .gr3,.gr2{grid-template-columns:1fr}
  .tbl{font-size:11px}.tbl th,.tbl td{padding:8px 10px}
  .ftr{padding:18px 14px;flex-direction:column;gap:6px;align-items:flex-start}
  pre{font-size:11px;padding:10px 12px}
}
@media (max-width:420px){
  .kpis{grid-template-columns:1fr 1fr}.kpi-v{font-size:20px}
  .hero h1{font-size:22px}.hero{padding:28px 14px 24px}
  .tbl{font-size:10px}.tbl th{font-size:9px}
}
</style></head><body>${body}</body></html>`;
}

const MOCKS = {
  // ============== SCM — Supply Chain Dashboard ==============
  "Sc": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Dashboard</a><a>Shipments</a><a>Suppliers</a><a>Inventory</a><a>Reports</a></nav>
      <div class="nv-r"><button class="cta">+ New order</button><div class="av">JR</div></div>
    </header>
    <section class="hero">
      <div class="eb">Live · 12,847 active shipments</div>
      <h1>Your supply chain, <em>visible end to end</em>.</h1>
      <p>Track every order, vendor, and shipment in real time. Score suppliers, predict delays, and ship more on time.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Today's overview</h2><div class="m">Updated 2 min ago</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Open orders</span><span class="kpi-v">342</span><span class="kpi-c">+12% wk</span></div>
        <div class="kpi"><span class="kpi-l">Active vendors</span><span class="kpi-v">187</span><span class="kpi-c">+3 new</span></div>
        <div class="kpi"><span class="kpi-l">On-time rate</span><span class="kpi-v">94.2%</span><span class="kpi-c">+1.4 pts</span></div>
        <div class="kpi"><span class="kpi-l">Inventory val.</span><span class="kpi-v">$2.4M</span><span class="kpi-c">+$120K</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Active shipments</h2><div class="m">7 of 342</div></div>
      <table class="tbl">
        <thead><tr><th>Order</th><th>Vendor</th><th>Route</th><th>Status</th><th>ETA</th></tr></thead>
        <tbody>
          <tr><td class="mono">SH-49281</td><td>Pacific Logistics</td><td>Shanghai → LA</td><td><span class="pl live"><span class="d"></span>In transit</span></td><td>May 8</td></tr>
          <tr><td class="mono">SH-49280</td><td>Northwind</td><td>Mumbai → Rotterdam</td><td><span class="pl warn"><span class="d"></span>Customs</span></td><td>May 11</td></tr>
          <tr><td class="mono">SH-49279</td><td>Apex Freight</td><td>Hamburg → NYC</td><td><span class="pl ok"><span class="d"></span>Loaded</span></td><td>May 14</td></tr>
          <tr><td class="mono">SH-49278</td><td>Pacific Logistics</td><td>Yokohama → Seattle</td><td><span class="pl late"><span class="d"></span>Delayed 2d</span></td><td>May 6</td></tr>
          <tr><td class="mono">SH-49277</td><td>Sea Cargo Co</td><td>Singapore → Long Beach</td><td><span class="pl live"><span class="d"></span>In transit</span></td><td>May 9</td></tr>
          <tr><td class="mono">SH-49276</td><td>Northwind</td><td>Mumbai → Felixstowe</td><td><span class="pl live"><span class="d"></span>Departed</span></td><td>May 18</td></tr>
          <tr><td class="mono">SH-49275</td><td>Apex Freight</td><td>Antwerp → Houston</td><td><span class="pl live"><span class="d"></span>In transit</span></td><td>May 12</td></tr>
        </tbody>
      </table>
    </section>
    <section class="sec">
      <div class="sh"><h2>Top suppliers, this quarter</h2><div class="m">By score</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">01 · 96.4 score</div><h3>Pacific Logistics</h3><p>87 orders shipped on time. Zero defects. Avg lead: 4.2 days.</p></div>
        <div class="crd"><div class="num">02 · 94.1 score</div><h3>Apex Freight</h3><p>62 orders, 1 minor defect. Strong comms, fast invoicing.</p></div>
        <div class="crd"><div class="num">03 · 91.7 score</div><h3>Northwind</h3><p>48 orders. Reliable but pricier. Avg lead: 6.1 days.</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>v3.4.1 · uptime 99.98%</div></footer>
  `, a),

  // ============== TenderIQ — AI Procurement ==============
  "Ti": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Tenders</a><a>AI Drafts</a><a>Pipeline</a><a>Analytics</a></nav>
      <div class="nv-r"><button class="cta">+ Import RFP</button><div class="av">PA</div></div>
    </header>
    <section class="hero">
      <div class="eb">12 new RFPs this week</div>
      <h1>The AI <em>reads tenders</em> so your team doesn't have to.</h1>
      <p>Surfaces relevant RFPs, scores fit against your capability profile, and drafts compliant first-pass responses.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>This week</h2><div class="m">Auto-refreshing</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">New RFPs</span><span class="kpi-v">12</span><span class="kpi-c">+4 today</span></div>
        <div class="kpi"><span class="kpi-l">Avg fit score</span><span class="kpi-v">82%</span><span class="kpi-c">+6 pts</span></div>
        <div class="kpi"><span class="kpi-l">Drafts ready</span><span class="kpi-v">9</span><span class="kpi-c">3 reviewed</span></div>
        <div class="kpi"><span class="kpi-l">Win rate, YTD</span><span class="kpi-v">68%</span><span class="kpi-c">+11 pts</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Open tenders, ranked</h2><div class="m">By AI fit</div></div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="crd" style="display:grid;grid-template-columns:60px 1fr 90px 90px;gap:14px;align-items:center"><div style="font-family:var(--mono);font-size:22px;font-weight:700;color:var(--accent)">96</div><div><h3>Federal cybersecurity audit, DoD-2026-0481</h3><p>$2.4M ceiling · Due Jun 14 · Set-aside: SDVOSB</p></div><span class="pl live"><span class="d"></span>Best fit</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">draft 80%</div></div>
        <div class="crd" style="display:grid;grid-template-columns:60px 1fr 90px 90px;gap:14px;align-items:center"><div style="font-family:var(--mono);font-size:22px;font-weight:700;color:var(--accent)">91</div><div><h3>City of Denver — fleet telemetry</h3><p>$680K · Due May 30 · Open competition</p></div><span class="pl live"><span class="d"></span>Strong</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">draft 45%</div></div>
        <div class="crd" style="display:grid;grid-template-columns:60px 1fr 90px 90px;gap:14px;align-items:center"><div style="font-family:var(--mono);font-size:22px;font-weight:700;color:var(--accent)">87</div><div><h3>NHS Trust — procurement modernization</h3><p>£1.1M · Due Jul 2 · Framework 4</p></div><span class="pl live"><span class="d"></span>Strong</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">queued</div></div>
        <div class="crd" style="display:grid;grid-template-columns:60px 1fr 90px 90px;gap:14px;align-items:center"><div style="font-family:var(--mono);font-size:22px;font-weight:700;color:#ffb547">74</div><div><h3>State of California — OCR pilot</h3><p>$420K · Due Jun 8 · Public bid</p></div><span class="pl warn"><span class="d"></span>Maybe</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">drafting</div></div>
        <div class="crd" style="display:grid;grid-template-columns:60px 1fr 90px 90px;gap:14px;align-items:center"><div style="font-family:var(--mono);font-size:22px;font-weight:700;color:#ffb547">68</div><div><h3>Boeing — supplier portal upgrade</h3><p>$1.2M · Due Jul 18 · Invitation only</p></div><span class="pl warn"><span class="d"></span>Stretch</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">queued</div></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Recent AI drafts</h2><div class="m">Last 24h</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">DoD-2026-0481</div><h3>Section 3.2 — Past performance</h3><p>Draft references 4 contracts. Confidence high. Awaiting human review.</p></div>
        <div class="crd"><div class="num">Denver-fleet</div><h3>Technical approach</h3><p>2 sources cited. Compliance matrix attached. Ready for legal.</p></div>
        <div class="crd"><div class="num">CA-OCR</div><h3>Pricing narrative</h3><p>Volume tiers proposed. Margin within target band.</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>Powered by your team · Drafted by AI</div></footer>
  `, a),

  // ============== My Machine — Dev Tool / Landing ==============
  "Mn": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Home</a><a>Modules</a><a>Docs</a><a>Recipes</a><a>Changelog</a></nav>
      <div class="nv-r"><a class="cta">Install →</a></div>
    </header>
    <section class="hero">
      <div class="eb">v0.9.2 · open beta</div>
      <h1>Reproducible <em>workstations</em>, in one command.</h1>
      <p>A self-hostable infrastructure stack for solo developers and small teams. Spin up your editor, shell, dotfiles, and tools in minutes — not days.</p>
      <div style="margin-top:24px"><pre><span class="c"># run this on a fresh box</span>
curl -fsSL <span class="k">bana.work/mm</span> | bash

<span class="c"># or pin a profile</span>
mm install <span class="k">@workstation/full</span></pre></div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Modules</h2><div class="m">147 available · 23 official</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">@editor/neovim</div><h3>Neovim, properly</h3><p>LSP, treesitter, completion, themes — wired up. Restartable.</p></div>
        <div class="crd"><div class="num">@shell/zsh</div><h3>Zsh + starship</h3><p>Fast prompt, history sync, sane defaults. Plays well with tmux.</p></div>
        <div class="crd"><div class="num">@dev/docker</div><h3>Docker + lazydocker</h3><p>Engine, compose, GUI, registry login. Rootless mode supported.</p></div>
        <div class="crd"><div class="num">@dotfiles/sync</div><h3>Dotfile sync</h3><p>Versioned in git. Encrypted with age. Restored across machines.</p></div>
        <div class="crd"><div class="num">@cloud/tailscale</div><h3>Tailscale mesh</h3><p>SSH everywhere. Zero open ports. Magic DNS pre-configured.</p></div>
        <div class="crd"><div class="num">@lang/rustup</div><h3>Rust toolchain</h3><p>Stable + nightly. Common crates pre-warmed in cache.</p></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>What people use it for</h2></div>
      <div class="gr2">
        <div class="crd"><h3 class="acc">Onboarding new hires in 6 minutes</h3><p>Hand them a fresh laptop, they run one curl command, and the entire team's toolchain is ready. Zero "why doesn't my X work" Slack messages.</p></div>
        <div class="crd"><h3 class="acc">Disposable cloud workstations</h3><p>Spin up a Hetzner box, apply your profile, ship a PR, destroy. Same env every time. Build cache survives via S3.</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>MIT · forever free</div></footer>
  `, a),

  // ============== QRCode — Tool ==============
  "Kr": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Generate</a><a>Brand</a><a>Bulk</a><a>Analytics</a><a>API</a></nav>
      <div class="nv-r"><button class="cta">Export all</button><div class="av">MV</div></div>
    </header>
    <section class="hero">
      <div class="eb">Privacy-first · client-side</div>
      <h1>Beautiful QR codes, <em>without the tracking middleman</em>.</h1>
      <p>Generate, brand, and analyze QR codes — all in your browser. Bulk operations, custom logos, on-device analytics.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Generator</h2><div class="m">Live preview</div></div>
      <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:24px">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div><div class="kpi-l" style="margin-bottom:6px">Content</div><div style="background:var(--bg2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-family:var(--mono);font-size:11px;color:var(--ink)">https://bana.work/products/kr</div></div>
          <div><div class="kpi-l" style="margin-bottom:6px">Style</div><div style="display:flex;gap:6px"><span class="pl live"><span class="d"></span>Dots</span><span class="pl">Squares</span><span class="pl">Rounded</span></div></div>
          <div><div class="kpi-l" style="margin-bottom:6px">Color</div><div style="display:flex;gap:8px"><div style="width:24px;height:24px;border-radius:5px;background:var(--accent);border:2px solid var(--ink)"></div><div style="width:24px;height:24px;border-radius:5px;background:#fff"></div><div style="width:24px;height:24px;border-radius:5px;background:#6db5ff"></div><div style="width:24px;height:24px;border-radius:5px;background:#ff5ba8"></div></div></div>
          <div><div class="kpi-l" style="margin-bottom:6px">Logo overlay</div><div style="background:var(--bg2);border:1px dashed var(--line);border-radius:8px;padding:18px;text-align:center;color:var(--dim);font-size:11px">drop a PNG/SVG here</div></div>
          <div><div class="kpi-l" style="margin-bottom:6px">Error correction</div><div style="display:flex;gap:6px"><span class="pl">L</span><span class="pl">M</span><span class="pl live"><span class="d"></span>Q</span><span class="pl">H</span></div></div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:32px;display:grid;place-items:center"><div style="width:240px;height:240px;background:#fff;border-radius:14px;display:grid;grid-template-columns:repeat(21,1fr);gap:1.5px;padding:18px">${(()=>{const f=(r,c)=>{const inFinder=(x,y)=>(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);if(inFinder(r,c)){const lr=r>13?20-r:r,lc=c>13?20-c:c,ar=r>13?r-14:r,ac=c>13?c-14:c;const er=Math.min(lr,ar<7?ar:6),ec=Math.min(lc,ac<7?ac:6);if(er===0||er===6||ec===0||ec===6)return 1;if(er>=2&&er<=4&&ec>=2&&ec<=4)return 1;return 0;}return ((r*7+c*11+r*c)%5<2)?1:0;};return Array(441).fill(0).map((_,i)=>{const r=Math.floor(i/21),c=i%21;return `<div style="background:${f(r,c)?'var(--accent)':'transparent'};border-radius:1px"></div>`}).join('')})()}</div></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Recent codes</h2><div class="m">Saved locally</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">qr-2026-0481</div><h3>Spring product launch</h3><p>4,287 scans · 12% conversion · campaign live</p></div>
        <div class="crd"><div class="num">qr-2026-0479</div><h3>Café menu — table cards</h3><p>1,840 scans · 64 unique tables · static</p></div>
        <div class="crd"><div class="num">qr-2026-0476</div><h3>Vendor onboarding</h3><p>132 scans · expires in 14 days · single-use</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>No servers, no telemetry, no kidding</div></footer>
  `, a),

  // ============== Olive — Productivity Suite ==============
  "Au": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Apps</a><a>Workspace</a><a>Roadmap</a><a>Pricing</a></nav>
      <div class="nv-r"><button class="cta">Try the demo</button></div>
    </header>
    <section class="hero">
      <div class="eb">Beta · 4,200 users</div>
      <h1>An <em>operating system</em> for the way you actually work.</h1>
      <p>Notes, tasks, files, AI, and your favorite tools — fused into a single windowed interface that runs in your browser. Local-first. Keyboard-driven.</p>
    </section>
    <section class="sec" style="background:var(--bg2);padding:40px 24px">
      <div style="background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:8px;box-shadow:0 30px 80px -20px rgba(0,0,0,.5)">
        <div style="display:flex;gap:6px;padding:8px 10px;border-bottom:1px solid var(--line)"><span style="width:10px;height:10px;border-radius:50%;background:#ff6b5b"></span><span style="width:10px;height:10px;border-radius:50%;background:#ffb547"></span><span style="width:10px;height:10px;border-radius:50%;background:#36e5c7"></span><div style="margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--dim)">Workspace · main</div></div>
        <div style="display:grid;grid-template-columns:180px 1fr;gap:0;min-height:240px">
          <aside style="border-right:1px solid var(--line);padding:14px;display:flex;flex-direction:column;gap:6px;font-size:12px"><div style="font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-bottom:4px">Apps</div><div style="padding:6px 8px;border-radius:5px;background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent)">⌘ Notes</div><div style="padding:6px 8px;color:var(--dim)">✓ Tasks</div><div style="padding:6px 8px;color:var(--dim)">▦ Files</div><div style="padding:6px 8px;color:var(--dim)">✦ AI Chat</div><div style="padding:6px 8px;color:var(--dim)">⌖ Calendar</div><div style="padding:6px 8px;color:var(--dim)">⊞ Mail</div></aside>
          <div style="padding:18px"><div style="font-family:var(--serif);font-style:italic;font-size:18px;margin-bottom:10px">Untitled note</div><div style="font-size:12px;color:var(--dim);line-height:1.7">The point of a workspace isn't more apps — it's <span style="background:color-mix(in oklab,var(--accent) 25%,transparent);color:var(--accent);padding:1px 4px;border-radius:3px">fewer transitions</span>. Notes link to tasks. Tasks reference files. Files open in place. Everything is searchable from one ⌘K.<br><br>The AI sees the whole context, not just the prompt.</div></div>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>What's inside</h2><div class="m">12 first-party apps</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">⌘ Notes</div><h3>Markdown, with backlinks</h3><p>Wiki-style. Daily notes. Block embeds. Vim mode if you swing that way.</p></div>
        <div class="crd"><div class="num">✓ Tasks</div><h3>GTD that doesn't suck</h3><p>Inbox, projects, contexts. Recurring with logic. Calendar overlay.</p></div>
        <div class="crd"><div class="num">▦ Files</div><h3>Drive in your browser</h3><p>Tag, search, version, share. End-to-end encrypted by default.</p></div>
        <div class="crd"><div class="num">✦ AI Chat</div><h3>Knows your workspace</h3><p>Draft replies from context. Summarize threads. Pick a model.</p></div>
        <div class="crd"><div class="num">⌖ Calendar</div><h3>Google + iCal + tasks</h3><p>One view. Block focus time. Auto-decline stupid meetings.</p></div>
        <div class="crd"><div class="num">⊞ Mail</div><h3>Email, finally calm</h3><p>Triage with keys. Snooze. Templates. AI rewrites if you want.</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>Made with patience</div></footer>
  `, a),

  // ============== Tow & Lift — Logistics Dispatch ==============
  "Tl": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Dispatch</a><a>Drivers</a><a>Map</a><a>Billing</a><a>Reports</a></nav>
      <div class="nv-r"><button class="cta">+ New job</button><div class="av">DK</div></div>
    </header>
    <section class="hero">
      <div class="eb">Live · 23 active jobs</div>
      <h1>Dispatch what's heavy, <em>where it's needed</em>.</h1>
      <p>On-demand towing and heavy-lift dispatch. Connect drivers and operators with the nearest verified service in real time.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Right now</h2><div class="m">Auto-refresh 30s</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Active jobs</span><span class="kpi-v">23</span><span class="kpi-c">+5 last hr</span></div>
        <div class="kpi"><span class="kpi-l">Drivers en route</span><span class="kpi-v">18</span><span class="kpi-c">avg ETA 12m</span></div>
        <div class="kpi"><span class="kpi-l">Available</span><span class="kpi-v">9</span><span class="kpi-c">across 4 zones</span></div>
        <div class="kpi"><span class="kpi-l">Today's revenue</span><span class="kpi-v">$8.4K</span><span class="kpi-c">+18% wow</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Live map</h2><div class="m">San Francisco Bay</div></div>
      <div style="position:relative;height:240px;background:linear-gradient(135deg,#1a1f2e,#0f1218);border:1px solid var(--line);border-radius:10px;overflow:hidden">
        <svg viewBox="0 0 600 240" style="position:absolute;inset:0;width:100%;height:100%;opacity:.4"><g stroke="rgba(255,255,255,.08)" fill="none" stroke-width="1"><path d="M0,80 Q200,40 400,90 T600,70"/><path d="M0,140 Q150,180 350,160 T600,180"/><path d="M0,200 Q200,170 400,200 T600,210"/><path d="M120,0 L150,240"/><path d="M280,0 L300,240"/><path d="M460,0 L450,240"/></g></svg>
        <div style="position:absolute;left:18%;top:30%;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 30%,transparent),0 0 14px var(--accent)"></div>
        <div style="position:absolute;left:42%;top:55%;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 30%,transparent),0 0 14px var(--accent)"></div>
        <div style="position:absolute;left:65%;top:38%;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 30%,transparent),0 0 14px var(--accent)"></div>
        <div style="position:absolute;left:78%;top:68%;width:14px;height:14px;border-radius:50%;background:#ffb547;box-shadow:0 0 0 4px rgba(255,181,71,.3),0 0 14px #ffb547"></div>
        <div style="position:absolute;left:30%;top:75%;width:14px;height:14px;border-radius:50%;background:#36e5c7;box-shadow:0 0 0 4px rgba(54,229,199,.3)"></div>
        <div style="position:absolute;left:55%;top:20%;width:14px;height:14px;border-radius:50%;background:#36e5c7;box-shadow:0 0 0 4px rgba(54,229,199,.3)"></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Active jobs</h2><div class="m">5 of 23</div></div>
      <table class="tbl">
        <thead><tr><th>Job</th><th>Driver</th><th>Vehicle</th><th>Pickup</th><th>Status</th><th>ETA</th></tr></thead>
        <tbody>
          <tr><td class="mono">JB-9012</td><td>M. Reyes</td><td>Heavy wrecker</td><td>I-880, mile 27</td><td><span class="pl live"><span class="d"></span>En route</span></td><td>4 min</td></tr>
          <tr><td class="mono">JB-9011</td><td>S. Park</td><td>Flatbed</td><td>Bay Bridge, EB</td><td><span class="pl live"><span class="d"></span>On scene</span></td><td>—</td></tr>
          <tr><td class="mono">JB-9010</td><td>A. Khan</td><td>Crane truck</td><td>Pier 39, lot D</td><td><span class="pl warn"><span class="d"></span>Loading</span></td><td>+18 min</td></tr>
          <tr><td class="mono">JB-9009</td><td>L. Martinez</td><td>Light wrecker</td><td>101, Golden Gate</td><td><span class="pl live"><span class="d"></span>En route</span></td><td>9 min</td></tr>
          <tr><td class="mono">JB-9008</td><td>D. Chen</td><td>Heavy wrecker</td><td>880 N, exit 32</td><td><span class="pl ok"><span class="d"></span>Returning</span></td><td>—</td></tr>
        </tbody>
      </table>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>Dispatching</div></footer>
  `, a),

  // ============== PugmarkHR — HR Dashboard ==============
  "Pu": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">People</a><a>Time</a><a>Payroll</a><a>Performance</a><a>Reports</a></nav>
      <div class="nv-r"><button class="cta">+ Hire</button><div class="av">RD</div></div>
    </header>
    <section class="hero">
      <div class="eb">All systems green · payroll Friday</div>
      <h1>234 people, <em>all in one place</em>.</h1>
      <p>Modern HRMS for growing teams. Employee lifecycle, attendance, payroll, and performance — built for companies that have outgrown spreadsheets.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>This week</h2><div class="m">May 4–10</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Headcount</span><span class="kpi-v">234</span><span class="kpi-c">+4 this mo</span></div>
        <div class="kpi"><span class="kpi-l">Attendance, today</span><span class="kpi-v">96.6%</span><span class="kpi-c">8 on leave</span></div>
        <div class="kpi"><span class="kpi-l">Payroll due</span><span class="kpi-v">$1.42M</span><span class="kpi-c">processes Fri</span></div>
        <div class="kpi"><span class="kpi-l">Reviews open</span><span class="kpi-v">37</span><span class="kpi-c">Q2 cycle</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Recently joined</h2><div class="m">Last 30 days</div></div>
      <div class="gr3">
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">PA</div><div><h3>Priya Anand</h3><p>Product · started Apr 28</p></div></div>
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">JT</div><div><h3>Jamal Thomas</h3><p>Engineering · Apr 21</p></div></div>
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">MO</div><div><h3>Maya Okafor</h3><p>Design · Apr 15</p></div></div>
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">RK</div><div><h3>Ravi Kapoor</h3><p>Sales · Apr 10</p></div></div>
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">SC</div><div><h3>Sara Chen</h3><p>Finance · Apr 7</p></div></div>
        <div class="crd" style="display:flex;gap:12px;align-items:center"><div class="av" style="width:38px;height:38px;font-size:13px">DM</div><div><h3>Diego Marin</h3><p>Engineering · Apr 1</p></div></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Today's leave</h2><div class="m">8 people</div></div>
      <table class="tbl">
        <thead><tr><th>Person</th><th>Team</th><th>Type</th><th>Returns</th></tr></thead>
        <tbody>
          <tr><td>A. Joshi</td><td>Engineering</td><td><span class="pl ok">Vacation</span></td><td>May 12</td></tr>
          <tr><td>L. Romero</td><td>Sales</td><td><span class="pl">Sick</span></td><td>May 5</td></tr>
          <tr><td>K. Suzuki</td><td>Operations</td><td><span class="pl ok">Vacation</span></td><td>May 8</td></tr>
          <tr><td>P. Nilsson</td><td>Design</td><td><span class="pl warn">Parental</span></td><td>Jun 30</td></tr>
          <tr><td>M. Bauer</td><td>Engineering</td><td><span class="pl">WFH</span></td><td>—</td></tr>
        </tbody>
      </table>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>SOC 2 · GDPR · ISO 27001</div></footer>
  `, a),

  // ============== EPC Workspace — Construction ==============
  "Es": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Projects</a><a>Drawings</a><a>RFIs</a><a>Submittals</a><a>Schedule</a></nav>
      <div class="nv-r"><button class="cta">+ Project</button><div class="av">SK</div></div>
    </header>
    <section class="hero">
      <div class="eb">12 active projects · 0 lost emails</div>
      <h1>Engineering, procurement, and construction — <em>without the chaos</em>.</h1>
      <p>One workspace for drawings, RFIs, submittals, and schedules. Stop chasing the latest revision in your inbox.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Portfolio</h2><div class="m">$847M total contract value</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Active projects</span><span class="kpi-v">12</span><span class="kpi-c">3 in commissioning</span></div>
        <div class="kpi"><span class="kpi-l">Drawings live</span><span class="kpi-v">8,471</span><span class="kpi-c">412 this wk</span></div>
        <div class="kpi"><span class="kpi-l">Open RFIs</span><span class="kpi-v">63</span><span class="kpi-c">avg age 2.4 d</span></div>
        <div class="kpi"><span class="kpi-l">Schedule health</span><span class="kpi-v">A−</span><span class="kpi-c">2 critical</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Active projects</h2><div class="m">Sorted by phase</div></div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 90px 90px 110px;gap:14px;align-items:center"><div><h3>Solar farm — West Texas, Phase II</h3><div class="num" style="margin:0;margin-top:4px">EPC-2026-014 · $182M · 84 MW</div></div><span class="pl live"><span class="d"></span>Construction</span><span class="pl">76% done</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">due Q1 2027</div></div><div class="bar"><span style="width:76%"></span></div></div>
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 90px 90px 110px;gap:14px;align-items:center"><div><h3>Data center retrofit — Frankfurt</h3><div class="num" style="margin:0;margin-top:4px">EPC-2026-011 · €94M · 12 MW IT load</div></div><span class="pl live"><span class="d"></span>Procurement</span><span class="pl">42% done</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">due Aug 2026</div></div><div class="bar"><span style="width:42%"></span></div></div>
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 90px 90px 110px;gap:14px;align-items:center"><div><h3>Refinery debottlenecking — Jamnagar</h3><div class="num" style="margin:0;margin-top:4px">EPC-2026-009 · $76M · brownfield</div></div><span class="pl ok"><span class="d"></span>Engineering</span><span class="pl">19% done</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">due Q4 2026</div></div><div class="bar"><span style="width:19%"></span></div></div>
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 90px 90px 110px;gap:14px;align-items:center"><div><h3>Wastewater treatment — Lagos</h3><div class="num" style="margin:0;margin-top:4px">EPC-2025-024 · $48M · 60 MLD</div></div><span class="pl warn"><span class="d"></span>Commissioning</span><span class="pl">94% done</span><div style="font-family:var(--mono);font-size:11px;color:var(--dim)">due May 2026</div></div><div class="bar"><span style="width:94%"></span></div></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Latest RFIs</h2><div class="m">Last 24h</div></div>
      <table class="tbl">
        <thead><tr><th>RFI</th><th>Project</th><th>Subject</th><th>From</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td class="mono">RFI-1182</td><td>Solar TX-II</td><td>Inverter pad rebar spacing — sheet S-204</td><td>Foundations sub</td><td><span class="pl warn">2d open</span></td></tr>
          <tr><td class="mono">RFI-1181</td><td>Frankfurt DC</td><td>Cold-aisle clearance, Hall B</td><td>MEP lead</td><td><span class="pl live">Drafting</span></td></tr>
          <tr><td class="mono">RFI-1180</td><td>Jamnagar</td><td>Pipe spec mismatch, line 14"-CS-201</td><td>Piping</td><td><span class="pl">Resolved</span></td></tr>
          <tr><td class="mono">RFI-1179</td><td>Lagos WWTP</td><td>Final inspection punch-list closure</td><td>QA</td><td><span class="pl ok">Closed</span></td></tr>
        </tbody>
      </table>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>ISO 19650 compliant</div></footer>
  `, a),

  // ============== Starboard Os — Maritime / Fleet ==============
  "Os": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Fleet</a><a>Voyages</a><a>Crew</a><a>Harbors</a><a>Compliance</a></nav>
      <div class="nv-r"><button class="cta">+ Voyage</button><div class="av">CN</div></div>
    </header>
    <section class="hero">
      <div class="eb">36 vessels at sea · all systems nominal</div>
      <h1>The operational backbone for fleets <em>at sea</em>.</h1>
      <p>Voyage planning, crew rotation, harbor logistics, and compliance — for shipping lines and offshore operators who outgrew spreadsheets.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Fleet status</h2><div class="m">Live · refreshes every 60 s</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Vessels at sea</span><span class="kpi-v">36</span><span class="kpi-c">+2 sailing today</span></div>
        <div class="kpi"><span class="kpi-l">In port</span><span class="kpi-v">8</span><span class="kpi-c">avg dwell 18 h</span></div>
        <div class="kpi"><span class="kpi-l">On-time arrival</span><span class="kpi-v">94%</span><span class="kpi-c">+3 pp QoQ</span></div>
        <div class="kpi"><span class="kpi-l">Fuel efficiency</span><span class="kpi-v">−6.2%</span><span class="kpi-c">vs route baseline</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Active voyages</h2><div class="m">Sorted by ETA</div></div>
      <table class="tbl">
        <thead><tr><th>Vessel</th><th>Route</th><th>ETA</th><th>Crew</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><strong>MV Halcyon</strong><div class="num" style="margin:0">IMO 9842117 · Bulk carrier</div></td><td>Singapore → Rotterdam</td><td>May 21, 04:30 UTC</td><td>22 / 22</td><td><span class="pl live"><span class="d"></span>On schedule</span></td></tr>
          <tr><td><strong>MV Northwind</strong><div class="num" style="margin:0">IMO 9756430 · Container</div></td><td>Long Beach → Yokohama</td><td>May 18, 11:00 UTC</td><td>19 / 20</td><td><span class="pl warn"><span class="d"></span>Weather hold</span></td></tr>
          <tr><td><strong>MV Astrolabe</strong><div class="num" style="margin:0">IMO 9618224 · Tanker</div></td><td>Fujairah → Houston</td><td>May 26, 16:45 UTC</td><td>24 / 24</td><td><span class="pl live"><span class="d"></span>Underway</span></td></tr>
          <tr><td><strong>MV Compass</strong><div class="num" style="margin:0">IMO 9491203 · RoRo</div></td><td>Hamburg → Halifax</td><td>May 19, 09:15 UTC</td><td>18 / 18</td><td><span class="pl ok"><span class="d"></span>Approaching</span></td></tr>
        </tbody>
      </table>
    </section>
    <section class="sec">
      <div class="sh"><h2>Crew rotation — next 7 days</h2><div class="m">3 sign-ons · 2 sign-offs</div></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 120px 110px;gap:14px;align-items:center"><div><h3>Capt. Mireille Okafor — sign-on</h3><div class="num" style="margin:0;margin-top:4px">MV Halcyon · 4-month rotation · BLR→SIN</div></div><span class="pl">May 19</span><span class="pl live"><span class="d"></span>Visa cleared</span></div></div>
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 120px 110px;gap:14px;align-items:center"><div><h3>2nd Eng. Davide Russo — sign-off</h3><div class="num" style="margin:0;margin-top:4px">MV Northwind · medical leave · YOK→FCO</div></div><span class="pl">May 20</span><span class="pl warn"><span class="d"></span>Repat pending</span></div></div>
        <div class="crd"><div style="display:grid;grid-template-columns:1fr 120px 110px;gap:14px;align-items:center"><div><h3>AB Tomás Linares — sign-on</h3><div class="num" style="margin:0;margin-top:4px">MV Astrolabe · 6-month rotation · SCL→DXB</div></div><span class="pl">May 24</span><span class="pl live"><span class="d"></span>In transit</span></div></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>SOLAS · MARPOL · MLC 2006</div></footer>
  `, a),

  // ============== Medical Hub — Clinic Operations ==============
  "Hg": (s, p, a) => mockShell(`
    <header class="nv">
      <div class="nv-l"><span class="s">${s}</span>${p.name}</div>
      <nav class="nv-m"><a class="act">Today</a><a>Patients</a><a>Prescriptions</a><a>Billing</a><a>Sites</a></nav>
      <div class="nv-r"><button class="cta">+ Walk-in</button><div class="av">SR</div></div>
    </header>
    <section class="hero">
      <div class="eb">3 sites · 6 doctors · 47 appts today</div>
      <h1>Your clinic, <em>one screen</em>.</h1>
      <p>Front desk, doctors and billing on the same patient at the same time. Appointments, prescriptions and invoicing in one record.</p>
    </section>
    <section class="sec">
      <div class="sh"><h2>Today · Indiranagar branch</h2><div class="m">Updated just now</div></div>
      <div class="kpis">
        <div class="kpi"><span class="kpi-l">Appointments</span><span class="kpi-v">47</span><span class="kpi-c">3 walk-ins</span></div>
        <div class="kpi"><span class="kpi-l">Avg wait</span><span class="kpi-v">12 min</span><span class="kpi-c">-4 min vs avg</span></div>
        <div class="kpi"><span class="kpi-l">Revenue</span><span class="kpi-v">₹1.84L</span><span class="kpi-c">+9% wk</span></div>
        <div class="kpi"><span class="kpi-l">Pending claims</span><span class="kpi-v">8</span><span class="kpi-c dn">2 over 30d</span></div>
      </div>
    </section>
    <section class="sec">
      <div class="sh"><h2>Now consulting</h2><div class="m">Live queue · 8 in waiting room</div></div>
      <table class="tbl">
        <thead><tr><th>Patient</th><th>Doctor</th><th>Reason</th><th>Booked</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><strong>Ananya Reddy</strong><div class="num" style="margin:0">PT-19284 · 34F · Returning</div></td><td>Dr. Iyer</td><td>Follow-up · BP review</td><td class="mono">10:30</td><td><span class="pl live"><span class="d"></span>In consult</span></td></tr>
          <tr><td><strong>Vikram Joshi</strong><div class="num" style="margin:0">PT-19285 · 51M · New</div></td><td>Dr. Sharma</td><td>General consult</td><td class="mono">10:45</td><td><span class="pl warn"><span class="d"></span>Waiting · 8 min</span></td></tr>
          <tr><td><strong>Maya Cherian</strong><div class="num" style="margin:0">PT-04221 · 28F · Returning</div></td><td>Dr. Iyer</td><td>Endocrine review</td><td class="mono">11:00</td><td><span class="pl ok"><span class="d"></span>Checked in</span></td></tr>
          <tr><td><strong>Rahul Pillai</strong><div class="num" style="margin:0">PT-08813 · 42M · Returning</div></td><td>Dr. Khan</td><td>Skin · biopsy result</td><td class="mono">11:00</td><td><span class="pl ok"><span class="d"></span>Checked in</span></td></tr>
          <tr><td><strong>Nikhil Bose</strong><div class="num" style="margin:0">PT-19286 · 9M · New</div></td><td>Dr. Khan</td><td>Pediatric · cough</td><td class="mono">11:15</td><td><span class="pl"><span class="d"></span>Booked</span></td></tr>
          <tr><td><strong>Lakshmi Rao</strong><div class="num" style="margin:0">PT-12044 · 67F · Returning</div></td><td>Dr. Sharma</td><td>Cardiology follow-up</td><td class="mono">11:30</td><td><span class="pl"><span class="d"></span>Booked</span></td></tr>
          <tr><td><strong>Imran Sayeed</strong><div class="num" style="margin:0">PT-19287 · 39M · New</div></td><td>Dr. Iyer</td><td>Walk-in · back pain</td><td class="mono">walk-in</td><td><span class="pl warn"><span class="d"></span>Triage</span></td></tr>
        </tbody>
      </table>
    </section>
    <section class="sec">
      <div class="sh"><h2>Sites at a glance</h2><div class="m">Across 3 branches</div></div>
      <div class="gr3">
        <div class="crd"><div class="num">01 · Indiranagar</div><h3>47 appts · 6 docs</h3><p>Avg wait 12 min · revenue ₹1.84L · 2 walk-ins waiting.</p></div>
        <div class="crd"><div class="num">02 · Koramangala</div><h3>32 appts · 4 docs</h3><p>Avg wait 8 min · revenue ₹1.22L · all on schedule.</p></div>
        <div class="crd"><div class="num">03 · HSR Layout</div><h3>21 appts · 3 docs</h3><p>Avg wait 5 min · revenue ₹0.74L · 1 doc out, covered.</p></div>
      </div>
    </section>
    <footer class="ftr"><div>${p.name} · ${p.category}</div><div>HIPAA-aligned · DPDP-ready · v2.1.0</div></footer>
  `, a)
};

export { mockShell, MOCKS }
