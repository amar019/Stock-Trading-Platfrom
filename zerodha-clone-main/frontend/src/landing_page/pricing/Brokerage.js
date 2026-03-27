import React, { useState } from "react";

const notes = [
  "Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.",
  "Digital contract notes will be sent via e-mail.",
  "Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.",
  "For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).",
  "For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).",
  "If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20.",
];

const quickLinks = [
  { label: "Brokerage calculator", icon: "🧮", href: "#" },
  { label: "List of charges", icon: "📋", href: "#" },
  { label: "Tax P&L report", icon: "📊", href: "#" },
  { label: "SEBI circular", icon: "📄", href: "#" },
];

function Brokerage() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .brok-section {
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
          padding: 48px 24px;
          border-top: 1px solid #e2e8f0;
        }

        .brok-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 36px;
          align-items: start;
        }

        .brok-left-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .brok-left-title::before {
          content: '⚠️';
          font-size: 16px;
        }

        .brok-notes {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .brok-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 13px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
          color: #475569;
          line-height: 1.55;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .brok-note:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 10px rgba(15,23,42,0.05);
        }
        .brok-note-dot {
          width: 6px; height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .brok-right-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 14px;
        }
        .brok-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .brok-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          text-decoration: none;
          color: #0f172a;
          font-size: 13px;
          font-weight: 500;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .brok-link:hover {
          border-color: #387ed1;
          box-shadow: 0 4px 16px rgba(56,126,209,0.1);
          transform: translateX(3px);
          color: #387ed1;
        }
        .brok-link-icon {
          font-size: 14px;
          width: 28px; height: 28px;
          background: #f1f5f9;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .brok-link:hover .brok-link-icon { background: #dbeafe; }
        .brok-link-arrow {
          margin-left: auto;
          color: #94a3b8;
          font-size: 16px;
          transition: transform 0.2s, color 0.2s;
        }
        .brok-link:hover .brok-link-arrow {
          transform: translateX(3px);
          color: #387ed1;
        }

        @media (max-width: 768px) {
          .brok-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="brok-section">
        <div className="brok-inner">
          <div>
            <h3 className="brok-left-title">Important notes</h3>
            <ul className="brok-notes">
              {notes.map((note, i) => (
                <li key={i} className="brok-note">
                  <span className="brok-note-dot" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="brok-right-title">Quick links</h3>
            <div className="brok-links">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="brok-link"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="brok-link-icon">{link.icon}</span>
                  {link.label}
                  <span className="brok-link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brokerage;
