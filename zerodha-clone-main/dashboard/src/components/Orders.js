import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";
import API_BASE from "../config";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const fmt  = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtT = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—";
const fmtD = (d) => {
  if (!d) return "Today";
  const t = new Date(d), now = new Date();
  if (t.toDateString() === now.toDateString()) return "Today";
  const y = new Date(now); y.setDate(now.getDate() - 1);
  if (t.toDateString() === y.toDateString()) return "Yesterday";
  return t.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const IC = ({ d, c = "#9ca3af", s = 15 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />;

const ICONS = {
  clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  up:        "<polyline points='23 6 13.5 15.5 8.5 10.5 1 18'/><polyline points='17 6 23 6 23 12'/>",
  down:      "<polyline points='23 18 13.5 8.5 8.5 13.5 1 6'/><polyline points='17 18 23 18 23 12'/>",
  rupee:     "<line x1='12' y1='1' x2='12' y2='23'/><path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6'/>",
  search:    "<circle cx='11' cy='11' r='8'/><path d='M21 21l-4.35-4.35'/>",
};

const SkeletonRow = () => (
  <tr>
    {[38, 12, 10, 10, 8, 12, 14, 12].map((w, i) => (
      <td key={i} style={{ padding: "13px 14px" }}>
        <div style={{ height: 12, width: `${w}%`, minWidth: 36, borderRadius: 6, background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "ord-sh 1.4s infinite" }} />
      </td>
    ))}
  </tr>
);

const Orders = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("ALL");
  const [search,  setSearch]  = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    axios.get(`${API_BASE}/allOrders`)
      .then(res => { setOrders(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const buyCount  = orders.filter(o => o.mode === "BUY").length;
  const sellCount = orders.filter(o => o.mode === "SELL").length;
  const buyVal    = orders.filter(o => o.mode === "BUY").reduce((a, o) => a + o.qty * o.price, 0);
  const sellVal   = orders.filter(o => o.mode === "SELL").reduce((a, o) => a + o.qty * o.price, 0);
  const totalVal  = buyVal + sellVal;
  const buyPct    = totalVal > 0 ? (buyVal / totalVal) * 100 : 50;

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = orders
    .filter(o => filter === "ALL" || o.mode === filter)
    .filter(o => o.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let av, bv;
      if      (sortKey === "name")  { av = a.name;  bv = b.name; }
      else if (sortKey === "qty")   { av = a.qty;   bv = b.qty; }
      else if (sortKey === "price") { av = a.price; bv = b.price; }
      else if (sortKey === "value") { av = a.qty * a.price; bv = b.qty * b.price; }
      else { av = new Date(a.createdAt || 0); bv = new Date(b.createdAt || 0); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  // group by date
  const groups = filtered.reduce((acc, o) => {
    const key = fmtD(o.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(o);
    return acc;
  }, {});

  const maxVal = Math.max(...filtered.map(o => o.qty * o.price), 1);

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 3, opacity: sortKey === k ? 1 : 0.3, fontSize: 9 }}>
      {sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes ord-sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .ord-tbl { width:100%; border-collapse:collapse; }
        .ord-tbl th { padding:10px 14px; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:0.5px; text-align:left; cursor:pointer; user-select:none; white-space:nowrap; border-bottom:2px solid #f3f4f6; }
        .ord-tbl th:hover { color:#374151; }
        .ord-tbl td { padding:12px 14px; font-size:13px; color:#374151; border-bottom:1px solid #f9fafb; vertical-align:middle; }
        .ord-tbl tbody tr:last-child td { border-bottom:none; }
        .ord-tbl tbody tr:hover td { background:#fafafa; }
        .ord-search:focus { outline:none; border-color:#387ed1 !important; box-shadow:0 0 0 3px rgba(56,126,209,0.1); }
        .ord-group-label td { background:#f9fafb; padding:8px 14px; font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #f3f4f6; }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.3px" }}>Orders</h3>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>All your buy &amp; sell orders</p>
        </div>
        <div style={{ fontSize:11, color:"#9ca3af", background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:8, padding:"6px 12px", fontWeight:500 }}>
          {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1.6fr", gap:12, marginBottom:16 }}>
        {[
          { label:"Buy Orders",   value: loading?"—":buyCount,            sub: loading?"":`₹${fmt(buyVal)} value`,                                          color:"#387ed1", bg:"#eff6ff", border:"#bfdbfe", icon: ICONS.up },
          { label:"Sell Orders",  value: loading?"—":sellCount,           sub: loading?"":`₹${fmt(sellVal)} value`,                                         color:"#ef4444", bg:"#fef2f2", border:"#fecaca", icon: ICONS.down },
          { label:"Total Value",  value: loading?"—":`₹${fmt(totalVal)}`, sub: loading?"":`Avg ₹${fmt(orders.length ? totalVal/orders.length : 0)}/order`,  color:"#10b981", bg:"#f0fdf4", border:"#bbf7d0", icon: ICONS.rupee },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:12, padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <p style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", margin:0 }}>{s.label}</p>
              <IC d={s.icon} c={s.color} />
            </div>
            <p style={{ fontSize:20, fontWeight:700, color:s.color, margin:"0 0 4px" }}>{s.value}</p>
            {s.sub && <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{s.sub}</p>}
          </div>
        ))}

        {/* Total Orders — Line Chart card */}
        <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:12, padding:"14px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
            <p style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", margin:0 }}>Total Orders</p>
            <IC d={ICONS.clipboard} c="#9ca3af" />
          </div>
          <p style={{ fontSize:20, fontWeight:700, color:"#111827", margin:"0 0 2px" }}>{loading ? "—" : orders.length}</p>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 8px" }}>{loading ? "" : `${buyCount} buy · ${sellCount} sell`}</p>
          {!loading && orders.length > 0 && (() => {
            // build cumulative order count per day (last 7 days)
            const days = Array.from({ length: 7 }, (_, i) => {
              const d = new Date(); d.setDate(d.getDate() - (6 - i));
              return d.toLocaleDateString("en-IN", { day:"numeric", month:"short" });
            });
            const dayCounts = days.map((label, i) => {
              const d = new Date(); d.setDate(d.getDate() - (6 - i));
              return orders.filter(o => {
                if (!o.createdAt) return i === 6; // no date → today
                return new Date(o.createdAt).toDateString() === d.toDateString();
              }).length;
            });
            // if all zero (no createdAt), put all on last day
            const total = dayCounts.reduce((a,b)=>a+b,0);
            if (total === 0) dayCounts[6] = orders.length;
            return (
              <div style={{ height:52 }}>
                <Line
                  data={{
                    labels: days,
                    datasets: [{
                      data: dayCounts,
                      borderColor: "#387ed1",
                      borderWidth: 2,
                      pointRadius: 3,
                      pointBackgroundColor: "#387ed1",
                      fill: true,
                      backgroundColor: (ctx) => {
                        const chart = ctx.chart;
                        const { ctx: c, chartArea } = chart;
                        if (!chartArea) return "transparent";
                        const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        grad.addColorStop(0, "rgba(56,126,209,0.18)");
                        grad.addColorStop(1, "rgba(56,126,209,0)");
                        return grad;
                      },
                      tension: 0.4,
                    }]
                  }}
                  options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => ` ${ctx.parsed.y} orders` } } },
                    scales: {
                      x: { display:false },
                      y: { display:false, min: 0 },
                    },
                  }}
                />
              </div>
            );
          })()}
        </div>
      </div>

      {/* Buy/Sell split line chart */}
      {!loading && orders.length > 0 && (() => {
        const days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(); d.setDate(d.getDate() - (6 - i));
          return d.toLocaleDateString("en-IN", { day:"numeric", month:"short" });
        });
        const buyData = days.map((_, i) => {
          const d = new Date(); d.setDate(d.getDate() - (6 - i));
          const dayOrders = orders.filter(o => !o.createdAt ? i === 6 : new Date(o.createdAt).toDateString() === d.toDateString());
          const val = dayOrders.filter(o => o.mode === "BUY").reduce((a, o) => a + o.qty * o.price, 0);
          return +val.toFixed(2);
        });
        const sellData = days.map((_, i) => {
          const d = new Date(); d.setDate(d.getDate() - (6 - i));
          const dayOrders = orders.filter(o => !o.createdAt ? i === 6 : new Date(o.createdAt).toDateString() === d.toDateString());
          const val = dayOrders.filter(o => o.mode === "SELL").reduce((a, o) => a + o.qty * o.price, 0);
          return +val.toFixed(2);
        });
        // fallback: if all zero spread across days
        if (buyData.every(v => v === 0)) buyData[6] = buyVal;
        if (sellData.every(v => v === 0)) sellData[6] = sellVal;
        return (
          <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:12, padding:"16px 18px", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div>
                <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:"0 0 2px" }}>Buy vs Sell Value</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Last 7 days trading activity</p>
              </div>
              <div style={{ display:"flex", gap:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:24, height:3, borderRadius:2, background:"#387ed1", display:"inline-block" }} />
                  <span style={{ fontSize:11, fontWeight:600, color:"#387ed1" }}>Buy {buyPct.toFixed(0)}%</span>
                  <span style={{ fontSize:11, color:"#9ca3af" }}>₹{fmt(buyVal)}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:24, height:3, borderRadius:2, background:"#ef4444", display:"inline-block" }} />
                  <span style={{ fontSize:11, fontWeight:600, color:"#ef4444" }}>Sell {(100-buyPct).toFixed(0)}%</span>
                  <span style={{ fontSize:11, color:"#9ca3af" }}>₹{fmt(sellVal)}</span>
                </div>
              </div>
            </div>
            <div style={{ height:100 }}>
              <Line
                data={{
                  labels: days,
                  datasets: [
                    {
                      label: "Buy",
                      data: buyData,
                      borderColor: "#387ed1",
                      borderWidth: 2,
                      pointRadius: 3,
                      pointBackgroundColor: "#387ed1",
                      fill: true,
                      backgroundColor: (ctx) => {
                        const { ctx: c, chartArea } = ctx.chart;
                        if (!chartArea) return "rgba(56,126,209,0.08)";
                        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        g.addColorStop(0, "rgba(56,126,209,0.15)");
                        g.addColorStop(1, "rgba(56,126,209,0)");
                        return g;
                      },
                      tension: 0.4,
                    },
                    {
                      label: "Sell",
                      data: sellData,
                      borderColor: "#ef4444",
                      borderWidth: 2,
                      pointRadius: 3,
                      pointBackgroundColor: "#ef4444",
                      fill: true,
                      backgroundColor: (ctx) => {
                        const { ctx: c, chartArea } = ctx.chart;
                        if (!chartArea) return "rgba(239,68,68,0.08)";
                        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        g.addColorStop(0, "rgba(239,68,68,0.12)");
                        g.addColorStop(1, "rgba(239,68,68,0)");
                        return g;
                      },
                      tension: 0.4,
                    },
                  ]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  interaction: { mode:"index", intersect:false },
                  plugins: {
                    legend: { display:false },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ₹${fmt(ctx.parsed.y)}` } }
                  },
                  scales: {
                    x: { grid:{ display:false }, ticks:{ font:{ size:10 }, color:"#9ca3af" } },
                    y: { display:false, min:0 },
                  },
                }}
              />
            </div>
          </div>
        );
      })()}

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, gap:12, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:6, background:"#f3f4f6", borderRadius:10, padding:4 }}>
          {["ALL","BUY","SELL"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"6px 18px", borderRadius:7, border:"none", fontSize:12, fontWeight:600,
              cursor:"pointer", transition:"all 0.15s",
              background: filter===f ? "#fff" : "transparent",
              color: filter===f ? (f==="BUY"?"#387ed1":f==="SELL"?"#ef4444":"#111827") : "#9ca3af",
              boxShadow: filter===f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
              {f}{!loading && <span style={{ fontSize:10, opacity:0.7, marginLeft:4 }}>({f==="ALL"?orders.length:f==="BUY"?buyCount:sellCount})</span>}
            </button>
          ))}
        </div>
        <div style={{ position:"relative", flex:1, maxWidth:260 }}>
          <IC d={ICONS.search} c="#9ca3af" s={13} />
          <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="ord-search" type="text" placeholder="Search instrument..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:"100%", padding:"8px 12px 8px 30px", border:"1px solid #e8eaed", borderRadius:8, fontSize:12, fontFamily:"Inter,sans-serif", background:"#fff", boxSizing:"border-box", transition:"all 0.2s" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"#fff", border:"1px solid #e8eaed", borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
        <table className="ord-tbl">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Instrument <SortIcon k="name"/></th>
              <th>Type</th>
              <th>Product</th>
              <th>Order</th>
              <th onClick={() => handleSort("qty")}>Qty <SortIcon k="qty"/></th>
              <th onClick={() => handleSort("price")}>Price <SortIcon k="price"/></th>
              <th onClick={() => handleSort("value")}>Value <SortIcon k="value"/></th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1,2,3,4,5].map(i => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <div style={{ padding:"56px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                    </div>
                    <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:"0 0 6px" }}>No orders found</p>
                    <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Start trading from your watchlist to see orders here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              Object.entries(groups).map(([date, rows]) => (
                <React.Fragment key={date}>
                  <tr className="ord-group-label">
                    <td colSpan={9}>{date} &nbsp;·&nbsp; {rows.length} order{rows.length > 1 ? "s" : ""}</td>
                  </tr>
                  {rows.map((order, i) => {
                    const val    = order.qty * order.price;
                    const barPct = Math.min((val / maxVal) * 100, 100);
                    return (
                      <tr key={i}>
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{
                              width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:11, fontWeight:700, flexShrink:0,
                              background: order.mode==="BUY" ? "#eff6ff" : "#fef2f2",
                              color:      order.mode==="BUY" ? "#387ed1" : "#ef4444",
                            }}>{order.name.slice(0,2)}</div>
                            <div>
                              <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{order.name}</p>
                              <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>NSE</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ padding:"3px 10px", borderRadius:5, fontSize:11, fontWeight:700, background: order.mode==="BUY"?"#eff6ff":"#fef2f2", color: order.mode==="BUY"?"#387ed1":"#ef4444" }}>
                            {order.mode}
                          </span>
                        </td>
                        <td><span style={{ fontSize:11, fontWeight:600, color:"#6b7280", background:"#f3f4f6", padding:"2px 8px", borderRadius:4 }}>{order.productType||"CNC"}</span></td>
                        <td><span style={{ fontSize:11, fontWeight:600, color:"#6b7280", background:"#f3f4f6", padding:"2px 8px", borderRadius:4 }}>{order.orderType||"MARKET"}</span></td>
                        <td style={{ fontWeight:600, color:"#111827" }}>{order.qty}</td>
                        <td style={{ color:"#374151" }}>₹{fmt(order.price)}</td>
                        <td>
                          <div>
                            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>₹{fmt(val)}</p>
                            <div style={{ height:3, width:80, background:"#f3f4f6", borderRadius:2, overflow:"hidden" }}>
                              <div style={{ width:`${barPct}%`, height:"100%", background: order.mode==="BUY"?"#387ed1":"#ef4444", borderRadius:2 }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize:12, color:"#9ca3af", fontWeight:500 }}>{fmtT(order.createdAt)}</td>
                        <td>
                          <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, color:"#10b981", background:"#f0fdf4", border:"1px solid #bbf7d0", padding:"3px 10px", borderRadius:20 }}>
                            <span style={{ width:5, height:5, borderRadius:"50%", background:"#10b981", display:"inline-block" }} />
                            Executed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>

        {!loading && filtered.length > 0 && (
          <div style={{ padding:"12px 16px", borderTop:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Showing {filtered.length} of {orders.length} orders</p>
            <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>
              Total: <span style={{ color:"#10b981" }}>₹{fmt(filtered.reduce((a,o) => a + o.qty * o.price, 0))}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
