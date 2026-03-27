import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";

const indices = [
  { label: "NIFTY 50",   value: "22,415.00", pct: "+0.93%", up: true  },
  { label: "SENSEX",     value: "73,852.10", pct: "+1.02%", up: true  },
  { label: "BANK NIFTY", value: "48,120.35", pct: "-0.23%", up: false },
];

const INIT_NOTIFS = [
  { title: "Order Executed", body: "INFY BUY 1 × ₹1,555.45 executed successfully", time: "Just now",       color: "#10b981", read: false,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  { title: "Price Alert",    body: "RELIANCE crossed ₹2,100 — your target hit",      time: "5 min ago",     color: "#f59e0b", read: false,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { title: "Funds Added",    body: "₹5,000 added to your account via UPI",           time: "1 hr ago",      color: "#387ed1", read: false,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#387ed1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { title: "Market Opening", body: "Markets open at 9:15 AM. NIFTY futures up 0.4%", time: "Today, 9:10 AM", color: "#8b5cf6", read: true,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { title: "Order Rejected", body: "TCS SELL rejected — insufficient holdings",       time: "Yesterday",     color: "#ef4444", read: true,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> },
];

const TopBar = () => {
  const [time,          setTime]          = useState(new Date());
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [search,        setSearch]        = useState("");
  const [notifOpen,     setNotifOpen]     = useState(false);
  const [notifications, setNotifications] = useState(INIT_NOTIFS);
  const notifRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unread   = notifications.filter(n => !n.read).length;
  const mins     = time.getHours() * 60 + time.getMinutes();
  const mktOpen  = mins >= 555 && mins <= 930;

  const markRead    = (i) => setNotifications(prev => prev.map((n, j) => j === i ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll    = () => setNotifications([]);

  return (
    <div style={{ width:"100%", height:56, display:"flex", alignItems:"center", background:"#fff", borderBottom:"1px solid #e8eaed", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:100 }}>

      {/* Indices */}
      <div style={{ width:280, height:"100%", flexShrink:0, borderRight:"1px solid #e8eaed", display:"flex", alignItems:"center", padding:"0 16px" }}>
        {indices.slice(0,2).map((idx, i) => (
          <React.Fragment key={idx.label}>
            {i > 0 && <div style={{ width:1, height:28, background:"#e8eaed", margin:"0 12px" }} />}
            <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
              <span style={{ fontSize:10, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.4px" }}>{idx.label}</span>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111827" }}>{idx.value}</span>
                <span style={{ fontSize:10, fontWeight:600, color: idx.up?"#10b981":"#ef4444" }}>{idx.pct}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Menu + right controls */}
      <div style={{ flex:1, height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px 0 0" }}>
        <Menu />

        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>

          {/* Search */}
          <div style={{ position:"relative" }}>
            {searchOpen ? (
              <div style={{ display:"flex", alignItems:"center", background:"#f9fafb", border:"1.5px solid #387ed1", borderRadius:8, padding:"5px 10px", gap:6, boxShadow:"0 0 0 3px rgba(56,126,209,0.1)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
                  onBlur={() => { setSearchOpen(false); setSearch(""); }}
                  placeholder="Search stocks..."
                  style={{ border:"none", outline:"none", background:"transparent", fontSize:12, fontFamily:"Inter,sans-serif", width:140, color:"#111827" }}
                />
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={{ width:32, height:32, borderRadius:8, border:"1px solid #e8eaed", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
            )}
          </div>

          {/* Notification bell */}
          <div ref={notifRef} style={{ position:"relative" }}>
            <button
              onClick={() => setNotifOpen(o => !o)}
              style={{ width:32, height:32, borderRadius:8, border:`1.5px solid ${notifOpen?"#387ed1":"#e8eaed"}`, background:notifOpen?"#eff6ff":"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={notifOpen?"#387ed1":"#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              {unread > 0 && (
                <span style={{ position:"absolute", top:-4, right:-4, minWidth:16, height:16, borderRadius:8, background:"#ef4444", border:"2px solid #fff", fontSize:9, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"0 3px" }}>
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:320, background:"#fff", border:"1px solid #e8eaed", borderRadius:14, boxShadow:"0 12px 40px rgba(0,0,0,0.14)", zIndex:9999, overflow:"hidden" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f3f4f6" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>Notifications</span>
                    {unread > 0 && <span style={{ fontSize:10, fontWeight:700, color:"#fff", background:"#ef4444", borderRadius:20, padding:"1px 7px" }}>{unread} new</span>}
                  </div>
                  {unread > 0 && (
                    <button onClick={markAllRead} style={{ fontSize:11, fontWeight:600, color:"#387ed1", background:"none", border:"none", cursor:"pointer", padding:0 }}>
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div style={{ maxHeight:340, overflowY:"auto" }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding:"40px 16px", textAlign:"center" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin:"0 auto 10px", display:"block" }}>
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                      </svg>
                      <p style={{ fontSize:13, color:"#9ca3af", margin:0 }}>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} onClick={() => markRead(i)}
                        style={{ display:"flex", gap:12, padding:"12px 16px", borderBottom:"1px solid #f9fafb", background: n.read?"#fff":"#f8faff", cursor:"pointer", transition:"background 0.12s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                        onMouseLeave={e => e.currentTarget.style.background = n.read?"#fff":"#f8faff"}
                      >
                        <div style={{ width:36, height:36, borderRadius:10, background:n.color+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {n.icon}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
                            <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>{n.title}</p>
                            {!n.read && <span style={{ width:7, height:7, borderRadius:"50%", background:"#387ed1", flexShrink:0 }} />}
                          </div>
                          <p style={{ fontSize:11, color:"#6b7280", margin:"3px 0 0", lineHeight:1.4 }}>{n.body}</p>
                          <p style={{ fontSize:10, color:"#9ca3af", margin:"4px 0 0" }}>{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div style={{ padding:"10px 16px", borderTop:"1px solid #f3f4f6", display:"flex", justifyContent:"center" }}>
                    <button onClick={clearAll} style={{ fontSize:11, fontWeight:600, color:"#9ca3af", background:"none", border:"none", cursor:"pointer" }}>
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Market status + clock */}
          <div style={{ display:"flex", alignItems:"center", gap:6, background: mktOpen?"#f0fdf4":"#fef2f2", border:`1px solid ${mktOpen?"#bbf7d0":"#fecaca"}`, borderRadius:8, padding:"5px 10px" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background: mktOpen?"#10b981":"#ef4444", animation: mktOpen?"mkt-pulse 2s infinite":"none" }} />
            <span style={{ fontSize:11, fontWeight:600, color: mktOpen?"#15803d":"#b91c1c" }}>{mktOpen?"Market Open":"Market Closed"}</span>
            <span style={{ fontSize:11, color:"#9ca3af", borderLeft:"1px solid #e8eaed", paddingLeft:6 }}>
              {time.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
            </span>
          </div>

          {/* BANK NIFTY */}
          <div style={{ display:"flex", alignItems:"center", gap:5, background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:8, padding:"5px 10px" }}>
            <span style={{ fontSize:10, fontWeight:600, color:"#9ca3af", textTransform:"uppercase" }}>BANK NIFTY</span>
            <span style={{ fontSize:11, fontWeight:700, color:"#111827" }}>48,120</span>
            <span style={{ fontSize:10, fontWeight:600, color:"#ef4444" }}>-0.23%</span>
          </div>

        </div>
      </div>

      <style>{`@keyframes mkt-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
};

export default TopBar;
