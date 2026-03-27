import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .zn-wrap {
    position: sticky; top: 0; z-index: 1000;
    font-family: 'Bricolage Grotesque', sans-serif;
  }

  .zn-ticker {
    background: #1a1a2e; height: 30px;
    display: flex; align-items: center; overflow: hidden;
  }
  .zn-ticker-track {
    display: flex; align-items: center; gap: 40px;
    animation: ticker 32s linear infinite; white-space: nowrap;
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .zn-ti {
    display: flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.2px;
    color: rgba(255,255,255,0.65); flex-shrink: 0;
  }
  .zn-ti-n { color: rgba(255,255,255,0.92); font-weight: 600; }
  .zn-up { color: #4ade80; }
  .zn-dn { color: #f87171; }
  .zn-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.15); flex-shrink: 0; }

  .zn-bar {
    background: #fff;
    border-bottom: 1px solid #ede9e2;
    transition: box-shadow 0.3s;
  }
  .zn-bar.scrolled { box-shadow: 0 6px 40px rgba(0,0,0,0.09); }

  .zn-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 36px; height: 68px;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
  }

  .zn-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
  .zn-logo-icon {
    width: 36px; height: 36px; background: #1a1a2e; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, background 0.2s;
  }
  .zn-logo:hover .zn-logo-icon { transform: rotate(-6deg) scale(1.08); background: #2d2d4a; }
  .zn-logo-l { font-family: 'DM Serif Display', serif; font-size: 19px; color: #fff; font-style: italic; }
  .zn-logo-text { display: flex; flex-direction: column; gap: 1px; }
  .zn-logo-name { font-family: 'DM Serif Display', serif; font-size: 21px; color: #1a1a2e; letter-spacing: -0.4px; line-height: 1; }
  .zn-logo-sub { font-size: 9.5px; font-weight: 500; letter-spacing: 1.4px; text-transform: uppercase; color: #387ed1; }

  .zn-nav { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; flex: 1; justify-content: center; }
  .zn-item { position: relative; }

  .zn-lnk {
    text-decoration: none; font-size: 14px; font-weight: 400;
    color: #6b6b65; padding: 8px 15px; border-radius: 10px;
    display: flex; align-items: center; gap: 5px;
    transition: color 0.15s, background 0.15s; white-space: nowrap; cursor: pointer;
    border: none; background: transparent; font-family: 'Bricolage Grotesque', sans-serif;
  }
  .zn-lnk:hover { color: #1a1a2e; background: #f7f4f0; }
  .zn-lnk.active { color: #1a1a2e; font-weight: 500; background: #f0ece6; }

  .zn-pip {
    width: 5px; height: 5px; border-radius: 50%; background: #387ed1;
    opacity: 0; transform: scale(0); transition: opacity 0.18s, transform 0.18s;
  }
  .zn-lnk.active .zn-pip, .zn-lnk:hover .zn-pip { opacity: 1; transform: scale(1); }

  .zn-chev { width: 12px; height: 12px; transition: transform 0.2s; }
  .zn-item:hover .zn-chev { transform: rotate(180deg); }

  .zn-free {
    font-size: 9.5px; font-weight: 600; letter-spacing: 0.4px;
    background: #fef3c7; color: #92400e;
    padding: 2px 7px; border-radius: 20px;
  }

  .zn-drop {
    position: absolute; top: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(-6px);
    background: #fff; border: 1px solid #ede9e2;
    border-radius: 16px; padding: 8px; width: 230px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.05);
    opacity: 0; pointer-events: none;
    transition: opacity 0.18s, transform 0.18s; z-index: 100;
  }
  .zn-item:hover .zn-drop { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }

  .zn-dd {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 11px; border-radius: 9px;
    text-decoration: none; color: #555; font-size: 13.5px;
    transition: background 0.12s;
  }
  .zn-dd:hover { background: #f7f4f0; }
  .zn-dd-ic {
    width: 30px; height: 30px; border-radius: 8px;
    background: #f7f4f0; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background 0.12s;
  }
  .zn-dd:hover .zn-dd-ic { background: #ede9e2; }
  .zn-dd-title { font-size: 13.5px; font-weight: 500; color: #1a1a2e; }
  .zn-dd-sub { font-size: 11.5px; color: #aaa; }

  .zn-right { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }

  .zn-login {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 14px; font-weight: 500; color: #1a1a2e;
    text-decoration: none; padding: 8px 18px;
    border-radius: 10px; border: 1.5px solid #ddd9d1;
    background: transparent; cursor: pointer; transition: all 0.15s;
  }
  .zn-login:hover { background: #f7f4f0; border-color: #ccc5ba; }

  .zn-cta {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 14px; font-weight: 600; color: #fff;
    text-decoration: none; padding: 9px 20px;
    border-radius: 10px; border: none;
    background: #1a1a2e; cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .zn-cta:hover { background: #2d2d4a; }
  .zn-cta:active { transform: scale(0.97); }
  .zn-cta-arr {
    width: 18px; height: 18px; border-radius: 5px;
    background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
  }
  .zn-cta:hover .zn-cta-arr { background: rgba(56,126,209,0.4); }

  .zn-hbg {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; padding: 7px; border-radius: 8px;
    border: none; background: transparent; transition: background 0.15s;
  }
  .zn-hbg:hover { background: #f7f4f0; }
  .zn-hbg span { display: block; width: 20px; height: 1.5px; background: #1a1a2e; border-radius: 2px; transition: all 0.22s; }
  .zn-hbg.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .zn-hbg.open span:nth-child(2) { opacity: 0; }
  .zn-hbg.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .zn-mob {
    background: #fff; border-top: 1px solid #f0ece6;
    max-height: 0; overflow: hidden;
    transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
  }
  .zn-mob.open { max-height: 520px; }
  .zn-mob-inner { padding: 14px 24px 24px; }
  .zn-mob-lnk {
    display: flex; align-items: center; justify-content: space-between;
    text-decoration: none; font-size: 15px; color: #6b6b65;
    padding: 13px 0; border-bottom: 1px solid #f5f2ed;
    transition: color 0.13s;
  }
  .zn-mob-lnk:last-of-type { border-bottom: none; }
  .zn-mob-lnk:hover, .zn-mob-lnk.active { color: #1a1a2e; }
  .zn-mob-acts { display: flex; gap: 10px; margin-top: 20px; }
  .zn-mob-acts a { flex: 1; text-align: center; }

  @media (max-width: 820px) {
    .zn-nav { display: none; }
    .zn-right .zn-login, .zn-right .zn-cta { display: none; }
    .zn-hbg { display: flex; }
    .zn-inner { padding: 0 20px; }
  }
`;

const tickers = [
  { symbol: "TCS", price: "3,912.75", change: "+0.87%", up: true },
  { symbol: "INFY", price: "1,543.20", change: "-0.43%", up: false },
  { symbol: "HDFC", price: "1,678.90", change: "+2.11%", up: true },
  { symbol: "WIPRO", price: "456.80", change: "-0.92%", up: false },
  { symbol: "NIFTY 50", price: "22,147.00", change: "+0.67%", up: true },
  { symbol: "SENSEX", price: "73,088.33", change: "+0.54%", up: true },
  { symbol: "RELIANCE", price: "2,847.30", change: "+1.24%", up: true },
  { symbol: "BAJFINANCE", price: "6,732.45", change: "+1.87%", up: true },
];

const products = [
  { label: "Kite", sub: "Trading platform", icon: "📈" },
  { label: "Console", sub: "Portfolio tracker", icon: "📊" },
  { label: "Coin", sub: "Mutual funds", icon: "🪙" },
  { label: "Kite Connect", sub: "Trading API", icon: "⚡" },
];



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const active = (p) => location.pathname === p;

  return (
    <>
      <style>{navStyle}</style>
      <div className="zn-wrap">
        <div className={`zn-bar${scrolled ? " scrolled" : ""}`}>
          <div className="zn-inner">
            <Link className="zn-logo" to="/">
              <div className="zn-logo-icon">
                <span className="zn-logo-l">Z</span>
              </div>
              <div className="zn-logo-text">
                <span className="zn-logo-name">Zerodha</span>
                <span className="zn-logo-sub">Zero brokerage · equity</span>
              </div>
            </Link>

            <ul className="zn-nav">
              <li className="zn-item">
                <Link
                  className={`zn-lnk${active("/about") ? " active" : ""}`}
                  to="/about"
                >
                  <span className="zn-pip" /> About
                </Link>
              </li>
              <li className="zn-item">
                <span
                  className={`zn-lnk${active("/product") ? " active" : ""}`}
                >
                  <span className="zn-pip" /> Products
                  <svg className="zn-chev" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="zn-drop">
                  {products.map((p) => (
                    <Link key={p.label} className="zn-dd" to="/product">
                      <div className="zn-dd-ic">
                        <span style={{ fontSize: "15px" }}>{p.icon}</span>
                      </div>
                      <div>
                        <div className="zn-dd-title">{p.label}</div>
                        <div className="zn-dd-sub">{p.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </li>
              <li className="zn-item">
                <Link
                  className={`zn-lnk${active("/pricing") ? " active" : ""}`}
                  to="/pricing"
                >
                  <span className="zn-pip" /> Pricing{" "}
                  <span className="zn-free">FREE</span>
                </Link>
              </li>
              <li className="zn-item">
                <Link
                  className={`zn-lnk${active("/support") ? " active" : ""}`}
                  to="/support"
                >
                  <span className="zn-pip" /> Support
                </Link>
              </li>
            </ul>

            <div className="zn-right">
              <Link className="zn-login" to="/login">
                Log in
              </Link>
              <Link className="zn-cta" to="/signup">
                Open account
                <span className="zn-cta-arr">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <button
                className={`zn-hbg${open ? " open" : ""}`}
                onClick={() => setOpen((o) => !o)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className={`zn-mob${open ? " open" : ""}`}>
            <div className="zn-mob-inner">
              {[
                ["About", "/about"],
                ["Products", "/product"],
                ["Pricing", "/pricing"],
                ["Support", "/support"],
              ].map(([l, p]) => (
                <Link
                  key={p}
                  className={`zn-mob-lnk${active(p) ? " active" : ""}`}
                  to={p}
                >
                  {l}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))}
              <div className="zn-mob-acts">
                <Link className="zn-login" to="/login">
                  Log in
                </Link>
                <Link className="zn-cta" to="/signup">
                  Open account →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Strip */}
        {!active("/login") && !active("/signup") && (
          <div className="zn-ticker">
            <div className="zn-ticker-track">
              {[...tickers, ...tickers].map((t, i) => (
                <React.Fragment key={i}>
                  <span className="zn-ti">
                    <span className="zn-ti-n">{t.symbol}</span>
                    <span>₹{t.price}</span>
                    <span className={t.up ? "zn-up" : "zn-dn"}>
                      {t.up ? "▲" : "▼"} {t.change}
                    </span>
                  </span>
                  <span className="zn-sep" />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
