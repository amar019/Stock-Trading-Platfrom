import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "1.5Cr+", label: "Clients Registered" },
  { value: "₹0", label: "Account Opening Fee" },
  { value: "₹20", label: "Flat Per Trade" },
  { value: "#1", label: "Stockbroker in India" },
];

const FEATURES = [
  { icon: "⚡", text: "Instant KYC with Aadhaar" },
  { icon: "📊", text: "Advanced Charting Tools" },
  { icon: "🔒", text: "SEBI Registered Broker" },
  { icon: "📱", text: "Award-winning Kite App" },
];

const floatingAssets = [
  {
    symbol: "RELIANCE",
    change: "+1.24%",
    positive: true,
    top: "12%",
    left: "3%",
    delay: "0s",
  },
  {
    symbol: "TCS",
    change: "-0.38%",
    positive: false,
    top: "70%",
    left: "1%",
    delay: "0.4s",
  },
  {
    symbol: "NIFTY 50",
    change: "+0.91%",
    positive: true,
    top: "30%",
    left: "88%",
    delay: "0.8s",
  },
  {
    symbol: "HDFC BANK",
    change: "+2.10%",
    positive: true,
    top: "78%",
    left: "85%",
    delay: "1.2s",
  },
];

export default function OpenAccount() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const targets = [150, 0, 20, 1];
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters(targets.map((t) => Math.round((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .oa-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 56px 24px;
        }

        /* Subtle dot-grid background */
        .oa-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.6;
          z-index: 0;
        }

        /* Soft gradient blobs */
        .oa-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
          z-index: 0;
          pointer-events: none;
        }
        .oa-blob-1 {
          width: 500px; height: 500px;
          background: #387ed1;
          top: -120px; left: -180px;
          animation: blobDrift 12s ease-in-out infinite alternate;
        }
        .oa-blob-2 {
          width: 400px; height: 400px;
          background: #10b981;
          bottom: -80px; right: -120px;
          animation: blobDrift 15s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        .oa-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        /* ─── LEFT PANEL ─── */
        .oa-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .oa-left.show {
          opacity: 1;
          transform: translateX(0);
        }

        .oa-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .oa-badge .dot {
          width: 7px; height: 7px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.5; }
        }

        .oa-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 2.8vw, 36px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
        }
        .oa-headline .accent {
          color: #387ed1;
          position: relative;
        }
        .oa-headline .accent::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #387ed1, #10b981);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s ease 0.6s;
        }
        .oa-left.show .accent::after {
          transform: scaleX(1);
        }

        .oa-sub {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 14px 0 24px;
          font-weight: 300;
          max-width: 400px;
        }
        .oa-sub strong {
          color: #0f172a;
          font-weight: 500;
        }

        /* Features list */
        .oa-features {
          list-style: none;
          padding: 0; margin: 0 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .oa-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #374151;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .oa-feature-item.show {
          opacity: 1;
          transform: translateY(0);
        }
        .oa-feature-icon {
          width: 26px; height: 26px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        /* CTA button */
        .oa-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #387ed1;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 10px;
          padding: 11px 24px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 6px 18px rgba(56,126,209,0.28);
        }
        .oa-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .oa-cta-btn:hover::before { opacity: 1; }
        .oa-cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 36px rgba(56,126,209,0.38);
        }
        .oa-cta-btn:active { transform: translateY(0) scale(0.98); }
        .oa-cta-btn .arrow {
          transition: transform 0.3s ease;
        }
        .oa-cta-btn:hover .arrow { transform: translateX(5px); }

        .oa-trust {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 11px;
          color: #94a3b8;
        }
        .oa-trust svg { color: #22c55e; }

        /* ─── RIGHT PANEL ─── */
        .oa-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .oa-right.show {
          opacity: 1;
          transform: translateX(0);
        }

        /* Stats grid */
        .oa-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .oa-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 14px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        .oa-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(56,126,209,0.12);
          border-color: #387ed1;
        }
        .oa-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .oa-stat-label {
          font-size: 10px;
          color: #94a3b8;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Market card */
        .oa-market-card {
          background: #0f172a;
          border-radius: 14px;
          padding: 16px 18px;
          box-shadow: 0 4px 20px rgba(15,23,42,0.12);
        }
        .oa-market-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .oa-market-title {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .oa-market-live {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #22c55e;
        }
        .oa-market-live .ldot {
          width: 6px; height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .oa-tickers {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .oa-ticker-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.2s;
        }
        .oa-ticker-row:hover { background: rgba(255,255,255,0.09); }
        .oa-ticker-symbol {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          color: #f1f5f9;
          font-weight: 600;
        }
        .oa-ticker-bar {
          flex: 1;
          margin: 0 10px;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .oa-ticker-fill {
          height: 100%;
          border-radius: 2px;
          animation: fillBar 2s ease forwards;
        }
        @keyframes fillBar {
          from { width: 0; }
        }
        .oa-ticker-change {
          font-size: 10.5px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 5px;
        }
        .oa-ticker-change.pos { color: #22c55e; background: rgba(34,197,94,0.12); }
        .oa-ticker-change.neg { color: #f87171; background: rgba(248,113,113,0.12); }

        /* Mini sparkline SVG */
        .oa-sparkline { display: block; }

        /* Floating chips */
        .oa-float-chip {
          position: absolute;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 11.5px;
          font-weight: 500;
          color: #374151;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 6px;
          animation: chipFloat 6s ease-in-out infinite;
          z-index: 1;
          white-space: nowrap;
        }
        @keyframes chipFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .oa-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .oa-float-chip { display: none; }
          .oa-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="oa-root" ref={sectionRef}>
        {/* Blobs */}
        <div className="oa-blob oa-blob-1" />
        <div className="oa-blob oa-blob-2" />

        {/* Floating chips */}
        {floatingAssets.map((a, i) => (
          <div
            key={i}
            className="oa-float-chip"
            style={{
              top: a.top,
              left: a.left,
              animationDelay: a.delay,
              animationDuration: `${5 + i}s`,
            }}
          >
            <span>{a.symbol}</span>
            <span
              style={{
                color: a.positive ? "#22c55e" : "#f87171",
                fontWeight: 700,
              }}
            >
              {a.change}
            </span>
          </div>
        ))}

        <div className="oa-wrapper">
          {/* ── LEFT ── */}
          <div className={`oa-left ${visible ? "show" : ""}`}>
            <div className="oa-badge">
              <span className="dot" />
              Markets Open
            </div>

            <h2 className="oa-headline">
              Open a <span className="accent">Zerodha</span>
              <br />
              Account Today
            </h2>

            <p className="oa-sub">
              Modern platforms and apps, <strong>₹0 account opening</strong>,
              and a flat <strong>₹20 per trade</strong> on intraday &amp;
              F&amp;O. Join India's largest retail stockbroker.
            </p>

            <ul className="oa-features">
              {FEATURES.map((f, i) => (
                <li
                  key={i}
                  className={`oa-feature-item ${visible ? "show" : ""}`}
                  style={{ transitionDelay: `${0.4 + i * 0.12}s` }}
                >
                  <div className="oa-feature-icon">{f.icon}</div>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <button
              className="oa-cta-btn"
              onClick={() => navigate("/signup")}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Sign Up Now — It's Free
              <span className="arrow">→</span>
            </button>

            <div className="oa-trust">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              256-bit SSL encrypted · SEBI Registered · BSE &amp; NSE Member
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className={`oa-right ${visible ? "show" : ""}`}>
            {/* Stat Cards */}
            <div className="oa-stats">
              {STATS.map((s, i) => (
                <div className="oa-stat-card" key={i}>
                  <div className="oa-stat-value">
                    {i === 0
                      ? `${counters[0] >= 150 ? "1.5Cr" : counters[0] + "L"}+`
                      : i === 1
                        ? "₹0"
                        : i === 2
                          ? `₹${counters[2]}`
                          : "#1"}
                  </div>
                  <div className="oa-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Live Market Card */}
            <div className="oa-market-card">
              <div className="oa-market-header">
                <span className="oa-market-title">Live Market</span>
                <span className="oa-market-live">
                  <span className="ldot" /> Live
                </span>
              </div>

              {/* Mini SVG sparkline */}
              <svg
                width="100%"
                height="48"
                viewBox="0 0 400 48"
                className="oa-sparkline"
                style={{ marginBottom: 16 }}
              >
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#387ed1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#387ed1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 38 C40 35, 60 28, 90 30 S140 20, 170 18 S220 24, 250 15 S300 8, 330 12 S370 6, 400 4"
                  fill="none"
                  stroke="#387ed1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 600,
                    strokeDashoffset: visible ? 0 : 600,
                    transition: "stroke-dashoffset 2s ease 0.5s",
                  }}
                />
                <path
                  d="M0 38 C40 35, 60 28, 90 30 S140 20, 170 18 S220 24, 250 15 S300 8, 330 12 S370 6, 400 4 L400 48 L0 48 Z"
                  fill="url(#sg)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 1s ease 1.5s",
                  }}
                />
              </svg>

              <div className="oa-tickers">
                {[
                  {
                    sym: "NIFTY 50",
                    val: "22,450.30",
                    chg: "+0.91%",
                    pos: true,
                    w: "78%",
                  },
                  {
                    sym: "SENSEX",
                    val: "74,119.45",
                    chg: "+0.74%",
                    pos: true,
                    w: "62%",
                  },
                  {
                    sym: "BANKNIFTY",
                    val: "48,302.10",
                    chg: "-0.28%",
                    pos: false,
                    w: "35%",
                  },
                ].map((t, i) => (
                  <div className="oa-ticker-row" key={i}>
                    <span className="oa-ticker-symbol">{t.sym}</span>
                    <div className="oa-ticker-bar">
                      <div
                        className="oa-ticker-fill"
                        style={{
                          width: visible ? t.w : "0%",
                          background: t.pos
                            ? "linear-gradient(90deg,#22c55e,#86efac)"
                            : "linear-gradient(90deg,#f87171,#fca5a5)",
                          transition: `width 1.2s ease ${0.8 + i * 0.2}s`,
                        }}
                      />
                    </div>
                    <span
                      className={`oa-ticker-change ${t.pos ? "pos" : "neg"}`}
                    >
                      {t.chg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
