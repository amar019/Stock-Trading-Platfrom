import React, { useState, useEffect, useRef } from "react";

const tickers = [
  { symbol: "RELIANCE", price: "2,847.30", change: "+1.24%" },
  { symbol: "TCS", price: "3,612.75", change: "+0.87%" },
  { symbol: "INFY", price: "1,489.50", change: "-0.43%" },
  { symbol: "HDFC", price: "1,723.60", change: "+2.11%" },
  { symbol: "WIPRO", price: "456.20", change: "+0.65%" },
  { symbol: "NIFTY 50", price: "22,415.00", change: "+0.93%" },
  { symbol: "SENSEX", price: "73,852.00", change: "+1.02%" },
  { symbol: "BAJFINANCE", price: "7,234.80", change: "-0.38%" },
];

const stats = [
  { value: "1Cr+", label: "Active Traders" },
  { value: "₹0", label: "Account Opening Fee" },
  { value: "15M+", label: "Orders Daily" },
];

const features = [
  "✦ Zero brokerage on equity delivery",
  "✦ Advanced charting & analytics",
  "✦ Instant KYC in under 5 minutes",
  "✦ Trade stocks, F&O, MF & more",
];

function CandleChart() {
  const candles = [
    { h: 60, l: 20, o: 35, c: 55, bull: true },
    { h: 70, l: 30, o: 55, c: 40, bull: false },
    { h: 80, l: 35, o: 42, c: 72, bull: true },
    { h: 75, l: 45, o: 70, c: 52, bull: false },
    { h: 90, l: 48, o: 55, c: 85, bull: true },
    { h: 95, l: 60, o: 83, c: 65, bull: false },
    { h: 100, l: 58, o: 68, c: 95, bull: true },
    { h: 105, l: 70, o: 94, c: 78, bull: false },
    { h: 115, l: 72, o: 80, c: 110, bull: true },
  ];
  return (
    <svg
      viewBox="0 0 200 130"
      style={{ width: "100%", height: "100%", opacity: 0.12 }}
    >
      {candles.map((c, i) => {
        const x = 10 + i * 21;
        const color = c.bull ? "#10b981" : "#ef4444";
        const bodyTop = 130 - Math.max(c.o, c.c);
        const bodyH = Math.abs(c.o - c.c);
        return (
          <g key={i}>
            <line
              x1={x + 4}
              y1={130 - c.h}
              x2={x + 4}
              y2={130 - c.l}
              stroke={color}
              strokeWidth="1.5"
            />
            <rect
              x={x}
              y={bodyTop}
              width="8"
              height={Math.max(bodyH, 2)}
              fill={color}
              rx="1"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [tickerOffset, setTickerOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => (prev - 1) % (tickers.length * 160));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://stock-trading-platfrom.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Instrument Sans', 'DM Sans', sans-serif",
      overflow: "hidden",
      position: "relative",
    },
    gridBg: {
      position: "absolute",
      inset: 0,
      backgroundImage:
        "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      pointerEvents: "none",
    },
    accentBlob1: {
      position: "absolute",
      top: "-80px",
      right: "-80px",
      width: "400px",
      height: "400px",
      background:
        "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
      borderRadius: "50%",
      pointerEvents: "none",
    },
    accentBlob2: {
      position: "absolute",
      bottom: "-100px",
      left: "-80px",
      width: "350px",
      height: "350px",
      background:
        "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
      borderRadius: "50%",
      pointerEvents: "none",
    },
    ticker: {
      background: "#0f172a",
      color: "#94a3b8",
      fontSize: "12px",
      fontWeight: "500",
      padding: "10px 0",
      overflow: "hidden",
      whiteSpace: "nowrap",
      letterSpacing: "0.03em",
      position: "relative",
    },
    tickerInner: {
      display: "inline-flex",
      gap: "0",
      transform: `translateX(${tickerOffset}px)`,
      willChange: "transform",
    },
    tickerItem: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "0 30px",
      borderRight: "1px solid rgba(255,255,255,0.08)",
    },
    layout: {
      display: "flex",
      minHeight: "calc(100vh - 41px)",
      position: "relative",
      zIndex: 1,
    },
    leftPanel: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px 70px",
      position: "relative",
    },
    rightPanel: {
      width: "480px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 50px",
      borderLeft: "1px solid rgba(15,23,42,0.08)",
      background: "rgba(248,250,252,0.7)",
      backdropFilter: "blur(10px)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(16,185,129,0.1)",
      border: "1px solid rgba(16,185,129,0.25)",
      color: "#059669",
      borderRadius: "999px",
      padding: "5px 14px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      marginBottom: "28px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
    },
    headline: {
      fontSize: "clamp(36px, 4vw, 56px)",
      fontWeight: "800",
      lineHeight: "1.1",
      color: "#0f172a",
      letterSpacing: "-0.03em",
      marginBottom: "20px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
    },
    highlight: {
      color: "#10b981",
      position: "relative",
      display: "inline-block",
    },
    subtext: {
      fontSize: "17px",
      color: "#64748b",
      lineHeight: "1.7",
      maxWidth: "440px",
      marginBottom: "40px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease 0.2s",
    },
    statsRow: {
      display: "flex",
      gap: "40px",
      marginBottom: "48px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease 0.3s",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
    },
    statValue: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#0f172a",
      letterSpacing: "-0.02em",
    },
    statLabel: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginTop: "2px",
    },
    featureBox: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      padding: "16px 20px",
      fontSize: "14px",
      color: "#334155",
      fontWeight: "500",
      opacity: loaded ? 1 : 0,
      transition: "all 0.7s ease 0.4s, color 0.3s ease, background 0.3s ease",
      letterSpacing: "0.01em",
    },
    chartBox: {
      marginTop: "32px",
      height: "90px",
      opacity: loaded ? 1 : 0,
      transition: "all 0.7s ease 0.5s",
    },
    formCard: {
      width: "100%",
      maxWidth: "380px",
    },
    formHeader: {
      marginBottom: "32px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease 0.3s",
    },
    formTitle: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#0f172a",
      letterSpacing: "-0.02em",
      marginBottom: "6px",
    },
    formSubtitle: {
      fontSize: "14px",
      color: "#94a3b8",
      fontWeight: "400",
    },
    inputGroup: (index) => ({
      marginBottom: "16px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ease ${0.4 + index * 0.1}s`,
    }),
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: "8px",
    },
    input: (isFocused) => ({
      width: "100%",
      padding: "14px 18px",
      fontSize: "15px",
      fontWeight: "500",
      color: "#0f172a",
      background: isFocused ? "#ffffff" : "#f8fafc",
      border: `2px solid ${isFocused ? "#10b981" : "#e2e8f0"}`,
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.25s ease",
      boxSizing: "border-box",
      boxShadow: isFocused ? "0 0 0 4px rgba(16,185,129,0.12)" : "none",
    }),
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      margin: "20px 0",
      opacity: loaded ? 1 : 0,
      transition: "all 0.6s ease 0.65s",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#e2e8f0",
    },
    dividerText: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "500",
    },
    submitBtn: {
      width: "100%",
      padding: "16px",
      fontSize: "15px",
      fontWeight: "700",
      color: "#ffffff",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      letterSpacing: "0.02em",
      transition: "all 0.25s ease",
      boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s, box-shadow 0.25s ease, background 0.25s ease`,
    },
    trustRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "16px",
      opacity: loaded ? 1 : 0,
      transition: "all 0.6s ease 0.8s",
    },
    trustText: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: "500",
    },
    successBox: {
      textAlign: "center",
      padding: "20px",
    },
    successIcon: {
      width: "72px",
      height: "72px",
      background: "linear-gradient(135deg, #10b981, #059669)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
      fontSize: "30px",
      boxShadow: "0 8px 30px rgba(16,185,129,0.4)",
      animation: "pulse 2s infinite",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
        input::placeholder { color: #cbd5e1; }
        .submit-btn:hover {
          box-shadow: 0 8px 30px rgba(16,185,129,0.45) !important;
          transform: translateY(-2px) !important;
          background: linear-gradient(135deg, #0d9e73 0%, #047a57 100%) !important;
        }
        .submit-btn:active { transform: translateY(0px) !important; }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(16,185,129,0.4); }
          50% { box-shadow: 0 8px 40px rgba(16,185,129,0.7); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .live-dot {
          width: 7px; height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: dotBlink 1.5s ease infinite;
        }
        @media (max-width: 900px) {
          .layout { flex-direction: column !important; }
          .left-panel { padding: 40px 24px 20px !important; }
          .right-panel { width: 100% !important; border-left: none !important; border-top: 1px solid rgba(15,23,42,0.08); padding: 30px 24px 50px !important; }
          .stats-row { gap: 24px !important; }
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.gridBg} />
        <div style={styles.accentBlob1} />
        <div style={styles.accentBlob2} />

        {/* Ticker */}
        <div style={styles.ticker}>
          <div style={styles.tickerInner}>
            {[...tickers, ...tickers, ...tickers].map((t, i) => (
              <span key={i} style={styles.tickerItem}>
                <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                  {t.symbol}
                </span>
                <span style={{ color: "#f8fafc" }}>{t.price}</span>
                <span
                  style={{
                    color: t.change.startsWith("+") ? "#34d399" : "#f87171",
                    fontWeight: 600,
                  }}
                >
                  {t.change}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div style={styles.layout} className="layout">
          {/* Left Panel */}
          <div style={styles.leftPanel} className="left-panel">
            <div style={styles.badge}>
              <span className="live-dot" />
              SEBI Registered · NSE · BSE · MCX
            </div>

            <h1 style={styles.headline}>
              India's smartest
              <br />
              <span style={styles.highlight}>trading platform</span>
            </h1>

            <p style={styles.subtext}>
              Open a free demat account in minutes. Invest in stocks, F&O,
              currencies, commodities, and mutual funds — all from one powerful
              platform.
            </p>

            <div style={styles.statsRow} className="stats-row">
              {stats.map((s, i) => (
                <div key={i} style={styles.statItem}>
                  <span style={styles.statValue}>{s.value}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={styles.featureBox}>{features[activeFeature]}</div>

            <div style={styles.chartBox}>
              <CandleChart />
            </div>
          </div>

          {/* Right Panel */}
          <div style={styles.rightPanel} className="right-panel">
            <div style={styles.formCard}>
              {!submitted ? (
                <>
                  <div style={styles.formHeader}>
                    <h2 style={styles.formTitle}>Open Free Account</h2>
                    <p style={styles.formSubtitle}>
                      Start investing in under 5 minutes
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup(0)}>
                      <label style={styles.label}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={styles.input(focused === "name")}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup(1)}>
                      <label style={styles.label}>Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        style={styles.input(focused === "phone")}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup(2)}>
                      <label style={styles.label}>Email</label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={styles.input(focused === "email")}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup(3)}>
                      <label style={styles.label}>Password</label>
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                        style={styles.input(focused === "password")}
                        required
                        minLength={6}
                      />
                    </div>

                    {error && (
                      <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>{error}</p>
                    )}

                    <div style={styles.divider}>
                      <div style={styles.dividerLine} />
                      <span style={styles.dividerText}>
                        Secure OTP verification
                      </span>
                      <div style={styles.dividerLine} />
                    </div>

                    <button
                      type="submit"
                      className="submit-btn"
                      style={styles.submitBtn}
                    >
                      Continue →
                    </button>
                  </form>

                  <div style={styles.trustRow}>
                    <span>🔒</span>
                    <span style={styles.trustText}>
                      256-bit encryption · Your data is safe with us
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                      padding: "14px 16px",
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.15)",
                      borderRadius: "10px",
                      opacity: loaded ? 1 : 0,
                      transition: "all 0.6s ease 0.9s",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: "#059669" }}>
                        No charges ever
                      </strong>{" "}
                      — Zero account opening fee, zero AMC for the first year.
                    </p>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    ...styles.successBox,
                    animation: "slideUp 0.5s ease forwards",
                  }}
                >
                  <div style={styles.successIcon}>✓</div>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "10px",
                    }}
                  >
                    Welcome, {name}! 🎉
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.7,
                    }}
                  >
                    Your account has been created successfully.<br />
                    You can now <a href="/login" style={{ color: "#059669", fontWeight: "600" }}>login</a> to access your dashboard.
                  </p>
                  <div
                    style={{
                      marginTop: "24px",
                      padding: "14px",
                      background: "rgba(16,185,129,0.08)",
                      borderRadius: "10px",
                      fontSize: "13px",
                      color: "#059669",
                      fontWeight: "600",
                    }}
                  >
                    Account created successfully ✓
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
