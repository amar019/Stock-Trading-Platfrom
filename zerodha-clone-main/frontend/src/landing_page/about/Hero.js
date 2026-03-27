import React from "react";

function Hero() {
  return (
    <>
      <style>{`
        .hero-wrap { font-family: 'DM Sans', sans-serif; background: #fff; }
        .hero-beyond { padding: 72px 20px; background: #fafafa; border-bottom: 1px solid #f0f0f0; }
        .hero-beyond-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .hero-beyond-left h2 { font-size: clamp(24px, 3vw, 38px); font-weight: 600; color: #111; line-height: 1.2; letter-spacing: -1px; margin-bottom: 16px; }
        .hero-beyond-left h2 span { color: #ff5e3a; }
        .hero-beyond-left p { font-size: 14px; color: #777; line-height: 1.8; margin-bottom: 24px; }
        .hero-feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .hero-feature-list li { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #444; }
        .hero-feature-list li::before { content: ''; width: 7px; height: 7px; background: #ff5e3a; border-radius: 50%; flex-shrink: 0; }
        .hero-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hero-card { background: #fff; border: 1px solid #efefef; border-radius: 12px; padding: 20px; transition: box-shadow 0.2s; }
        .hero-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .hero-card-icon { width: 36px; height: 36px; background: #fff5f3; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 16px; }
        .hero-card h6 { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .hero-card p { font-size: 12px; color: #aaa; margin: 0; line-height: 1.6; }
        @media (max-width: 768px) { .hero-beyond-inner { grid-template-columns: 1fr; gap: 36px; } }
      `}</style>

      <div className="hero-wrap">
        <section className="hero-beyond">
          <div className="hero-beyond-inner">
            <div className="hero-beyond-left">
              <h2>Everything you need<br />to <span>invest smarter.</span></h2>
              <p>From powerful trading tools to educational resources, Zerodha gives you everything to make informed decisions — whether you're a first-time investor or a seasoned trader.</p>
              <ul className="hero-feature-list">
                <li>Zero brokerage on equity delivery investments</li>
                <li>Flat ₹20 per order on intraday &amp; F&amp;O</li>
                <li>Free direct mutual fund investments via Coin</li>
                <li>Learn investing with Varsity — free education platform</li>
                <li>SEBI registered &amp; trusted since 2010</li>
              </ul>
            </div>
            <div className="hero-cards">
              {[
                { icon: "📈", title: "Kite", desc: "Fast, intuitive trading platform for stocks & F&O" },
                { icon: "🪙", title: "Coin", desc: "Invest in direct mutual funds with zero commission" },
                { icon: "📚", title: "Varsity", desc: "Free stock market education for every Indian" },
                { icon: "📊", title: "Console", desc: "Your complete portfolio & reports dashboard" },
              ].map(({ icon, title, desc }) => (
                <div className="hero-card" key={title}>
                  <div className="hero-card-icon">{icon}</div>
                  <h6>{title}</h6>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
