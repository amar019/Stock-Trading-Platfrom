import React, { useEffect, useRef, useState } from "react";

const platforms = [
  {
    icon: "📚",
    name: "Varsity",
    tagline: "Free market education",
    desc: "Comprehensive lessons from basics to advanced trading strategies — equities, derivatives, technical analysis, risk management, and more.",
    cta: "Explore Varsity",
    href: "https://zerodha.com/varsity/",
    external: true,
    accent: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "💬",
    name: "Trading Q&A",
    tagline: "Community knowledge",
    desc: "A community-driven forum where traders and investors share knowledge, ask questions, and discuss strategies about financial markets.",
    cta: "Visit Trading Q&A",
    href: "https://tradingqna.com/",
    external: true,
    accent: "#387ed1",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
];

const Education = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

        .edu-section {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          padding: 56px 24px;
          position: relative;
          overflow: hidden;
        }
        .edu-section::before {
          content: '';
          position: absolute;
          top: -60px; right: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .edu-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        /* Left */
        .edu-left {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .edu-eyebrow {
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
        .edu-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .edu-heading span {
          background: linear-gradient(135deg, #16a34a, #387ed1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .edu-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 0 0 24px;
        }

        .edu-img-wrap {
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 12px 40px rgba(15,23,42,0.07);
        }
        .edu-img-wrap img {
          width: 100%;
          display: block;
        }

        /* Right */
        .edu-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }

        .edu-platform-card {
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px 20px 16px;
          background: #ffffff;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .edu-platform-card:hover {
          box-shadow: 0 12px 36px rgba(15,23,42,0.09);
          transform: translateY(-3px);
        }
        .edu-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .edu-card-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          border: 1px solid;
        }
        .edu-card-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }
        .edu-card-tagline {
          font-size: 11px;
          font-weight: 500;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .edu-card-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 12px;
        }
        .edu-card-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .edu-card-link:hover { gap: 10px; }

        @media (max-width: 900px) {
          .edu-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <section className="edu-section" ref={ref}>
        <div className="edu-inner">
          {/* Left */}
          <div
            className="edu-left"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            <div className="edu-eyebrow">📖 Learn & Grow</div>
            <h2 className="edu-heading">
              Free and open <span>market education</span>
            </h2>
            <p className="edu-desc">
              Whether you're just starting out or refining your strategy, our
              free platforms give you the knowledge and community to invest with
              confidence.
            </p>
            <div className="edu-img-wrap">
              <img src="images/education.svg" alt="Market Education" />
            </div>
          </div>

          {/* Right */}
          <div
            className="edu-right"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
            }}
          >
            {platforms.map((p, i) => (
              <div
                key={i}
                className="edu-platform-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.6s ease ${0.2 + i * 0.15}s, box-shadow 0.25s, translateY 0.25s`,
                  borderColor: "#e2e8f0",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: p.accent,
                    borderRadius: "18px 18px 0 0",
                  }}
                />
                <div className="edu-card-top">
                  <div
                    className="edu-card-icon"
                    style={{ background: p.bg, borderColor: p.border }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div className="edu-card-name">{p.name}</div>
                    <div className="edu-card-tagline">{p.tagline}</div>
                  </div>
                </div>
                <p className="edu-card-desc">{p.desc}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu-card-link"
                  style={{ color: p.accent }}
                >
                  {p.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
