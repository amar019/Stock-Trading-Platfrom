import React from "react";

const stats = [
  { value: "₹0", label: "Equity delivery" },
  { value: "₹20", label: "Intraday / F&O" },
  { value: "₹0", label: "Direct mutual funds" },
];

const Hero = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "64px 24px 48px",
        fontFamily: "sans-serif",
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: "#EAF3DE",
          color: "#3B6D11",
          fontWeight: 500,
          fontSize: "13px",
          padding: "4px 14px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        Free equity investments
      </span>

      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 600,
          lineHeight: 1.25,
          marginBottom: "16px",
          color: "#222",
        }}
      >
        Pricing that's simple,
        <br />
        transparent, and fair
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          maxWidth: "500px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}
      >
        Free equity delivery and direct mutual funds. Flat ₹20 or 0.03%
        (whichever is lower) for intraday and F&amp;O trades.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          border: "1px solid #e8e8e8",
          borderRadius: "10px",
          overflow: "hidden",
          maxWidth: "560px",
          margin: "0 auto 40px",
        }}
      >
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              minWidth: "140px",
              padding: "20px 16px",
              borderRight: i < stats.length - 1 ? "1px solid #e8e8e8" : "none",
            }}
          >
            <div
              style={{ fontSize: "1.75rem", fontWeight: 600, color: "#222" }}
            >
              {value}
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://zerodha.com/open-account"
          style={{
            background: "#387ed1",
            color: "#fff",
            padding: "10px 28px",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "14px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Open a free account
        </a>
        <a
          href="https://zerodha.com/charges"
          style={{
            background: "transparent",
            color: "#444",
            padding: "10px 28px",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "14px",
            textDecoration: "none",
            border: "1px solid #ccc",
            display: "inline-block",
          }}
        >
          View all charges
        </a>
      </div>
    </div>
  );
};

export default Hero;
