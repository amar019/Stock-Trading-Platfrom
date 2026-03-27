import React, { useState } from "react";

const categories = [
  "Account opening",
  "Login & password",
  "Funds & payments",
  "Trading & orders",
  "Demat & holdings",
  "Charges & billing",
  "Other",
];

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  fontSize: "14px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  outline: "none",
  color: "#222",
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: "sans-serif",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "#444",
  marginBottom: "6px",
};

const CreateTicket = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    description: "",
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.name &&
      form.email &&
      form.category &&
      form.subject &&
      form.description
    ) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "#f9f9f6",
          padding: "64px 24px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#EAF3DE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3B6D11"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#222",
            marginBottom: "10px",
          }}
        >
          Ticket submitted!
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#777",
            marginBottom: "28px",
            lineHeight: 1.6,
          }}
        >
          We've received your request and will get back to you at{" "}
          <strong style={{ color: "#222" }}>{form.email}</strong> shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              category: "",
              subject: "",
              description: "",
              file: null,
            });
          }}
          style={{
            padding: "10px 28px",
            background: "#387ed1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}
        >
          Submit another ticket
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f9f9f6",
        padding: "56px 24px 64px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              color: "#222",
              marginBottom: "10px",
            }}
          >
            Create a support ticket
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#777",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Can't find an answer? Fill in the details and we'll get back to you
            within 24 hours.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "32px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={labelStyle}>
                  Full name <span style={{ color: "#e24b4a" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={labelStyle}>
                  Email address <span style={{ color: "#e24b4a" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                Category <span style={{ color: "#e24b4a" }}>*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  color: form.category ? "#222" : "#aaa",
                }}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                Subject <span style={{ color: "#e24b4a" }}>*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Brief summary of your issue"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                Description <span style={{ color: "#e24b4a" }}>*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your issue in detail..."
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={labelStyle}>
                Attachment{" "}
                <span style={{ color: "#aaa", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <div
                style={{
                  border: "1px dashed #d0d0d0",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  background: "#fafafa",
                  cursor: "pointer",
                }}
                onClick={() => document.getElementById("file-input").click()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: "block", margin: "0 auto 8px" }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                  {form.file
                    ? form.file.name
                    : "Click to upload a screenshot or file"}
                </p>
                <input
                  id="file-input"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  accept="image/*,.pdf"
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: "#387ed1",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "sans-serif",
              }}
            >
              Submit ticket
            </button>

            <p
              style={{
                fontSize: "12px",
                color: "#aaa",
                textAlign: "center",
                marginTop: "16px",
                marginBottom: 0,
              }}
            >
              By submitting, you agree to Zerodha's{" "}
              <a
                href="https://zerodha.com/privacy"
                style={{ color: "#387ed1", textDecoration: "none" }}
              >
                privacy policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
