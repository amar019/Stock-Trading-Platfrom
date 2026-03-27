import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../config";

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SkeletonRow = () => (
  <tr>
    {[35, 14, 10, 14, 14, 14, 12].map((w, i) => (
      <td key={i}>
        <div style={{ height: 13, width: `${w}%`, minWidth: 40, borderRadius: 6, background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "pos-shimmer 1.4s infinite" }} />
      </td>
    ))}
  </tr>
);

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("ALL");
  const [sortKey, setSortKey]     = useState(null);
  const [sortDir, setSortDir]     = useState("asc");

  useEffect(() => {
    axios.get(`${API_BASE}/allPositions`)
      .then(res => { setPositions(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const products = ["ALL", ...new Set(positions.map(p => p.product))];

  const filtered = positions
    .filter(p => filter === "ALL" || p.product === filter)
    .sort((a, b) => {
      if (!sortKey) return 0;
      const pnl = s => (s.price - s.avg) * s.qty;
      const map = { name: s => s.name, qty: s => s.qty, avg: s => s.avg, ltp: s => s.price, pnl };
      const av = map[sortKey](a), bv = map[sortKey](b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const totalPnL    = positions.reduce((a, s) => a + (s.price - s.avg) * s.qty, 0);
  const totalInvest = positions.reduce((a, s) => a + s.avg * s.qty, 0);
  const totalCur    = positions.reduce((a, s) => a + s.price * s.qty, 0);
  const profitCount = positions.filter(s => (s.price - s.avg) * s.qty >= 0).length;
  const lossCount   = positions.length - profitCount;
  const isUp        = totalPnL >= 0;

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 3, opacity: sortKey === k ? 1 : 0.3, fontSize: 9 }}>
      {sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes pos-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .pos-table { width:100%; border-collapse:collapse; }
        .pos-table thead tr { border-bottom:2px solid #f3f4f6; }
        .pos-table th { padding:10px 14px; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px; text-align:left; cursor:pointer; user-select:none; white-space:nowrap; }
        .pos-table th:hover { color:#374151; }
        .pos-table td { padding:13px 14px; font-size:13px; color:#374151; border-bottom:1px solid #f9fafb; vertical-align:middle; }
        .pos-table tbody tr:last-child td { border-bottom:none; }
        .pos-table tbody tr:hover td { background:#fafafa; }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.3px" }}>
            Positions {!loading && <span style={{ fontSize:14, fontWeight:500, color:"#9ca3af" }}>({positions.length})</span>}
          </h3>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>Your open positions for today</p>
        </div>
        <div style={{ fontSize:11, color:"#9ca3af", background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:8, padding:"6px 12px", fontWeight:500 }}>
          {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[
          {
            label: "Day's P&L",
            value: loading ? "—" : `${isUp ? "+" : "-"}₹${fmt(Math.abs(totalPnL))}`,
            color: loading ? "#111827" : isUp ? "#10b981" : "#ef4444",
            bg: loading ? "#f9fafb" : isUp ? "#f0fdf4" : "#fef2f2",
            border: loading ? "#e8eaed" : isUp ? "#bbf7d0" : "#fecaca",
            sub: loading ? "" : `${isUp ? "+" : ""}${totalInvest > 0 ? (((totalPnL) / totalInvest) * 100).toFixed(2) : "0.00"}%`,
          },
          {
            label: "Invested Value",
            value: loading ? "—" : `₹${fmt(totalInvest)}`,
            color: "#111827", bg: "#f9fafb", border: "#e8eaed",
            sub: loading ? "" : `Current: ₹${fmt(totalCur)}`,
          },
          {
            label: "Profitable",
            value: loading ? "—" : profitCount,
            color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0",
            sub: loading ? "" : `${positions.length} total positions`,
          },
          {
            label: "Loss Making",
            value: loading ? "—" : lossCount,
            color: "#ef4444", bg: "#fef2f2", border: "#fecaca",
            sub: loading ? "" : `${positions.length > 0 ? ((lossCount / positions.length) * 100).toFixed(0) : 0}% of positions`,
          },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:12, padding:"16px 18px" }}>
            <p style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", margin:"0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize:20, fontWeight:700, color:s.color, margin:"0 0 4px" }}>{s.value}</p>
            {s.sub && <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      {!loading && positions.length > 0 && (
        <div style={{ display:"flex", gap:6, background:"#f3f4f6", borderRadius:10, padding:4, marginBottom:16, width:"fit-content" }}>
          {products.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"6px 18px", borderRadius:7, border:"none", fontSize:12, fontWeight:600,
              cursor:"pointer", transition:"all 0.15s",
              background: filter === f ? "#fff" : "transparent",
              color: filter === f ? "#111827" : "#9ca3af",
              boxShadow: filter === f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
              {f}
              <span style={{ fontSize:10, opacity:0.7, marginLeft:4 }}>
                ({f === "ALL" ? positions.length : positions.filter(p => p.product === f).length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
        <table className="pos-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Instrument <SortIcon k="name"/></th>
              <th>Product</th>
              <th onClick={() => handleSort("qty")}>Qty <SortIcon k="qty"/></th>
              <th onClick={() => handleSort("avg")}>Avg. Cost <SortIcon k="avg"/></th>
              <th onClick={() => handleSort("ltp")}>LTP <SortIcon k="ltp"/></th>
              <th onClick={() => handleSort("pnl")}>P&amp;L <SortIcon k="pnl"/></th>
              <th>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1,2,3].map(i => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div style={{ padding:"60px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:"0 0 6px" }}>No open positions</p>
                    <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Start trading from your watchlist to open positions.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => {
                const pnl    = (s.price - s.avg) * s.qty;
                const pnlPct = s.avg > 0 ? ((s.price - s.avg) / s.avg * 100).toFixed(2) : "0.00";
                const isP    = pnl >= 0;
                const maxPnl = Math.max(...filtered.map(p => Math.abs((p.price - p.avg) * p.qty)), 1);
                const barW   = Math.min((Math.abs(pnl) / maxPnl) * 100, 100);

                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{
                          width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:11, fontWeight:700, flexShrink:0,
                          background: isP ? "#f0fdf4" : "#fef2f2",
                          color: isP ? "#10b981" : "#ef4444",
                        }}>{s.name.slice(0,2)}</div>
                        <div>
                          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{s.name}</p>
                          <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>NSE</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize:11, fontWeight:600, color:"#387ed1", background:"#eff6ff", padding:"2px 8px", borderRadius:4 }}>
                        {s.product}
                      </span>
                    </td>
                    <td style={{ fontWeight:600, color:"#111827" }}>{s.qty}</td>
                    <td style={{ color:"#374151" }}>₹{fmt(s.avg)}</td>
                    <td style={{ fontWeight:600, color:"#111827" }}>₹{fmt(s.price)}</td>
                    <td>
                      <div>
                        <span style={{ fontSize:13, fontWeight:700, color: isP ? "#10b981" : "#ef4444" }}>
                          {isP ? "+" : "-"}₹{fmt(Math.abs(pnl))}
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                          <div style={{ flex:1, height:3, background:"#f3f4f6", borderRadius:2, overflow:"hidden" }}>
                            <div style={{ width:`${barW}%`, height:"100%", background: isP ? "#10b981" : "#ef4444", borderRadius:2, transition:"width 0.4s ease" }} />
                          </div>
                          <span style={{ fontSize:10, color: isP ? "#10b981" : "#ef4444", fontWeight:600, whiteSpace:"nowrap" }}>
                            {isP ? "+" : ""}{pnlPct}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize:12, fontWeight:600, color: s.isLoss ? "#ef4444" : "#10b981" }}>
                        {s.day}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div style={{ padding:"12px 16px", borderTop:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Showing {filtered.length} of {positions.length} positions</p>
            <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>
              Day's P&L: <span style={{ color: isUp ? "#10b981" : "#ef4444" }}>{isUp ? "+" : "-"}₹{fmt(Math.abs(totalPnL))}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Positions;
