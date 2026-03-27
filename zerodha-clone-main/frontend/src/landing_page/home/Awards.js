import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "📈", label: "Futures & Options" },
  { icon: "💹", label: "Equity Trading" },
  { icon: "🏦", label: "Commodity Trading" },
  { icon: "💱", label: "Currency Derivatives" },
  { icon: "📊", label: "Mutual Funds" },
  { icon: "🚀", label: "IPO Investments" },
];

const stats = [
  { value: 10, suffix: "M+", label: "Active Investors" },
  { value: 15, suffix: "+", label: "Years of Trust" },
  { value: 99.9, suffix: "%", label: "Uptime Reliability", decimal: true },
];

function useCountUp(target, duration = 1800, start = false, decimal = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(
        decimal
          ? parseFloat((eased * target).toFixed(1))
          : Math.floor(eased * target),
      );
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, decimal]);
  return count;
}

function StatItem({ value, suffix, label, decimal, animate }) {
  const count = useCountUp(value, 1800, animate, decimal);
  return (
    <div style={styles.statItem}>
      <div style={styles.statValue}>
        {count}
        {suffix}
      </div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

const Awards = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      {/* Background accent */}
      <div style={styles.bgAccentTop} />
      <div style={styles.bgAccentBottom} />

      <div style={styles.container}>
        {/* Left Column */}
        <div
          style={{
            ...styles.leftCol,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Badge */}
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            #1 Ranked Stock Broker · India
          </div>

          {/* Headline */}
          <h2 style={styles.headline}>
            India's Most
            <br />
            <span style={styles.headlineAccent}>Trusted Broker</span>
          </h2>

          <p style={styles.description}>
            Trusted by over <strong>10 million investors</strong> across India.
            Our platform delivers institutional-grade tools, zero-latency
            execution, and a seamless experience across stocks, derivatives, and
            funds.
          </p>

          {/* Feature Grid */}
          <div style={styles.featureGrid}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  ...styles.featureItem,
                  ...(hovered === i ? styles.featureItemHovered : {}),
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s, box-shadow 0.2s, border-color 0.2s`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={styles.featureIcon}>{f.icon}</span>
                <span style={styles.featureLabel}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={styles.ctaRow}>
            <button
              style={styles.ctaPrimary}
              onClick={() => navigate("/signup")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0a2540";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,200,100,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00c46a";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,196,106,0.30)";
              }}
            >
              Open Free Account →
            </button>
            <button
              style={styles.ctaSecondary}
              onClick={() => navigate("/about")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0a2540";
                e.currentTarget.style.color = "#0a2540";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              View Awards
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            ...styles.rightCol,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          {/* Main Award Card */}
          <div style={styles.awardCard}>
            {/* Shine overlay */}
            <div style={styles.cardShine} />

            {/* Top strip */}
            <div style={styles.cardStrip}>
              <span style={styles.cardStripText}>
                SEBI Registered · NSE · BSE · MCX
              </span>
              <span style={styles.liveIndicator}>
                <span style={styles.liveDot} />
                LIVE
              </span>
            </div>

            {/* Trophy area */}
            <div style={styles.trophyArea}>
              <div style={styles.trophyGlow} />
              <img
                src="images/largestBroker.svg"
                alt="Largest Stock Broker"
                style={styles.trophyImage}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Fallback visual if image fails */}
              <div style={styles.trophyFallback}>🏆</div>
            </div>

            {/* Award title inside card */}
            <div style={styles.cardTitle}>Largest Stock Broker</div>
            <div style={styles.cardSubtitle}>in India — 2024</div>

            {/* Divider */}
            <div style={styles.cardDivider} />

            {/* Stats Row */}
            <div style={styles.statsRow}>
              {stats.map((s, i) => (
                <StatItem key={i} {...s} animate={visible} />
              ))}
            </div>
          </div>

          {/* Floating micro-cards */}
          <div
            style={{
              ...styles.floatCard,
              ...styles.floatCardLeft,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}
          >
            <span style={styles.floatCardIcon}>⭐</span>
            <div>
              <div style={styles.floatCardValue}>4.8 / 5</div>
              <div style={styles.floatCardLabel}>App Rating</div>
            </div>
          </div>

          <div
            style={{
              ...styles.floatCard,
              ...styles.floatCardRight,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s",
            }}
          >
            <span style={styles.floatCardIcon}>🔒</span>
            <div>
              <div style={styles.floatCardValue}>₹0</div>
              <div style={styles.floatCardLabel}>Account Opening</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    fontFamily: "'Sora', sans-serif",
    background: "#ffffff",
    position: "relative",
    padding: "80px 24px",
    overflow: "hidden",
  },
  bgAccentTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,196,106,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgAccentBottom: {
    position: "absolute",
    bottom: -100,
    left: -60,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(10,37,64,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "center",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#f0fdf7",
    border: "1px solid #bbf7d0",
    borderRadius: 100,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    color: "#16a34a",
    letterSpacing: "0.04em",
    width: "fit-content",
    textTransform: "uppercase",
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#16a34a",
    display: "inline-block",
    animation: "pulse-dot 2s infinite",
  },
  headline: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.12,
    color: "#0a2540",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  headlineAccent: {
    background: "linear-gradient(135deg, #00c46a 0%, #0a9e56 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  description: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    lineHeight: 1.75,
    color: "#64748b",
    margin: 0,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    cursor: "default",
    transition: "all 0.2s ease",
  },
  featureItemHovered: {
    background: "#f0fdf7",
    borderColor: "#86efac",
    boxShadow: "0 4px 16px rgba(0,196,106,0.1)",
  },
  featureIcon: {
    fontSize: 18,
    lineHeight: 1,
  },
  featureLabel: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#1e293b",
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: 8,
  },
  ctaPrimary: {
    background: "#00c46a",
    color: "#ffffff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Sora', sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(0,196,106,0.30)",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
  },
  ctaSecondary: {
    background: "transparent",
    color: "#64748b",
    border: "1.5px solid #cbd5e1",
    borderRadius: 10,
    padding: "13px 24px",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Sora', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  rightCol: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  awardCard: {
    background:
      "linear-gradient(160deg, #0a2540 0%, #0f3460 60%, #0a2540 100%)",
    borderRadius: 24,
    padding: "36px 32px 32px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 24px 80px rgba(10,37,64,0.18), 0 2px 8px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
  },
  cardShine: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
    borderRadius: 24,
    pointerEvents: "none",
  },
  cardStrip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  cardStripText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 10,
    fontWeight: 700,
    color: "#00c46a",
    letterSpacing: "0.1em",
    fontFamily: "'Sora', sans-serif",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#00c46a",
    display: "inline-block",
    animation: "pulse-dot 1.5s infinite",
  },
  trophyArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    minHeight: 140,
  },
  trophyGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,196,106,0.15) 0%, transparent 70%)",
  },
  trophyImage: {
    maxWidth: 160,
    maxHeight: 140,
    objectFit: "contain",
    position: "relative",
    zIndex: 1,
    filter: "drop-shadow(0 8px 24px rgba(0,196,106,0.3))",
  },
  trophyFallback: {
    fontSize: 80,
    position: "relative",
    zIndex: 1,
    filter: "drop-shadow(0 4px 12px rgba(0,196,106,0.3))",
  },
  cardTitle: {
    textAlign: "center",
    fontFamily: "'Sora', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: "#ffffff",
    letterSpacing: "-0.01em",
    marginBottom: 4,
  },
  cardSubtitle: {
    textAlign: "center",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    marginBottom: 24,
    fontWeight: 500,
  },
  cardDivider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginBottom: 24,
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
  },
  statItem: {
    flex: 1,
    textAlign: "center",
  },
  statValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#00c46a",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  statLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: 500,
  },
  floatCard: {
    position: "absolute",
    background: "#ffffff",
    borderRadius: 14,
    padding: "12px 16px",
    boxShadow: "0 8px 32px rgba(10,37,64,0.12)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #f1f5f9",
    animation: "float-card 3s ease-in-out infinite",
  },
  floatCardLeft: {
    bottom: 32,
    left: -20,
    animationDelay: "0s",
  },
  floatCardRight: {
    top: 24,
    right: -16,
    animationDelay: "1.5s",
  },
  floatCardIcon: {
    fontSize: 22,
  },
  floatCardValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 15,
    fontWeight: 800,
    color: "#0a2540",
    lineHeight: 1.1,
  },
  floatCardLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: 2,
  },
};

export default Awards;
