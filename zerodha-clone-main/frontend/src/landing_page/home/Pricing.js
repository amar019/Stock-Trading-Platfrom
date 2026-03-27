import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    price: "₹0",
    label: "Equity Delivery",
    desc: "Free equity delivery and direct mutual fund investments. No hidden charges, ever.",
    tag: "Most Popular",
    tagColor: "#16a34a",
    tagBg: "#f0fdf4",
    tagBorder: "#bbf7d0",
    accent: "#16a34a",
    features: ["Stocks & ETFs", "Direct Mutual Funds", "IPO Applications", "No AMC first year"],
  },
  {
    price: "₹20",
    label: "Intraday & F&O",
    desc: "Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday and F&O trades.",
    tag: "Flat Fee",
    tagColor: "#1d4ed8",
    tagBg: "#eff6ff",
    tagBorder: "#bfdbfe",
    accent: "#387ed1",
    features: ["Futures & Options", "Intraday Equity", "Currency Derivatives", "Commodity Trading"],
  },
];

const Pricing = () => {
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

        .pricing-section {
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
          padding: 56px 24px;
          position: relative;
          overflow: hidden;
        }
        .pricing-section::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -60px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .pricing-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .pricing-eyebrow {
          display: inline-block;
          background: #fef9c3;
          border: 1px solid #fde68a;
          color: #92400e;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 999px;
          margin-bottom: 14px;
        }
        .pricing-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }
        .pricing-subtitle {
          font-size: 13.5px;
          color: #64748b;
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.65;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .pricing-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 22px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
        }
        .pricing-card:hover {
          box-shadow: 0 16px 48px rgba(15,23,42,0.1);
          transform: translateY(-4px);
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
        }

        .pricing-card-tag {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid;
          margin-bottom: 12px;
        }

        .pricing-price {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 3px;
        }
        .pricing-price-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 10px;
        }
        .pricing-card-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f1f5f9;
        }
        .pricing-features {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .pricing-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #374151;
        }
        .pricing-check {
          width: 15px; height: 15px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
        }

        .pricing-cta {
          text-align: center;
          margin-top: 4px;
        }
        .pricing-cta a {
          font-size: 13px;
          font-weight: 600;
          color: #387ed1;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }
        .pricing-cta a:hover { gap: 10px; }

        @media (max-width: 700px) {
          .pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="pricing-section" ref={ref}>
        <div className="pricing-inner">
          <div
            className="pricing-header"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="pricing-eyebrow">Transparent Pricing</span>
            <h2 className="pricing-title">Unbeatable pricing</h2>
            <p className="pricing-subtitle">
              Simple and transparent pricing with no hidden charges. Invest in
              stocks, derivatives, and mutual funds at the lowest cost.
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="pricing-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${0.15 + i * 0.15}s, transform 0.6s ease ${0.15 + i * 0.15}s, box-shadow 0.25s, translateY 0.25s`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: plan.accent,
                    borderRadius: "20px 20px 0 0",
                  }}
                />
                <div
                  className="pricing-card-tag"
                  style={{
                    color: plan.tagColor,
                    background: plan.tagBg,
                    borderColor: plan.tagBorder,
                  }}
                >
                  {plan.tag}
                </div>
                <div className="pricing-price" style={{ color: plan.accent }}>
                  {plan.price}
                </div>
                <div className="pricing-price-label">{plan.label}</div>
                <p className="pricing-card-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-feature">
                      <span
                        className="pricing-check"
                        style={{ background: plan.tagBg, color: plan.tagColor }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pricing-cta"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          >
            <Link to="/pricing">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
