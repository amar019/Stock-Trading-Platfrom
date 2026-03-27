import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .nf-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 40px 20px;
        }

        .nf-inner {
          text-align: center;
          max-width: 520px;
        }

        .nf-code {
          font-size: 120px;
          font-weight: 600;
          line-height: 1;
          color: #f0f0f0;
          letter-spacing: -4px;
          margin-bottom: 0;
          position: relative;
        }

        .nf-code span {
          color: #ff5e3a;
        }

        .nf-title {
          font-size: 22px;
          font-weight: 600;
          color: #111;
          margin-bottom: 12px;
        }

        .nf-desc {
          font-size: 15px;
          color: #888;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .nf-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nf-btn-primary {
          background: #ff5e3a;
          color: #fff;
          border: none;
          padding: 11px 28px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.15s;
        }

        .nf-btn-primary:hover {
          background: #e84d2a;
          color: #fff;
        }

        .nf-btn-ghost {
          background: #fff;
          color: #444;
          border: 1px solid #ddd;
          padding: 11px 28px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.15s;
        }

        .nf-btn-ghost:hover {
          border-color: #999;
          color: #111;
        }

        .nf-links {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #f0f0f0;
        }

        .nf-links p {
          font-size: 13px;
          color: #aaa;
          margin-bottom: 16px;
        }

        .nf-quick-links {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nf-quick-links a {
          font-size: 13px;
          color: #555;
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid #eee;
          border-radius: 20px;
          transition: all 0.15s;
        }

        .nf-quick-links a:hover {
          border-color: #ff5e3a;
          color: #ff5e3a;
        }

        .nf-chart {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 5px;
          height: 60px;
          margin-bottom: 28px;
          opacity: 0.15;
        }

        .nf-bar {
          width: 8px;
          background: #ff5e3a;
          border-radius: 3px 3px 0 0;
        }
      `}</style>

      <div className="nf-wrap">
        <div className="nf-inner">
          {/* Decorative mini chart */}
          <div className="nf-chart">
            {[20, 35, 25, 50, 30, 45, 15, 55, 40, 60, 35, 48].map((h, i) => (
              <div key={i} className="nf-bar" style={{ height: `${h}px` }} />
            ))}
          </div>

          {/* 404 */}
          <p className="nf-code">
            4<span>0</span>4
          </p>

          <h1 className="nf-title">This page doesn't exist</h1>
          <p className="nf-desc">
            Looks like you've ventured into uncharted territory. <br />
            The page you're looking for may have moved or never existed.
          </p>

          <div className="nf-actions">
            <Link to="/" className="nf-btn-primary">
              Go to Homepage
            </Link>
            <Link to="/support" className="nf-btn-ghost">
              Contact Support
            </Link>
          </div>

          {/* Quick links */}
          <div className="nf-links">
            <p>Or navigate to one of these pages</p>
            <div className="nf-quick-links">
              <Link to="/about">About</Link>
              <Link to="/product">Products</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/support">Support</Link>
              <Link to="/signup">Open Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
