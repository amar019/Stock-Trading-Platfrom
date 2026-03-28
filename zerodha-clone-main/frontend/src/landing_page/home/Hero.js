import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const tickers = [
  { symbol: "RELIANCE", price: "2,847.30", change: "+1.24%", up: true },
  { symbol: "TCS", price: "3,912.75", change: "+0.87%", up: true },
  { symbol: "INFY", price: "1,543.20", change: "-0.43%", up: false },
  { symbol: "HDFC", price: "1,678.90", change: "+2.11%", up: true },
  { symbol: "WIPRO", price: "456.80", change: "-0.92%", up: false },
  { symbol: "NIFTY 50", price: "22,147.00", change: "+0.67%", up: true },
  { symbol: "SENSEX", price: "73,088.33", change: "+0.54%", up: true },
  { symbol: "BAJFINANCE", price: "6,732.45", change: "+1.87%", up: true },
];

const floatingCards = [
  { icon: "📈", label: "Stocks", color: "#dcfce7", accent: "#16a34a" },
  { icon: "🔄", label: "F&O", color: "#dbeafe", accent: "#2563eb" },
  { icon: "💼", label: "Mutual Funds", color: "#fef9c3", accent: "#ca8a04" },
  { icon: "🌍", label: "Currencies", color: "#fce7f3", accent: "#db2777" },
  { icon: "🛢️", label: "Commodities", color: "#ede9fe", accent: "#7c3aed" },
  { icon: "📊", label: "ETFs", color: "#ffedd5", accent: "#ea580c" },
];

const stats = [
  { value: "1.5Cr+", label: "Registered Users" },
  { value: "₹0", label: "Account Opening Fee" },
  { value: "4M+", label: "Daily Orders" },
  { value: "15+", label: "Asset Classes" },
];

function SparkLine({ up }) { // eslint-disable-line no-unused-vars
  const points = up
    ? "0,40 15,35 30,38 45,25 60,20 75,15 90,10 105,5"
    : "0,10 15,15 30,12 45,22 60,28 75,32 90,38 105,42";
  return (
    <svg width="60" height="28" viewBox="0 0 105 50" fill="none">
      <polyline
        points={points}
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          overflow: hidden;
          min-height: auto;
          position: relative;
        }

        /* ─── Ticker Bar ─── */
        .ticker-bar {
          background: #0f172a;
          padding: 10px 0;
          overflow: hidden;
          position: relative;
        }
        .ticker-bar::before, .ticker-bar::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker-bar::before { left: 0; background: linear-gradient(to right, #0f172a, transparent); }
        .ticker-bar::after { right: 0; background: linear-gradient(to left, #0f172a, transparent); }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker 28s linear infinite;
          width: max-content;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          border-right: 1px solid rgba(255,255,255,0.08);
          white-space: nowrap;
        }
        .ticker-symbol { color: #94a3b8; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
        .ticker-price { color: #f1f5f9; font-size: 12px; font-weight: 500; font-family: 'Syne', sans-serif; }
        .ticker-change { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 4px; }
        .ticker-up { color: #4ade80; background: rgba(74,222,128,0.12); }
        .ticker-dn { color: #f87171; background: rgba(248,113,113,0.12); }

        /* ─── Hero Layout ─── */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          align-items: center;
          gap: 40px;
        }

        /* ─── Left Column ─── */
        .hero-left {
          padding: 48px 0;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 10px;
          font-weight: 600;
          padding: 4px 11px;
          border-radius: 100px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-badge.show { opacity: 1; transform: translateY(0); }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #16a34a;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 800;
          line-height: 1.08;
          color: #0f172a;
          margin: 0 0 14px 0;
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }
        .hero-heading.show { opacity: 1; transform: translateY(0); }
        .heading-accent {
          position: relative;
          color: #16a34a;
          display: inline-block;
        }
        .heading-accent::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 4px;
          height: 4px;
          background: #bbf7d0;
          border-radius: 2px;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s cubic-bezier(0.16,1,0.3,1) 0.7s;
        }
        .heading-accent.show::after { transform: scaleX(1); }

        .hero-sub {
          font-size: 14px;
          color: #64748b;
          line-height: 1.65;
          margin: 0 0 24px 0;
          max-width: 420px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s;
        }
        .hero-sub.show { opacity: 1; transform: translateY(0); }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s;
        }
        .hero-cta-row.show { opacity: 1; transform: translateY(0); }

        .btn-primary-hero {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #16a34a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 11px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(22,163,74,0.35);
          letter-spacing: 0.02em;
        }
        .btn-primary-hero::before {
          content: '';
          position: absolute;
          top: -100%; left: -60%;
          width: 60%; height: 300%;
          background: rgba(255,255,255,0.18);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .btn-primary-hero:hover::before { left: 130%; }
        .btn-primary-hero:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(22,163,74,0.45);
        }
        .btn-arrow {
          transition: transform 0.2s;
          display: inline-block;
        }
        .btn-primary-hero:hover .btn-arrow { transform: translateX(4px); }

        .btn-secondary-hero {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          color: #0f172a;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary-hero:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        /* ─── Stats ─── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s;
        }
        .stats-row.show { opacity: 1; transform: translateY(0); }
        .stat-cell {
          padding: 14px 10px;
          text-align: center;
          border-right: 1.5px solid #e2e8f0;
          background: #ffffff;
          transition: background 0.2s;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-cell:hover { background: #f8fafc; }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          display: block;
        }
        .stat-label { font-size: 10px; color: #94a3b8; font-weight: 500; letter-spacing: 0.04em; }

        /* ─── Right Column ─── */
        .hero-right {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Central orbit */
        .orbit-container {
          position: relative;
          width: 240px;
          height: 240px;
          opacity: 0;
          transform: scale(0.92);
          transition: all 1s cubic-bezier(0.16,1,0.3,1) 0.4s;
        }
        .orbit-container.show { opacity: 1; transform: scale(1); }

        .orbit-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orbit-core {
          width: 80px; height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          box-shadow: 0 12px 40px rgba(15,23,42,0.3);
          position: relative;
          z-index: 5;
        }
        .orbit-core-icon { font-size: 22px; }
        .orbit-core-text {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .orbit-ring {
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          border: 1.5px dashed #e2e8f0;
          animation: spin-ring 20s linear infinite;
        }
        .orbit-ring-2 {
          inset: -80px;
          animation-duration: 30s;
          animation-direction: reverse;
          border-style: dotted;
          border-color: #f1f5f9;
        }
        @keyframes spin-ring { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Floating asset cards */
        .asset-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          padding: 6px 10px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.07);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 600;
          color: #0f172a;
          z-index: 10;
          animation: float-card 4s ease-in-out infinite;
          cursor: default;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .asset-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transform: scale(1.04);
        }
        .asset-card-icon { font-size: 13px; }
        .asset-card:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .asset-card:nth-child(2) { top: 20%; right: -20px; animation-delay: 0.5s; }
        .asset-card:nth-child(3) { bottom: 20%; right: -20px; animation-delay: 1s; }
        .asset-card:nth-child(4) { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1.5s; }
        .asset-card:nth-child(5) { bottom: 20%; left: -20px; animation-delay: 2s; }
        .asset-card:nth-child(6) { top: 20%; left: -20px; animation-delay: 2.5s; }
        @keyframes float-card {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .asset-card:nth-child(1), .asset-card:nth-child(4) {
          animation-name: float-card-cx;
        }
        @keyframes float-card-cx {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }

        /* Portfolio mini-widget */
        .portfolio-widget {
          position: absolute;
          bottom: 10px;
          left: -20px;
          background: #0f172a;
          border-radius: 14px;
          padding: 12px 16px;
          width: 170px;
          box-shadow: 0 12px 36px rgba(15,23,42,0.3);
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s;
          z-index: 20;
        }
        .portfolio-widget.show { opacity: 1; transform: translateX(0); }
        .pw-label { font-size: 9px; color: #64748b; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 5px; }
        .pw-value { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .pw-bar-bg { height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-bottom: 8px; overflow: hidden; }
        .pw-bar-fill { height: 100%; width: 68%; background: linear-gradient(90deg, #16a34a, #4ade80); border-radius: 2px; animation: bar-grow 1.5s cubic-bezier(0.16,1,0.3,1) 1.2s both; }
        @keyframes bar-grow { from { width: 0; } to { width: 68%; } }
        .pw-row { display: flex; justify-content: space-between; align-items: center; }
        .pw-gain { font-size: 10px; color: #4ade80; font-weight: 700; }
        .pw-time { font-size: 9px; color: #475569; }

        /* Order widget */
        .order-widget {
          position: absolute;
          top: 16px;
          right: -30px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 12px;
          width: 160px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s;
          z-index: 20;
        }
        .order-widget.show { opacity: 1; transform: translateX(0); }
        .ow-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .ow-title { font-size: 9px; font-weight: 700; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase; }
        .ow-badge-live { font-size: 8px; font-weight: 700; color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1px 5px; border-radius: 20px; letter-spacing: 0.06em; }
        .ow-stock { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid #f1f5f9; }
        .ow-stock:last-child { border-bottom: none; padding-bottom: 0; }
        .ow-sname { font-size: 10px; font-weight: 700; color: #0f172a; }
        .ow-right { text-align: right; }
        .ow-price { font-size: 10px; font-weight: 600; color: #0f172a; font-family: 'Syne', sans-serif; }
        .ow-chg { font-size: 9px; font-weight: 600; }
        .up { color: #16a34a; } .dn { color: #dc2626; }

        /* Bg decorations */
        .bg-blob-1 {
          position: absolute;
          top: -100px; right: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(220,252,231,0.6) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 900px) {
          .hero-section { grid-template-columns: 1fr; padding: 0 24px; }
          .hero-right { display: none; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell:nth-child(3) { border-right: 1.5px solid #e2e8f0; border-top: 1.5px solid #e2e8f0; }
          .stat-cell:nth-child(4) { border-top: 1.5px solid #e2e8f0; }
        }
      `}</style>

      <div className="hero-root" ref={heroRef}>
        {/* Hero */}
        <div className="hero-section">
          {/* Left */}
          <div className="hero-left">
            <div className={`hero-badge ${visible ? "show" : ""}`}>
              <span className="badge-dot" />
              India's Most Trusted Broker
            </div>

            <h1 className={`hero-heading ${visible ? "show" : ""}`}>
              Invest in{" "}
              <span className={`heading-accent ${visible ? "show" : ""}`}>
                everything
              </span>
              <br />
              that matters.
            </h1>

            <p className={`hero-sub ${visible ? "show" : ""}`}>
              Stocks, F&amp;O, Mutual Funds, ETFs, Currencies, Commodities — all
              in one powerful platform built for every kind of investor.
            </p>

            <div className={`hero-cta-row ${visible ? "show" : ""}`}>
              <button className="btn-primary-hero" onClick={() => navigate("/signup")}>
                Start Investing Free
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary-hero" onClick={() => navigate("/product")}>▶ Watch Demo</button>
            </div>

            <div className={`stats-row ${visible ? "show" : ""}`}>
              {stats.map((s) => (
                <div className="stat-cell" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hero-right">
            <div className="bg-blob-1" />
            <div className="bg-grid" />

            {/* Portfolio widget */}
            <div className={`portfolio-widget ${visible ? "show" : ""}`}>
              <div className="pw-label">Total Portfolio</div>
              <div className="pw-value">₹4,82,310</div>
              <div className="pw-bar-bg">
                <div className="pw-bar-fill" />
              </div>
              <div className="pw-row">
                <span className="pw-gain">+₹38,240 (8.6%)</span>
                <span className="pw-time">All time</span>
              </div>
            </div>

            {/* Order widget */}
            <div className={`order-widget ${visible ? "show" : ""}`}>
              <div className="ow-head">
                <span className="ow-title">Watchlist</span>
                <span className="ow-badge-live">● LIVE</span>
              </div>
              {[
                { name: "RELIANCE", price: "2,847", chg: "+1.24%", up: true },
                { name: "TCS", price: "3,912", chg: "+0.87%", up: true },
                { name: "INFY", price: "1,543", chg: "-0.43%", up: false },
              ].map((s) => (
                <div className="ow-stock" key={s.name}>
                  <span className="ow-sname">{s.name}</span>
                  <div className="ow-right">
                    <div className="ow-price">₹{s.price}</div>
                    <div className={`ow-chg ${s.up ? "up" : "dn"}`}>
                      {s.chg}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Orbit */}
            <div
              className={`orbit-container ${visible ? "show" : ""}`}
              style={{
                transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              }}
            >
              <div className="orbit-ring" />
              <div className="orbit-ring orbit-ring-2" />

              {/* Asset Cards */}
              {floatingCards.map((card, i) => (
                <div
                  className="asset-card"
                  key={i}
                  style={{
                    background: card.color,
                    borderColor: `${card.accent}22`,
                    color: card.accent,
                  }}
                >
                  <span className="asset-card-icon">{card.icon}</span>
                  <span>{card.label}</span>
                </div>
              ))}

              {/* Center */}
              <div className="orbit-center">
                <div className="orbit-core">
                  <span className="orbit-core-icon">💹</span>
                  <span className="orbit-core-text">Invest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
