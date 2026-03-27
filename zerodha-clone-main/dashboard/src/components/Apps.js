import React from "react";

const apps = [
  { name: "Kite", desc: "The trading platform. Fast, powerful, and beautiful.", icon: "📈", color: "#eff6ff", border: "#bfdbfe", tag: "Trading" },
  { name: "Console", desc: "Your portfolio tracker and reporting tool.", icon: "📊", color: "#f0fdf4", border: "#bbf7d0", tag: "Portfolio" },
  { name: "Coin", desc: "Invest in direct mutual funds at zero commission.", icon: "🪙", color: "#fffbeb", border: "#fde68a", tag: "Mutual Funds" },
  { name: "Kite Connect", desc: "Build trading apps with our powerful APIs.", icon: "⚡", color: "#fdf4ff", border: "#e9d5ff", tag: "Developer" },
  { name: "Varsity", desc: "Learn trading and investing with free courses.", icon: "📚", color: "#fff7ed", border: "#fed7aa", tag: "Education" },
  { name: "Sentinel", desc: "Set alerts on market conditions and indicators.", icon: "🔔", color: "#fef2f2", border: "#fecaca", tag: "Alerts" },
];

const Apps = () => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h3 className="title" style={{ marginBottom: "4px" }}>Apps</h3>
        <p style={{ fontSize: "13px", color: "#9ca3af" }}>Explore the Zerodha ecosystem</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {apps.map((app) => (
          <div key={app.name} style={{
            background: "#fff", borderRadius: "16px", border: "1px solid #e8eaed",
            padding: "22px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            cursor: "pointer", transition: "all 0.2s ease"
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: app.color, border: `1px solid ${app.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
              }}>{app.icon}</div>
              <span style={{
                fontSize: "11px", fontWeight: "600", color: "#6b7280",
                background: "#f3f4f6", padding: "3px 10px", borderRadius: "20px"
              }}>{app.tag}</span>
            </div>
            <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#111827", marginBottom: "6px" }}>{app.name}</h4>
            <p style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.6" }}>{app.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
