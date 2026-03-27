import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import API_BASE from "../config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const fmt    = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtC   = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0,  maximumFractionDigits: 0 });

const COLORS = ["#387ed1","#10b981","#f59e0b","#8b5cf6","#ef4444","#06b6d4","#f97316","#84cc16","#ec4899","#6366f1","#14b8a6","#a855f7"];

const SkeletonRow = () => (
  <tr>
    {[36,8,12,12,14,14,10,10].map((w,i) => (
      <td key={i} style={{ padding:"13px 14px" }}>
        <div style={{ height:12, width:`${w}%`, minWidth:36, borderRadius:6, background:"linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)", backgroundSize:"200% 100%", animation:"hld-sh 1.4s infinite" }} />
      </td>
    ))}
  </tr>
);

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [sortKey,  setSortKey]  = useState(null);
  const [sortDir,  setSortDir]  = useState("asc");
  const [tab,      setTab]      = useState("table"); // table | chart

  useEffect(() => {
    axios.get(`${API_BASE}/allHoldings`)
      .then(res => { setHoldings(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const totalInvest = holdings.reduce((a, s) => a + s.avg   * s.qty, 0);
  const totalCur    = holdings.reduce((a, s) => a + s.price * s.qty, 0);
  const totalPnL    = totalCur - totalInvest;
  const pnlPct      = totalInvest > 0 ? ((totalPnL / totalInvest) * 100).toFixed(2) : "0.00";
  const isUp        = totalPnL >= 0;
  const dayUp       = holdings.filter(s => !s.isLoss).length;
  const dayDown     = holdings.length - dayUp;

  const sorted = [...holdings].sort((a, b) => {
    if (!sortKey) return 0;
    const pnl = s => (s.price - s.avg) * s.qty;
    const pct = s => ((s.price - s.avg) / s.avg) * 100;
    const map  = { name: s=>s.name, qty: s=>s.qty, avg: s=>s.avg, ltp: s=>s.price, curval: s=>s.price*s.qty, pnl, pct };
    const av = map[sortKey](a), bv = map[sortKey](b);
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1  : -1;
    return 0;
  });

  const filtered = sorted.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const byPct      = [...holdings].sort((a,b) => ((b.price-b.avg)/b.avg) - ((a.price-a.avg)/a.avg));
  const topGainers = byPct.slice(0, 3);
  const topLosers  = byPct.slice(-3).reverse();
  const maxPnl     = Math.max(...holdings.map(s => Math.abs((s.price - s.avg) * s.qty)), 1);

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft:3, opacity: sortKey===k ? 1 : 0.3, fontSize:9 }}>
      {sortKey===k ? (sortDir==="asc" ? "▲" : "▼") : "▲"}
    </span>
  );

  const chartData = {
    labels: holdings.map(s => s.name),
    datasets: [{
      label: "P&L (₹)",
      data: holdings.map(s => +((s.price - s.avg) * s.qty).toFixed(2)),
      backgroundColor: holdings.map(s => (s.price - s.avg) * s.qty >= 0 ? "rgba(16,185,129,0.85)" : "rgba(239,68,68,0.85)"),
      borderRadius: 5,
      borderSkipped: false,
    }]
  };

  return (
    <>
      <style>{`
        @keyframes hld-sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .hld-tbl { width:100%; border-collapse:collapse; }
        .hld-tbl th { padding:10px 14px; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px; text-align:left; cursor:pointer; user-select:none; white-space:nowrap; border-bottom:2px solid #f3f4f6; }
        .hld-tbl th:hover { color:#374151; }
        .hld-tbl td { padding:12px 14px; font-size:13px; color:#374151; border-bottom:1px solid #f9fafb; vertical-align:middle; }
        .hld-tbl tbody tr:last-child td { border-bottom:none; }
        .hld-tbl tbody tr:hover td { background:#fafafa; }
        .hld-search:focus { outline:none; border-color:#387ed1 !important; box-shadow:0 0 0 3px rgba(56,126,209,0.1); }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.3px" }}>
            Holdings {!loading && <span style={{ fontSize:14, fontWeight:500, color:"#9ca3af" }}>({holdings.length})</span>}
          </h3>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>Long-term investments in your portfolio</p>
        </div>
        <div style={{ fontSize:11, color:"#9ca3af", background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:8, padding:"6px 12px", fontWeight:500 }}>
          {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[
          { label:"Total Invested",   value: loading?"—":`₹${fmt(totalInvest)}`, sub: loading?"":  `${holdings.length} stocks`,                                    color:"#111827", bg:"#f9fafb", border:"#e8eaed" },
          { label:"Current Value",    value: loading?"—":`₹${fmt(totalCur)}`,    sub: loading?"":  `${isUp?"+":"-"}₹${fmt(Math.abs(totalPnL))} overall`,           color:"#111827", bg:"#f9fafb", border:"#e8eaed" },
          { label:"Total P&L",        value: loading?"—":`${isUp?"+":"-"}₹${fmt(Math.abs(totalPnL))}`, sub: loading?"": `${isUp?"+":""}${pnlPct}% returns`,       color: loading?"#111827": isUp?"#10b981":"#ef4444", bg: loading?"#f9fafb": isUp?"#f0fdf4":"#fef2f2", border: loading?"#e8eaed": isUp?"#bbf7d0":"#fecaca" },
          { label:"Today's Change",   value: loading?"—":`${dayUp} ▲  ${dayDown} ▼`, sub: loading?"": `${dayUp} gaining · ${dayDown} losing`,                    color:"#111827", bg:"#f9fafb", border:"#e8eaed" },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:12, padding:"16px 18px" }}>
            <p style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", margin:"0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize:19, fontWeight:700, color:s.color, margin:"0 0 4px" }}>{s.value}</p>
            {s.sub && <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Top Gainers / Losers strip */}
      {!loading && holdings.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
          {[{ title:"Top Gainers", list: topGainers, up: true }, { title:"Top Losers", list: topLosers, up: false }].map(({ title, list, up }) => (
            <div key={title} style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:12, padding:"14px 16px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.5px", margin:"0 0 12px" }}>{title}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {list.map((s, i) => {
                  const pct = ((s.price - s.avg) / s.avg * 100).toFixed(2);
                  const isP = Number(pct) >= 0;
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:7, background: isP?"#f0fdf4":"#fef2f2", color: isP?"#10b981":"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700 }}>{s.name.slice(0,2)}</div>
                        <span style={{ fontSize:12, fontWeight:600, color:"#111827" }}>{s.name}</span>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <p style={{ fontSize:12, fontWeight:700, color: isP?"#10b981":"#ef4444", margin:0 }}>{isP?"+":""}{pct}%</p>
                        <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>₹{fmt(s.price)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, gap:12 }}>
        <div style={{ position:"relative", flex:1, maxWidth:280 }}>
          <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="hld-search" type="text" placeholder="Search holdings..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:"100%", padding:"8px 12px 8px 30px", border:"1px solid #e8eaed", borderRadius:8, fontSize:12, fontFamily:"Inter,sans-serif", background:"#fff", boxSizing:"border-box", transition:"all 0.2s" }}
          />
        </div>
        <div style={{ display:"flex", gap:6, background:"#f3f4f6", borderRadius:10, padding:4 }}>
          {["table","chart"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:"6px 16px", borderRadius:7, border:"none", fontSize:12, fontWeight:600,
              cursor:"pointer", transition:"all 0.15s",
              background: tab===t ? "#fff" : "transparent",
              color: tab===t ? "#111827" : "#9ca3af",
              boxShadow: tab===t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>{t === "table" ? "Table" : "Chart"}</button>
          ))}
        </div>
      </div>

      {/* Table / Chart */}
      {tab === "chart" && !loading && holdings.length > 0 ? (
        <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:14, padding:"20px 22px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:"0 0 16px" }}>Holdings P&amp;L</p>
          <div style={{ height:260 }}>
            <Bar data={chartData} options={{
              responsive:true, maintainAspectRatio:false,
              plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => ` ₹${Number(ctx.parsed.y).toLocaleString("en-IN")}` } } },
              scales:{
                x:{ grid:{ display:false }, ticks:{ font:{ size:10 }, color:"#9ca3af" } },
                y:{ grid:{ color:"#f3f4f6" }, ticks:{ font:{ size:10 }, color:"#9ca3af", callback: v => `₹${fmtC(v)}` } }
              }
            }} />
          </div>

          {/* Allocation dots */}
          <p style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.5px", margin:"20px 0 12px" }}>Portfolio Allocation</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px" }}>
            {holdings.map((s, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background: COLORS[i % COLORS.length], display:"inline-block" }} />
                <span style={{ fontSize:11, color:"#374151", fontWeight:500 }}>{s.name}</span>
                <span style={{ fontSize:11, color:"#9ca3af" }}>{totalCur > 0 ? ((s.price*s.qty/totalCur)*100).toFixed(1) : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          <table className="hld-tbl">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>Instrument <SortIcon k="name"/></th>
                <th onClick={() => handleSort("qty")}>Qty <SortIcon k="qty"/></th>
                <th onClick={() => handleSort("avg")}>Avg. Cost <SortIcon k="avg"/></th>
                <th onClick={() => handleSort("ltp")}>LTP <SortIcon k="ltp"/></th>
                <th onClick={() => handleSort("curval")}>Cur. Value <SortIcon k="curval"/></th>
                <th onClick={() => handleSort("pnl")}>P&amp;L <SortIcon k="pnl"/></th>
                <th onClick={() => handleSort("pct")}>Returns <SortIcon k="pct"/></th>
                <th>Day Chg.</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1,2,3,4,5,6].map(i => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div style={{ padding:"56px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                      <div style={{ width:52, height:52, borderRadius:14, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                      </div>
                      <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:"0 0 6px" }}>No holdings found</p>
                      <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Try a different search term.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((s, i) => {
                  const curVal = s.price * s.qty;
                  const pnl    = curVal - s.avg * s.qty;
                  const pct    = s.avg > 0 ? ((s.price - s.avg) / s.avg * 100).toFixed(2) : "0.00";
                  const isP    = pnl >= 0;
                  const barW   = Math.min((Math.abs(pnl) / maxPnl) * 100, 100);
                  return (
                    <tr key={i}>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, background: COLORS[i % COLORS.length] + "22", color: COLORS[i % COLORS.length] }}>
                            {s.name.slice(0,2)}
                          </div>
                          <div>
                            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{s.name}</p>
                            <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>NSE · Equity</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight:600, color:"#111827" }}>{s.qty}</td>
                      <td style={{ color:"#374151" }}>₹{fmt(s.avg)}</td>
                      <td style={{ fontWeight:600, color:"#111827" }}>₹{fmt(s.price)}</td>
                      <td style={{ fontWeight:600, color:"#111827" }}>₹{fmt(curVal)}</td>
                      <td>
                        <div>
                          <p style={{ fontSize:13, fontWeight:700, color: isP?"#10b981":"#ef4444", margin:"0 0 4px" }}>
                            {isP?"+":"-"}₹{fmt(Math.abs(pnl))}
                          </p>
                          <div style={{ height:3, width:72, background:"#f3f4f6", borderRadius:2, overflow:"hidden" }}>
                            <div style={{ width:`${barW}%`, height:"100%", background: isP?"#10b981":"#ef4444", borderRadius:2 }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize:12, fontWeight:700, color: isP?"#10b981":"#ef4444" }}>
                          {isP?"+":""}{pct}%
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize:12, fontWeight:600, color: s.isLoss?"#ef4444":"#10b981" }}>
                          {s.day}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {!loading && filtered.length > 0 && (
            <div style={{ padding:"12px 16px", borderTop:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Showing {filtered.length} of {holdings.length} holdings</p>
              <div style={{ display:"flex", gap:20 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>Invested: <span style={{ color:"#374151" }}>₹{fmt(totalInvest)}</span></p>
                <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>Current: <span style={{ color:"#374151" }}>₹{fmt(totalCur)}</span></p>
                <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>P&L: <span style={{ color: isUp?"#10b981":"#ef4444" }}>{isUp?"+":"-"}₹{fmt(Math.abs(totalPnL))}</span></p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Holdings;
