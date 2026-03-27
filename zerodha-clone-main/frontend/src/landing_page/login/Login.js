import React, { useState, useEffect } from "react";
import API_BASE from "../../config";

const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      window.location.href = `${DASHBOARD_URL}?name=${encodeURIComponent(data.name)}`;
    } catch (err) {
      setError("Cannot connect to server. Make sure the backend is running.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
        .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-family: 'Instrument Sans', sans-serif; position: relative; overflow: hidden; }
        .login-blob1 { position: absolute; top: -100px; right: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .login-blob2 { position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .login-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .login-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 48px 44px; width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,0.07); position: relative; z-index: 1; opacity: ${loaded ? 1 : 0}; transform: ${loaded ? "translateY(0)" : "translateY(30px)"}; transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1); }
        .login-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }
        .login-logo-icon { width: 38px; height: 38px; background: #1a1a2e; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-style: italic; color: #fff; font-family: 'DM Serif Display', serif; }
        .login-logo-name { font-size: 20px; font-weight: 700; color: #1a1a2e; letter-spacing: -0.4px; }
        .login-title { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin-bottom: 6px; }
        .login-sub { font-size: 14px; color: #94a3b8; margin-bottom: 32px; }
        .login-label { display: block; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
        .login-input { width: 100%; padding: 14px 18px; font-size: 15px; font-weight: 500; color: #0f172a; border-radius: 12px; outline: none; transition: all 0.25s ease; box-sizing: border-box; font-family: 'Instrument Sans', sans-serif; }
        .login-input::placeholder { color: #cbd5e1; }
        .login-btn { width: 100%; padding: 15px; font-size: 15px; font-weight: 700; color: #fff; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none; border-radius: 12px; cursor: pointer; letter-spacing: 0.02em; transition: all 0.25s ease; box-shadow: 0 4px 20px rgba(16,185,129,0.35); font-family: 'Instrument Sans', sans-serif; margin-top: 8px; }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(16,185,129,0.45); background: linear-gradient(135deg, #0d9e73 0%, #047a57 100%); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .login-error { color: #ef4444; font-size: 13px; margin-bottom: 12px; padding: 10px 14px; background: rgba(239,68,68,0.06); border-radius: 8px; border: 1px solid rgba(239,68,68,0.15); }
        .login-footer { text-align: center; margin-top: 24px; font-size: 13px; color: #94a3b8; }
        .login-footer a { color: #059669; font-weight: 600; text-decoration: none; }
        .login-footer a:hover { text-decoration: underline; }
        .login-divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; }
        .login-divider-line { flex: 1; height: 1px; background: #e2e8f0; }
        .login-divider-text { font-size: 12px; color: #94a3b8; font-weight: 500; }
      `}</style>

      <div className="login-page">
        <div className="login-grid" />
        <div className="login-blob1" />
        <div className="login-blob2" />

        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">Z</div>
            <span className="login-logo-name">Zerodha</span>
          </div>

          <h2 className="login-title">Welcome back</h2>
          <p className="login-sub">Login to access your trading dashboard</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label className="login-label">Email</label>
              <input
                type="email"
                className="login-input"
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={{
                  background: focused === "email" ? "#fff" : "#f8fafc",
                  border: `2px solid ${focused === "email" ? "#10b981" : "#e2e8f0"}`,
                  boxShadow: focused === "email" ? "0 0 0 4px rgba(16,185,129,0.12)" : "none",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="login-label">Password</label>
              <input
                type="password"
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                style={{
                  background: focused === "password" ? "#fff" : "#f8fafc",
                  border: `2px solid ${focused === "password" ? "#10b981" : "#e2e8f0"}`,
                  boxShadow: focused === "password" ? "0 0 0 4px rgba(16,185,129,0.12)" : "none",
                }}
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">🔒 256-bit encrypted</span>
            <div className="login-divider-line" />
          </div>

          <div className="login-footer">
            Don't have an account? <a href="/signup">Create one free</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
