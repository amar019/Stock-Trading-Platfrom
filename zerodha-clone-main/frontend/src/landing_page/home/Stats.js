import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: "🤝",
    title: "Customer‑first always",
    desc: "Over 1.3+ crore customers trust us with ₹3.5+ lakh crore in equity investments — built on transparency and reliability.",
  },
  {
    icon: "🚫",
    title: "No spam or gimmicks",
    desc: "No spam, no gamification, no distractions. Just clean, high‑performance trading tools designed for serious investors.",
  },
  {
    icon: "🌐",
    title: "A complete ecosystem",
    desc: "A powerful suite of trading and investing products, along with partnerships across 30+ fintech innovators.",
  },
  {
    icon: "📈",
    title: "Designed to help you grow",
    desc: "Features like Nudge and Kill Switch guide your behavior, encouraging smarter and safer trading decisions.",
  },
];

function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .stats-section {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          padding: 56px 24px;
          position: relative;
          overflow: hidden;
        }
        .stats-section::before {
          content: '';
          position: absolute;
          top: -120px; left: -80px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(56,126,209,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .stats-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        /* Left */
        .stats-left {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .stats-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .stats-eyebrow-dot {
          width: 6px; height: 6px;
          background: #16a34a;
          border-radius: 50%;
          animation: sdot 2s infinite;
        }
        @keyframes sdot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.7); }
        }
        .stats-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .stats-heading span {
          background: linear-gradient(135deg, #387ed1, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stats-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 0 0 24px;
          max-width: 420px;
        }

        /* Pillars */
        .stats-pillars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .stats-pillar {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          cursor: default;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s, transform 0.2s;
        }
        .stats-pillar:hover {
          border-color: #387ed1;
          background: #f8faff;
          box-shadow: 0 4px 20px rgba(56,126,209,0.1);
          transform: translateX(4px);
        }
        .stats-pillar-icon {
          width: 32px; height: 32px;
          background: #f1f5f9;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .stats-pillar:hover .stats-pillar-icon { background: #dbeafe; }
        .stats-pillar-title {
          font-family: 'Syne', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .stats-pillar-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        /* Right */
        .stats-right {
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }
        .stats-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 16px 48px rgba(15,23,42,0.08);
        }
        .stats-img-wrap img {
          width: 100%;
          display: block;
          border-radius: 20px;
        }
        .stats-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.12) 0%, transparent 50%);
          border-radius: 20px;
          pointer-events: none;
        }

        .stats-links {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
        .stats-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: #387ed1;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .stats-link:hover { gap: 10px; }
        .stats-link-arrow { transition: transform 0.2s; }
        .stats-link:hover .stats-link-arrow { transform: translateX(3px); }

        @media (max-width: 900px) {
          .stats-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <section className="stats-section" ref={ref}>
        <div className="stats-inner">
          {/* Left */}
          <div
            className="stats-left"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            <div className="stats-eyebrow">
              <span className="stats-eyebrow-dot" />
              Why Zerodha
            </div>
            <h2 className="stats-heading">
              Trust with <span>confidence</span>
            </h2>
            <p className="stats-desc">
              Built on a foundation of transparency, reliability, and a genuine
              commitment to helping every Indian investor succeed.
            </p>

            <div className="stats-pillars">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="stats-pillar"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s, border-color 0.2s, box-shadow 0.2s, background 0.2s, translateX 0.2s`,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="stats-pillar-icon">{p.icon}</div>
                  <div>
                    <div className="stats-pillar-title">{p.title}</div>
                    <p className="stats-pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className="stats-right"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
            }}
          >
            <div className="stats-img-wrap">
              <img src="images/ecosystem.png" alt="Trading Ecosystem" />
              <div className="stats-img-overlay" />
            </div>
            <div className="stats-links">
              <Link to="/product" className="stats-link">
                Explore products <span className="stats-link-arrow">→</span>
              </Link>
              <Link to="/product" className="stats-link">
                Try demo <span className="stats-link-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stats;
