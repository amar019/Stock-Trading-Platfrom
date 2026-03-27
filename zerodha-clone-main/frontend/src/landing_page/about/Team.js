import React, { useState } from "react";

const team = [
  {
    name: "Amar Kaygude",
    role: "Project Builder · Full Stack Developer",
    desc: "Built this Zerodha clone as a full stack project using React, Node.js and MongoDB. Computer Science student at SPPU University passionate about fintech.",
    initials: "AK",
    color: "linear-gradient(135deg, #16a34a, #387ed1)",
    isBuilder: true,
    github: "https://github.com/amar019",
    linkedin: "https://www.linkedin.com/in/amarkaygude/",
    email: "amarkaygude09@gmail.com",
  },
  {
    name: "Nithin Kamath",
    role: "Founder & CEO",
    desc: "Nithin founded Zerodha in 2010 with a vision to make trading accessible and affordable for every Indian. He is one of India's most influential voices in fintech.",
    initials: "NK",
    color: "#ff5e3a",
    img: "https://zerodha.com/static/images/nithin-kamath.jpg",
  },
  {
    name: "Nikhil Kamath",
    role: "Co-Founder",
    desc: "Nikhil co-founded Zerodha and has been instrumental in shaping the company's trading and investment philosophy. He also runs True Beacon.",
    initials: "NK",
    color: "#111",
    img: "https://zerodha.com/static/images/nikhil-kamath.jpg",
  },
  {
    name: "Kailash Nadh",
    role: "Chief Technology Officer",
    desc: "Kailash leads Zerodha's technology and is the brain behind Kite, one of India's most loved trading platforms. Open source enthusiast.",
    initials: "KN",
    color: "#2d6be4",
    img: "https://zerodha.com/static/images/kailash-nadh.jpg",
  },
  {
    name: "Venu Madhav",
    role: "Chief Operating Officer",
    desc: "Venu oversees Zerodha's operations and ensures seamless experience for millions of customers across all platforms and products.",
    initials: "VM",
    color: "#16a34a",
    img: "https://zerodha.com/static/images/venu-madhav.jpg",
  },
  {
    name: "Seema Patil",
    role: "Head of Compliance",
    desc: "Seema ensures Zerodha stays ahead of regulatory requirements, maintaining trust and transparency with SEBI and other governing bodies.",
    initials: "SP",
    color: "#9333ea",
    img: "https://zerodha.com/static/images/seema-patil.jpg",
  },
  {
    name: "Hanan Delvi",
    role: "Head of Marketing",
    desc: "Hanan drives Zerodha's brand and community initiatives, building one of India's most organic and trusted financial communities.",
    initials: "HD",
    color: "#0891b2",
    img: "https://zerodha.com/static/images/hanan-delvi.jpg",
  },
];

const TeamCard = ({ name, role, desc, initials, color, img, isBuilder, github, linkedin, email }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`team-card ${isBuilder ? "team-card-builder" : ""}`}>
      {isBuilder && <div className="team-builder-badge">🛠️ Project Builder</div>}
      {img && !imgError ? (
        <img src={img} alt={name} className="team-photo" onError={() => setImgError(true)} />
      ) : (
        <div className="team-avatar" style={{ background: color }}>{initials}</div>
      )}
      <div className="team-name">{name}</div>
      <div className={`team-role ${isBuilder ? "team-role-builder" : ""}`}>{role}</div>
      <div className="team-divider" />
      <p className="team-desc">{desc}</p>
      {isBuilder && (
        <div className="team-builder-links">
          <a href={github} target="_blank" rel="noopener noreferrer" className="team-builder-link">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="team-builder-link">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href={`mailto:${email}`} className="team-builder-link">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Email
          </a>
        </div>
      )}
    </div>
  );
};

const Team = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .team-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          padding: 60px 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        /* ── Builder Spotlight ── */
        .team-builder-spotlight {
          max-width: 1100px;
          margin: 0 auto 64px;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
          border: 1.5px solid #bbf7d0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        .team-builder-spotlight::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #16a34a, #387ed1);
        }
        .team-builder-spotlight-inner {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px;
          padding: 36px 40px;
          align-items: center;
        }
        .team-builder-spotlight-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          border-right: 1px solid rgba(22,163,74,0.15);
          padding-right: 40px;
        }
        .team-avatar-lg {
          width: 80px !important;
          height: 80px !important;
          font-size: 24px !important;
          border-radius: 50%;
        }
        .team-builder-spotlight-right { display: flex; flex-direction: column; }

        @media (max-width: 700px) {
          .team-builder-spotlight-inner { grid-template-columns: 1fr; gap: 24px; }
          .team-builder-spotlight-left { border-right: none; border-bottom: 1px solid rgba(22,163,74,0.15); padding-right: 0; padding-bottom: 24px; }
        }

        .team-header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto 64px;
        }

        .team-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ff5e3a;
          background: #fff5f3;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        .team-header h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 600;
          color: #111;
          letter-spacing: -1px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .team-header p {
          font-size: 15px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .team-card {
          border: 1px solid #efefef;
          border-radius: 14px;
          padding: 32px 28px;
          background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .team-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        .team-card-builder {
          border: 1.5px solid #bbf7d0;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
          position: relative;
          overflow: hidden;
        }
        .team-card-builder:hover {
          box-shadow: 0 8px 32px rgba(22,163,74,0.12);
          transform: translateY(-3px);
        }
        .team-card-builder::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #16a34a, #387ed1);
          border-radius: 14px 14px 0 0;
        }

        .team-builder-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(22,163,74,0.1);
          border: 1px solid rgba(22,163,74,0.25);
          color: #16a34a;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .team-role-builder {
          color: #16a34a !important;
        }

        .team-builder-links {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .team-builder-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          background: #fff;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          transition: all 0.15s;
        }
        .team-builder-link:hover {
          color: #16a34a;
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .team-photo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
          border: 2px solid #f0f0f0;
        }

        .team-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .team-name {
          font-size: 16px;
          font-weight: 600;
          color: #111;
          margin-bottom: 4px;
        }

        .team-role {
          font-size: 12.5px;
          font-weight: 500;
          color: #ff5e3a;
          margin-bottom: 14px;
          letter-spacing: 0.3px;
        }

        .team-desc {
          font-size: 13.5px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        .team-divider {
          width: 32px;
          height: 2px;
          background: #f0f0f0;
          margin: 14px 0;
          border-radius: 2px;
        }

        @media (max-width: 992px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 576px) {
          .team-grid { grid-template-columns: 1fr; }
          .team-wrap { padding: 60px 20px; }
        }
      `}</style>

      <section className="team-wrap">

        {/* ── Section Header ── */}
        <div className="team-header">
          <span className="team-eyebrow">The People Behind Zerodha</span>
          <h2>Led by passion,<br />driven by purpose.</h2>
          <p>A small, focused team that has built India's largest stock broker from the ground up — without external funding.</p>
        </div>

        {/* ── Team Grid (Zerodha team only) ── */}
        <div className="team-grid">
          {team.filter(m => !m.isBuilder).map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

      </section>
    </>
  );
};

export default Team;
