import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  Company: [
    { label: "About", to: "/about" },
    { label: "Products", to: "/product" },
    { label: "Pricing", to: "/pricing" },
    { label: "Careers", to: "/about" },
    { label: "Partner", to: "/support" },
  ],
  Support: [
    { label: "Help Center", to: "/support" },
    { label: "Contact Us", to: "/support" },
    { label: "Status", to: "/support" },
    { label: "Community", to: "/support" },
  ],
  Account: [
    { label: "Open Account", to: "/signup" },
    { label: "Login", to: "/login" },
    { label: "Trading Platform", to: "/product" },
    { label: "Console", to: "/product" },
  ],
  Learn: [
    { label: "Varsity", href: "https://zerodha.com/varsity/" },
    { label: "Trading Q&A", href: "https://tradingqna.com/" },
    { label: "Kite Connect", href: "https://kite.trade/" },
    { label: "Blog", href: "https://zerodha.com/z-connect/" },
  ],
};

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .zf-footer {
          background: #0f172a;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── CTA Banner ── */
        .zf-banner {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 40px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .zf-banner-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(22,163,74,0.12);
          border: 1px solid rgba(22,163,74,0.25);
          color: #4ade80;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
        }
        .zf-banner-dot {
          width: 5px; height: 5px;
          background: #4ade80;
          border-radius: 50%;
          animation: zf-pulse 2s infinite;
        }
        @keyframes zf-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.7); }
        }
        .zf-banner-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .zf-banner-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
        .zf-banner-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .zf-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          background: #16a34a; color: #fff;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          padding: 10px 22px; border-radius: 8px; border: none;
          cursor: pointer; text-decoration: none;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(22,163,74,0.3);
        }
        .zf-btn-primary:hover { background: #15803d; transform: translateY(-1px); color: #fff; }
        .zf-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: #94a3b8;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          padding: 10px 20px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; text-decoration: none; transition: all 0.18s;
        }
        .zf-btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #f1f5f9; background: rgba(255,255,255,0.05); }

        /* ── Links Grid ── */
        .zf-links-wrap {
          padding: 48px 64px 40px;
          display: grid;
          grid-template-columns: 1.6fr repeat(4, 1fr);
          gap: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Brand column */
        .zf-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 12px;
        }
        .zf-logo-mark {
          width: 32px; height: 32px; background: #16a34a; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; color: #fff;
        }
        .zf-logo-name {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 18px; color: #f1f5f9; letter-spacing: -0.3px;
        }
        .zf-brand-desc {
          font-size: 12.5px; color: #475569; line-height: 1.7;
          margin-bottom: 14px; max-width: 220px;
        }
        .zf-tech-badges { display: flex; flex-wrap: wrap; gap: 6px; }
        .zf-badge {
          font-size: 10px; font-weight: 600; color: #64748b;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 3px 8px; border-radius: 4px; letter-spacing: 0.04em;
        }

        /* Link columns */
        .zf-col-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #475569; margin-bottom: 16px;
        }
        .zf-link-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .zf-link-item {
          font-size: 13px; color: #64748b; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0;
          width: fit-content; transition: color 0.15s, gap 0.15s;
        }
        .zf-link-item:hover { color: #e2e8f0; gap: 4px; }
        .zf-link-item::after {
          content: '→'; font-size: 11px; opacity: 0;
          transform: translateX(-4px); transition: opacity 0.15s, transform 0.15s;
        }
        .zf-link-item:hover::after { opacity: 1; transform: translateX(0); }

        /* ── Bottom Bar ── */
        .zf-bottom {
          padding: 28px 64px;
          background: #0a0f1e;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        /* Builder card — left side */
        .zf-builder-card {
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 12px 18px;
          transition: border-color 0.2s, background 0.2s;
        }
        .zf-builder-card:hover { border-color: rgba(22,163,74,0.4); background: rgba(22,163,74,0.06); }
        .zf-builder-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #387ed1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0;
        }
        .zf-builder-label { font-size: 10px; color: #475569; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }
        .zf-builder-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #f1f5f9; }
        .zf-builder-role { font-size: 11px; color: #4ade80; font-weight: 500; margin-top: 1px; }

        /* Contact chips — center */
        .zf-contact-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .zf-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 500;
          text-decoration: none; border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8; background: rgba(255,255,255,0.03);
          transition: all 0.18s; white-space: nowrap;
        }
        .zf-chip-github:hover  { color: #e2e8f0; border-color: rgba(226,232,240,0.3); background: rgba(226,232,240,0.06); }
        .zf-chip-linkedin:hover { color: #60a5fa; border-color: rgba(96,165,250,0.3); background: rgba(96,165,250,0.06); }
        .zf-chip-email:hover   { color: #4ade80; border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.06); }
        .zf-chip-phone:hover   { color: #fb923c; border-color: rgba(251,146,60,0.3); background: rgba(251,146,60,0.06); }

        /* Copyright — right side */
        .zf-copy-block { text-align: right; }
        .zf-copyright { font-size: 12.5px; color: #94a3b8; font-weight: 500; }
        .zf-copyright span { color: #4ade80; font-weight: 700; }
        .zf-legal { font-size: 11px; color: #475569; font-style: italic; margin-top: 3px; }

        @media (max-width: 900px) {
          .zf-banner, .zf-bottom { padding: 28px 24px; }
          .zf-links-wrap { grid-template-columns: 1fr 1fr; padding: 36px 24px; gap: 28px; }
          .zf-copy-block { text-align: left; }
        }
        @media (max-width: 560px) {
          .zf-links-wrap { grid-template-columns: 1fr 1fr; }
          .zf-banner-actions { width: 100%; }
          .zf-btn-primary, .zf-btn-ghost { flex: 1; justify-content: center; }
          .zf-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="zf-footer">

        {/* ── CTA Banner ── */}
        <div className="zf-banner">
          <div>
            <div className="zf-banner-eyebrow">
              <span className="zf-banner-dot" />
              Free Account · No AMC
            </div>
            <h3 className="zf-banner-title">Start investing with Zerodha today</h3>
            <p className="zf-banner-sub">₹0 account opening · ₹20 flat per trade · 1.5Cr+ investors trust us</p>
          </div>
          <div className="zf-banner-actions">
            <Link className="zf-btn-primary" to="/signup">Open Free Account →</Link>
            <Link className="zf-btn-ghost" to="/login">Log in</Link>
          </div>
        </div>

        {/* ── Links Grid ── */}
        <div className="zf-links-wrap">

          {/* Brand column */}
          <div>
            <Link className="zf-logo" to="/">
              <div className="zf-logo-mark">Z</div>
              <span className="zf-logo-name">Zerodha</span>
            </Link>
            <p className="zf-brand-desc">
              A Zerodha clone built for learning purposes by Amar Kaygude — Full Stack Developer, SPPU University.
            </p>
            <div className="zf-tech-badges">
              <span className="zf-badge">React</span>
              <span className="zf-badge">Node.js</span>
              <span className="zf-badge">MongoDB</span>
              <span className="zf-badge">SPPU</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="zf-col-title">{section}</div>
              <ul className="zf-link-list">
                {links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <a className="zf-link-item" href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link className="zf-link-item" to={link.to}>{link.label}</Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="zf-bottom">

          {/* Left: Builder card */}
          <div className="zf-builder-card">
            <div className="zf-builder-avatar">AK</div>
            <div>
              <div className="zf-builder-label">Built by</div>
              <div className="zf-builder-name">Amar Kaygude</div>
              <div className="zf-builder-role">💻 Full Stack Developer</div>
            </div>
          </div>

          {/* Center: Contact chips */}
          <div className="zf-contact-chips">
            <a className="zf-chip zf-chip-github" href="https://github.com/amar019" target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a className="zf-chip zf-chip-linkedin" href="https://www.linkedin.com/in/amarkaygude/" target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a className="zf-chip zf-chip-email" href="mailto:amarkaygude09@gmail.com">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              amarkaygude09@gmail.com
            </a>
            <a className="zf-chip zf-chip-phone" href="tel:+917744949305">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 77449 49305
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="zf-copy-block">
            <div className="zf-copyright">© 2025 <span>Amar Kaygude</span>. All rights reserved.</div>
            <div className="zf-legal">Clone project · Not affiliated with Zerodha.</div>
          </div>

        </div>

      </footer>
    </>
  );
}
