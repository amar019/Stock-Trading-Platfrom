import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const rawName = (() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    if (urlName) {
      localStorage.setItem("name", urlName);
      return urlName;
    }
    return localStorage.getItem("name") || "User";
  })();
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
  const initials = name.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "http://localhost:3001/login";
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Holdings", path: "/holdings" },
    { label: "Positions", path: "/positions" },
    { label: "Funds", path: "/funds" },
    { label: "Apps", path: "/apps" },
  ];

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "36px" }} alt="logo" />
      <div className="menus">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link style={{ textDecoration: "none" }} to={item.path}>
                <p className={location.pathname === item.path ? "menu selected" : "menu"}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
          <div className="avatar">{initials}</div>
          <p className="username">{name}</p>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "4px", color: "#9ca3af" }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isProfileDropdownOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "#fff", border: "1px solid #e8eaed",
              borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              zIndex: 999, minWidth: "160px", overflow: "hidden"
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6" }}>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827" }}>{name}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Zerodha Account</p>
              </div>
              <div
                onClick={handleLogout}
                style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#ef4444", fontSize: "13px", fontWeight: "500", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
