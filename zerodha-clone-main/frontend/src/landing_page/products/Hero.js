import React from "react";

const TICKS = [
  { sym: "AAPL", val: "189.23", d: "+1.24%", up: true },
  { sym: "TSLA", val: "248.50", d: "-0.87%", up: false },
  { sym: "NVDA", val: "875.40", d: "+3.12%", up: true },
  { sym: "MSFT", val: "415.80", d: "+0.56%", up: true },
  { sym: "AMZN", val: "185.90", d: "-0.34%", up: false },
  { sym: "META", val: "508.20", d: "+2.18%", up: true },
  { sym: "GOOG", val: "171.40", d: "+0.91%", up: true },
  { sym: "SPY", val: "512.30", d: "+0.43%", up: true },
  { sym: "BTC", val: "68,420", d: "+2.55%", up: true },
  { sym: "ETH", val: "3,821", d: "-1.10%", up: false },
];

const STATS = [
  { val: "99.99%", lbl: "Uptime" },
  { val: "< 2ms", lbl: "Latency" },
  { val: "140+", lbl: "Markets" },
  { val: "SOC 2", lbl: "Certified" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .hero-wrap {
    background: #ffffff;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 3rem 3rem 2rem;
    font-family: 'DM Sans', sans-serif;
  }
  .hero-wrap * { box-sizing: border-box; }

  .grid-lines {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .glow-orb {
    position: absolute;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%);
    top: -200px; right: -150px; pointer-events: none;
  }

  .ticker-bar {
    display: flex; overflow: hidden;
    border-top: 1px solid rgba(0,0,0,0.07);
    border-bottom: 1px solid rgba(0,0,0,0.07);
    background: #f9fafb;
    margin-bottom: 3rem;
    mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
  }
  .ticker-track {
    display: flex; gap: 2.5rem;
    padding: 0.55rem 0;
    animation: hero-ticker 22s linear infinite;
    white-space: nowrap; flex-shrink: 0;
  }
  @keyframes hero-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .tick-item {
    display: flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.03em;
  }
  .tick-sym { color: rgba(0,0,0,0.38); font-weight: 500; }
  .tick-val { color: rgba(0,0,0,0.72); }
  .tick-up  { color: #059669; }
  .tick-dn  { color: #dc2626; }
  .tick-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(0,0,0,0.1); }

  .hero-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.18em;
    color: rgba(0,0,0,0.32);
    text-transform: uppercase;
    margin-bottom: 1.25rem;
    display: flex; align-items: center; gap: 8px;
  }
  .hero-label::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: rgba(0,0,0,0.18);
  }

  .hero-h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 400;
    line-height: 1.0;
    color: #0a0a0f;
    letter-spacing: -0.02em;
    margin: 0 0 0.2em;
  }
  .hero-h1 em {
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(0,0,0,0.22);
  }

  .hero-sub {
    font-size: 15px; font-weight: 300;
    color: rgba(0,0,0,0.46);
    margin: 1.25rem 0 2rem;
    max-width: 400px;
    line-height: 1.65; letter-spacing: 0.01em;
  }

  .hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #0a0a0f; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.01em;
    padding: 0.7rem 1.5rem;
    border-radius: 4px; border: none; cursor: pointer; text-decoration: none;
    transition: opacity 0.15s, transform 0.15s;
  }
  .btn-primary:hover { opacity: 0.82; transform: translateY(-1px); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    background: transparent;
    color: rgba(0,0,0,0.38);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 400; letter-spacing: 0.01em;
    padding: 0; border: none; cursor: pointer; text-decoration: none;
    transition: color 0.15s;
  }
  .btn-ghost:hover { color: rgba(0,0,0,0.78); }
  .btn-ghost:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { display: inline-block; transition: transform 0.15s; }

  .stats-row {
    display: flex; gap: 2.5rem;
    margin-top: 3rem; padding-top: 2rem;
    border-top: 1px solid rgba(0,0,0,0.07);
  }
  .stat { display: flex; flex-direction: column; gap: 3px; }
  .stat-val {
    font-family: 'DM Mono', monospace;
    font-size: 18px; font-weight: 500;
    color: #0a0a0f; letter-spacing: -0.02em;
  }
  .stat-lbl {
    font-size: 11px; color: rgba(0,0,0,0.28);
    letter-spacing: 0.06em; text-transform: uppercase;
  }
`;

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M2.5 6.5h8M6.5 2.5l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero = () => {
  const doubled = [...TICKS, ...TICKS];

  return (
    <>
      <style>{styles}</style>
      <div className="hero-wrap">
        <div className="grid-lines" />
        <div className="glow-orb" />

        <div className="ticker-bar">
          <div className="ticker-track">
            {doubled.map((t, i) => (
              <React.Fragment key={i}>
                <span className="tick-item">
                  <span className="tick-sym">{t.sym}</span>
                  <span className="tick-val">{t.val}</span>
                  <span className={t.up ? "tick-up" : "tick-dn"}>{t.d}</span>
                </span>
                <span className="tick-dot" />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-label">Infrastructure</div>

        <h1 className="hero-h1">
          Trading
          <br />
          <em>Technology</em>
        </h1>

        <p className="hero-sub">
          Sleek, modern, and intuitive platforms built for the speed of modern
          markets.
        </p>

        <div className="hero-actions">
          <a href="#" className="btn-primary">
            View offerings <ArrowRight />
          </a>
          <a href="#" className="btn-ghost">
            See documentation <span className="btn-arrow">→</span>
          </a>
        </div>

        <div className="stats-row">
          {STATS.map((s) => (
            <div className="stat" key={s.lbl}>
              <span className="stat-val">{s.val}</span>
              <span className="stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
