import React, { useState } from "react";

const topics = [
  "Account opening",
  "Login & password",
  "Funds & payments",
  "Trading & orders",
  "Demat & holdings",
  "Charges & billing",
];

const Hero = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(
        `https://support.zerodha.com/search?q=${encodeURIComponent(query)}`,
        "_blank",
      );
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "64px 24px 56px",
        fontFamily: "sans-serif",
        background: "#f9f9f6",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 600,
          color: "#222",
          marginBottom: "12px",
          lineHeight: 1.25,
        }}
      >
        How can we help you?
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "#777",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        Search our support articles or browse topics below
      </p>

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "540px",
          margin: "0 auto 40px",
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#aaa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: "16px", flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search for answers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "14px 12px",
            fontSize: "15px",
            color: "#222",
            background: "transparent",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#387ed1",
            color: "#fff",
            border: "none",
            padding: "0 24px",
            height: "50px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {topics.map((topic) => (
          <span
            key={topic}
            style={{
              display: "inline-block",
              padding: "6px 16px",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#444",
              cursor: "pointer",
            }}
            onClick={() => setQuery(topic)}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Hero;
