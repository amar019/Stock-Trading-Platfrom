import React from "react";

export default function ProfileSection() {
  return (
    <>
      <style>{`
        .profile-section {
          background: #ffffff;
          padding: 64px 24px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid #f0f0f0;
        }
        .profile-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .profile-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(56,126,209,0.05) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .profile-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        .profile-header { display: flex; align-items: center; gap: 28px; margin-bottom: 40px; flex-wrap: wrap; }
        .profile-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #387ed1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; color: #fff;
          flex-shrink: 0; box-shadow: 0 0 0 4px rgba(22,163,74,0.15);
        }
        .profile-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3vw, 36px); font-weight: 800;
          color: #0f172a; letter-spacing: -0.02em; margin-bottom: 6px;
        }
        .profile-title { font-size: 14px; color: #16a34a; font-weight: 600; margin-bottom: 10px; }
        .profile-contact-row { display: flex; flex-wrap: wrap; gap: 14px; }
        .profile-contact-item {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; color: #64748b; text-decoration: none; transition: color 0.15s;
        }
        .profile-contact-item:hover { color: #0f172a; }

        .profile-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
        .profile-cards-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pcard {
          background: #ffffff; border: 1.5px solid #e2e8f0;
          border-radius: 16px; padding: 22px 24px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .pcard:hover { border-color: #16a34a; box-shadow: 0 4px 20px rgba(22,163,74,0.08); transform: translateY(-2px); }
        .pcard-icon { font-size: 22px; margin-bottom: 12px; display: block; }
        .pcard-title { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }

        .pcard-summary-text { font-size: 13px; color: #475569; line-height: 1.7; }
        .pcard-summary-text span { color: #16a34a; font-weight: 600; }

        .skill-group { margin-bottom: 10px; }
        .skill-group:last-child { margin-bottom: 0; }
        .skill-group-label { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill-tag { font-size: 11px; font-weight: 500; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; padding: 3px 9px; border-radius: 999px; }

        .edu-item { margin-bottom: 14px; }
        .edu-item:last-child { margin-bottom: 0; }
        .edu-degree { font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 2px; }
        .edu-school { font-size: 12px; color: #64748b; }
        .edu-year { font-size: 11px; color: #16a34a; font-weight: 500; margin-top: 2px; }

        .exp-item { margin-bottom: 14px; }
        .exp-item:last-child { margin-bottom: 0; }
        .exp-role { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .exp-company { font-size: 12px; color: #64748b; }
        .exp-period { font-size: 11px; color: #16a34a; font-weight: 500; margin-bottom: 8px; }
        .exp-bullets { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .exp-bullets li { font-size: 11.5px; color: #64748b; line-height: 1.5; padding-left: 12px; position: relative; }
        .exp-bullets li::before { content: '·'; position: absolute; left: 0; color: #16a34a; font-weight: 700; }

        .proj-item { margin-bottom: 16px; }
        .proj-item:last-child { margin-bottom: 0; }
        .proj-name { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
        .proj-tag { font-size: 10px; font-weight: 600; color: #387ed1; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 4px; }
        .proj-desc { font-size: 11.5px; color: #64748b; line-height: 1.55; }

        .profile-cta { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
        .profile-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          background: #16a34a; color: #fff;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          padding: 10px 22px; border-radius: 8px; border: none;
          text-decoration: none; cursor: pointer;
          transition: background 0.18s, transform 0.18s;
          box-shadow: 0 4px 16px rgba(22,163,74,0.25);
        }
        .profile-btn-primary:hover { background: #15803d; transform: translateY(-1px); color: #fff; }
        .profile-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: #475569; font-size: 13px; font-weight: 500;
          padding: 10px 20px; border-radius: 8px; border: 1.5px solid #e2e8f0;
          text-decoration: none; cursor: pointer; transition: all 0.18s;
        }
        .profile-btn-ghost:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }

        @media (max-width: 900px) { .profile-cards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .profile-cards, .profile-cards-row2 { grid-template-columns: 1fr; } }
      `}</style>

      <section className="profile-section">
        <div className="profile-inner">

          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">AK</div>
            <div>
              <div className="profile-name">Amar Kaygude</div>
              <div className="profile-title">💻 MERN Stack Developer · Full Stack Developer</div>
              <div className="profile-contact-row">
                <a className="profile-contact-item" href="tel:+917744949305">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91 7744949305
                </a>
                <a className="profile-contact-item" href="mailto:amarkaygude09@gmail.com">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  amarkaygude09@gmail.com
                </a>
                <a className="profile-contact-item" href="https://www.linkedin.com/in/amarkaygude/" target="_blank" rel="noopener noreferrer">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin.com/in/amarkaygude
                </a>
                <a className="profile-contact-item" href="https://github.com/amar019" target="_blank" rel="noopener noreferrer">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  github.com/amar019
                </a>
                <span className="profile-contact-item">📍 Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Row 1 */}
          <div className="profile-cards">
            <div className="pcard">
              <span className="pcard-icon">👤</span>
              <div className="pcard-title">Summary</div>
              <p className="pcard-summary-text">
                <span>MERN Stack Developer</span> with hands-on experience building responsive web apps using <span>React.js</span>, <span>Node.js</span>, and <span>MongoDB</span>. Passionate about clean UI, reusable components, and performance optimization. Currently working at <span>Luminoid Technology</span>.
              </p>
            </div>
            <div className="pcard">
              <span className="pcard-icon">🛠️</span>
              <div className="pcard-title">Skills</div>
              <div className="skill-group">
                <div className="skill-group-label">Frontend</div>
                <div className="skill-tags">{["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Bootstrap"].map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              </div>
              <div className="skill-group">
                <div className="skill-group-label">Backend</div>
                <div className="skill-tags">{["Node.js", "Express.js", "REST APIs"].map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              </div>
              <div className="skill-group">
                <div className="skill-group-label">Database</div>
                <div className="skill-tags">{["MongoDB", "SQL"].map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              </div>
            </div>
            <div className="pcard">
              <span className="pcard-icon">🎓</span>
              <div className="pcard-title">Education</div>
              <div className="edu-item">
                <div className="edu-degree">BE – Computer Engineering</div>
                <div className="edu-school">Savitribai Phule Pune University</div>
                <div className="edu-year">Nov 2021 – June 2025</div>
              </div>
              <div className="edu-item">
                <div className="edu-degree">HSC (12th)</div>
                <div className="edu-school">L.N.H.V.J</div>
                <div className="edu-year">2020 – 2021</div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="profile-cards-row2">
            <div className="pcard">
              <span className="pcard-icon">💼</span>
              <div className="pcard-title">Experience</div>
              <div className="exp-item">
                <div className="exp-role">Full Stack Developer</div>
                <div className="exp-company">Luminoid Technology</div>
                <div className="exp-period">Current</div>
              </div>
              <div className="exp-item">
                <div className="exp-role">Full Stack Developer Intern</div>
                <div className="exp-company">Sumago Infotech Pvt Ltd, Pune</div>
                <div className="exp-period">Dec 2023 – Jan 2024</div>
                <ul className="exp-bullets">
                  <li>Built RESTful APIs using Node.js & Express.js for CRUD operations</li>
                  <li>Built responsive pages using React.js, HTML, CSS & JavaScript</li>
                  <li>Integrated REST APIs with Axios and React Hooks for real-time data</li>
                  <li>Contributed to login pages, dashboards, and contact modules</li>
                </ul>
              </div>
            </div>
            <div className="pcard">
              <span className="pcard-icon">🚀</span>
              <div className="pcard-title">Projects</div>
              <div className="proj-item">
                <div className="proj-name">QTrack – Student Management System</div>
                <div className="proj-tags">{["React.js", "Bootstrap", "localStorage"].map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <div className="proj-desc">Responsive web app to manage student data with secure auth, full CRUD, reusable components and animations.</div>
              </div>
              <div className="proj-item">
                <div className="proj-name">TravelMate – Full Stack Web App</div>
                <div className="proj-tags">{["Node.js", "Express.js", "MongoDB", "React.js"].map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <div className="proj-desc">Travel listings platform with Passport.js auth, RESTful APIs, and a React.js frontend.</div>
              </div>
              <div className="proj-item">
                <div className="proj-name">Zerodha Clone</div>
                <div className="proj-tags">{["React.js", "Node.js", "MongoDB"].map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <div className="proj-desc">Full stack trading platform clone with live ticker, dashboard, holdings, orders and authentication.</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="profile-cta">
            <a className="profile-btn-primary" href="https://www.linkedin.com/in/amarkaygude/" target="_blank" rel="noopener noreferrer">View LinkedIn Profile →</a>
            <a className="profile-btn-ghost" href="https://github.com/amar019" target="_blank" rel="noopener noreferrer">GitHub Projects</a>
            <a
              className="profile-btn-ghost"
              href="https://wa.me/917744949305?text=Hi%20Amar%2C%20I%20came%20across%20your%20profile%20and%20would%20like%20to%20discuss%20a%20job%20opportunity%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
            >💬 Hire Me</a>
          </div>

        </div>
      </section>
    </>
  );
}
