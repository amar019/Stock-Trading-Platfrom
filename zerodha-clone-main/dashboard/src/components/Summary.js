import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from "chart.js";
import "./Summary.css";
import API_BASE from "../config";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MiniSparkline = ({ data, color }) => {
  const w = 72, h = 28;
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h}>
      <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
};

const SkeletonRow = () => (
  <div className="sk-row">
    <div className="sk-block" style={{ width: "40%" }} />
    <div className="sk-block" style={{ width: "20%" }} />
    <div className="sk-block" style={{ width: "20%" }} />
  </div>
);

export default function Summary() {
  const rawName = (() => {
    const p = new URLSearchParams(window.location.search);
    const u = p.get("name");
    if (u) { localStorage.setItem("name", u); window.history.replaceState({}, "", "/"); return u; }
    return localStorage.getItem("name") || "";
  })();
  const name = rawName ? rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase() : "User";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE}/allHoldings`),
      axios.get(`${API_BASE}/allPositions`),
      axios.get(`${API_BASE}/allOrders`),
    ]).then(([h, p, o]) => {
      setHoldings(h.data || []);
      setPositions(p.data || []);
      setOrders(o.data || []);
    }).catch((err) => { console.error("API error:", err.message); }).finally(() => setLoading(false));
  }, []);

  const totalInvested = holdings.reduce((a, s) => a + s.avg * s.qty, 0);
  const currentValue  = holdings.reduce((a, s) => a + s.price * s.qty, 0);
  const holdingsPnL   = currentValue - totalInvested;
  const holdingsPct   = totalInvested > 0 ? ((holdingsPnL / totalInvested) * 100).toFixed(2) : "0.00";
  const holdingsUp    = holdingsPnL >= 0;

  const posPnL  = positions.reduce((a, s) => a + (s.price - s.avg) * s.qty, 0);
  const posUp   = posPnL >= 0;

  const todayOrders = orders.filter(o => !o.createdAt || new Date(o.createdAt).toDateString() === new Date().toDateString());
  const buyOrders   = todayOrders.filter(o => o.mode === "BUY");
  const sellOrders  = todayOrders.filter(o => o.mode === "SELL");

  const sparkData = holdings.slice(0, 10).map(s => s.price);

  const sorted     = [...holdings].sort((a, b) => ((b.price - b.avg) / b.avg) - ((a.price - a.avg) / a.avg));
  const topGainers = sorted.slice(0, 3);
  const topLosers  = sorted.slice(-3).reverse();

  const tabs = ["overview", "holdings", "positions", "orders"];

  return (
    <div className="summary-page">

      {/* ── HEADER ── */}
      <div className="summary-header">
        <div className="summary-header-left">
          <span className="summary-date">{dateStr}</span>
          <h1 className="summary-greeting">{greeting}, {name}</h1>
        </div>
        <div className="summary-header-right">
          <div className="market-pill">
            <span className="market-dot" />
            Market Open
          </div>
          <div className="index-chip">
            <span className="index-label">NIFTY</span>
            <span className="index-val up">22,415 ▲</span>
          </div>
          <div className="index-chip">
            <span className="index-label">SENSEX</span>
            <span className="index-val up">73,852 ▲</span>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stat-grid">
        {/* Margin */}
        <div className="stat-card">
          <p className="stat-label">Available Margin</p>
          <p className="stat-value">₹3,740.00</p>
          <p className="stat-sub">Used: ₹0.00</p>
        </div>

        {/* Holdings P&L */}
        <div className="stat-card">
          <p className="stat-label">Holdings P&amp;L</p>
          {loading ? (
            <div className="sk-block" style={{ height: 28, width: "60%", marginTop: 4 }} />
          ) : (
            <>
              <p className={`stat-value ${holdingsUp ? "up" : "down"}`}>
                {holdingsUp ? "+" : "-"}₹{fmt(Math.abs(holdingsPnL))}
              </p>
              <div className="stat-spark-row">
                <span className={`stat-sub ${holdingsUp ? "up" : "down"}`}>
                  {holdingsUp ? "+" : ""}{holdingsPct}%
                </span>
                <MiniSparkline data={sparkData} color={holdingsUp ? "#10b981" : "#ef4444"} />
              </div>
            </>
          )}
        </div>

        {/* Portfolio Value */}
        <div className="stat-card">
          <p className="stat-label">Portfolio Value</p>
          {loading ? (
            <div className="sk-block" style={{ height: 28, width: "60%", marginTop: 4 }} />
          ) : (
            <>
              <p className="stat-value">₹{fmt(currentValue)}</p>
              <p className="stat-sub">Invested: ₹{fmt(totalInvested)}</p>
            </>
          )}
        </div>

        {/* Today's Orders */}
        <div className="stat-card">
          <p className="stat-label">Today's Orders</p>
          {loading ? (
            <div className="sk-block" style={{ height: 28, width: "40%", marginTop: 4 }} />
          ) : (
            <>
              <p className="stat-value">{todayOrders.length}</p>
              <div className="order-badges">
                <span className="badge badge-buy">B {buyOrders.length}</span>
                <span className="badge badge-sell">S {sellOrders.length}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="charts-row">

        {/* Portfolio Allocation */}
        <div className="chart-card">
          <p className="section-title">Portfolio Allocation</p>
          {loading ? (
            <div className="sk-block" style={{ height: 140, borderRadius: 8 }} />
          ) : holdings.length === 0 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: 140, fontSize: "12px", color: "#9ca3af" }}>No data</div>
          ) : (
            <>
              <div className="chart-wrap">
                <Doughnut
                  data={{
                    labels: holdings.map(s => s.name),
                    datasets: [{
                      data: holdings.map(s => +(s.price * s.qty).toFixed(2)),
                      backgroundColor: ["#387ed1","#10b981","#f59e0b","#8b5cf6","#ef4444","#06b6d4","#f97316","#84cc16","#ec4899","#6366f1"],
                      borderWidth: 2,
                      borderColor: "#fff",
                    }]
                  }}
                  options={{
                    cutout: "68%",
                    plugins: {
                      legend: { display: false },
                      tooltip: { callbacks: { label: ctx => ` ₹${Number(ctx.parsed).toLocaleString("en-IN")}` } }
                    }
                  }}
                />
              </div>
              <div className="donut-legend">
                {holdings.slice(0, 5).map((s, i) => (
                  <div key={i} className="donut-legend-item">
                    <span className="donut-dot" style={{ background: ["#387ed1","#10b981","#f59e0b","#8b5cf6","#ef4444"][i] }} />
                    <span className="donut-name">{s.name}</span>
                    <span className="donut-pct">{currentValue > 0 ? ((s.price * s.qty / currentValue) * 100).toFixed(1) : 0}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Holdings P&L Bar */}
        <div className="chart-card chart-card-wide">
          <p className="section-title">Holdings P&amp;L</p>
          {loading ? (
            <div className="sk-block" style={{ height: 160, borderRadius: 8 }} />
          ) : holdings.length === 0 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: 160, fontSize: "12px", color: "#9ca3af" }}>No data</div>
          ) : (
            <div className="chart-wrap-bar">
              <Bar
                data={{
                  labels: holdings.map(s => s.name),
                  datasets: [{
                    label: "P&L (₹)",
                    data: holdings.map(s => +((s.price - s.avg) * s.qty).toFixed(2)),
                    backgroundColor: holdings.map(s =>
                      (s.price - s.avg) * s.qty >= 0 ? "rgba(16,185,129,0.85)" : "rgba(239,68,68,0.85)"
                    ),
                    borderRadius: 5,
                    borderSkipped: false,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => ` ₹${Number(ctx.parsed.y).toLocaleString("en-IN")}` } }
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 10, family: "Inter" }, color: "#9ca3af" } },
                    y: { grid: { color: "#f3f4f6" }, ticks: { font: { size: 10, family: "Inter" }, color: "#9ca3af", callback: v => `₹${Number(v).toLocaleString("en-IN")}` } }
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Order Split */}
        <div className="chart-card">
          <p className="section-title">Order Split</p>
          {loading ? (
            <div className="sk-block" style={{ height: 140, borderRadius: 8 }} />
          ) : orders.length === 0 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: 140, fontSize: "12px", color: "#9ca3af" }}>No orders yet</div>
          ) : (
            <>
              <div className="chart-wrap">
                <Doughnut
                  data={{
                    labels: ["Buy", "Sell"],
                    datasets: [{
                      data: [orders.filter(o => o.mode === "BUY").length, orders.filter(o => o.mode === "SELL").length],
                      backgroundColor: ["#387ed1", "#ef4444"],
                      borderWidth: 2,
                      borderColor: "#fff",
                    }]
                  }}
                  options={{
                    cutout: "68%",
                    plugins: {
                      legend: { display: false },
                      tooltip: { callbacks: { label: ctx => ` ${ctx.parsed} orders` } }
                    }
                  }}
                />
              </div>
              <div className="donut-legend">
                <div className="donut-legend-item">
                  <span className="donut-dot" style={{ background: "#387ed1" }} />
                  <span className="donut-name">Buy</span>
                  <span className="donut-pct">{orders.filter(o => o.mode === "BUY").length}</span>
                </div>
                <div className="donut-legend-item">
                  <span className="donut-dot" style={{ background: "#ef4444" }} />
                  <span className="donut-name">Sell</span>
                  <span className="donut-pct">{orders.filter(o => o.mode === "SELL").length}</span>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* ── TABS PANEL ── */}
      <div className="tab-panel">
        <div className="tab-bar">
          {tabs.map(t => (
            <button
              key={t}
              className={`tab-btn${activeTab === t ? " active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {!loading && t !== "overview" && (
                <span className="tab-count">
                  {t === "holdings" ? holdings.length : t === "positions" ? positions.length : todayOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="tab-body">
          {loading ? (
            <div className="sk-list">
              {[1, 2, 3, 4].map(i => <SkeletonRow key={i} />)}
            </div>
          ) : (
            <>
              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <div className="overview-grid">
                  <div className="overview-col">
                    <p className="section-title">Top Gainers</p>
                    {topGainers.map((s, i) => {
                      const pct = (((s.price - s.avg) / s.avg) * 100).toFixed(2);
                      return (
                        <div key={i} className="stock-row">
                          <div className="stock-avatar gain">{s.name.slice(0, 2)}</div>
                          <div className="stock-info">
                            <span className="stock-name">{s.name}</span>
                            <span className="stock-qty">Qty {s.qty}</span>
                          </div>
                          <div className="stock-right">
                            <span className="stock-pct up">+{pct}%</span>
                            <span className="stock-price">₹{fmt(s.price)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="overview-col">
                    <p className="section-title">Top Losers</p>
                    {topLosers.map((s, i) => {
                      const pct = (((s.price - s.avg) / s.avg) * 100).toFixed(2);
                      const isLoss = pct < 0;
                      return (
                        <div key={i} className="stock-row">
                          <div className="stock-avatar loss">{s.name.slice(0, 2)}</div>
                          <div className="stock-info">
                            <span className="stock-name">{s.name}</span>
                            <span className="stock-qty">Qty {s.qty}</span>
                          </div>
                          <div className="stock-right">
                            <span className={`stock-pct ${isLoss ? "down" : "up"}`}>{pct}%</span>
                            <span className="stock-price">₹{fmt(s.price)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="margin-strip">
                    <p className="section-title" style={{ marginBottom: 14 }}>Equity Margin</p>
                    <div className="margin-row">
                      {[
                        { label: "Available", value: "₹3,740.00", accent: true },
                        { label: "Used", value: "₹0.00" },
                        { label: "Opening Balance", value: "₹3,740.00" },
                        { label: "SPAN", value: "₹0.00" },
                        { label: "Exposure", value: "₹0.00" },
                      ].map(item => (
                        <div key={item.label} className="margin-item">
                          <span className="margin-label">{item.label}</span>
                          <span className={`margin-val${item.accent ? " up" : ""}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* HOLDINGS */}
              {activeTab === "holdings" && (
                <div>
                  <div className="tab-summary-row">
                    <div className="tab-summary-stats">
                      <div className="tab-stat">
                        <span className="tab-stat-label">Current Value</span>
                        <span className="tab-stat-val">₹{fmt(currentValue)}</span>
                      </div>
                      <div className="tab-stat">
                        <span className="tab-stat-label">Invested</span>
                        <span className="tab-stat-val">₹{fmt(totalInvested)}</span>
                      </div>
                      <div className="tab-stat">
                        <span className="tab-stat-label">P&amp;L</span>
                        <span className={`tab-stat-val ${holdingsUp ? "up" : "down"}`}>
                          {holdingsUp ? "+" : "-"}₹{fmt(Math.abs(holdingsPnL))} ({holdingsUp ? "+" : ""}{holdingsPct}%)
                        </span>
                      </div>
                    </div>
                    <Link to="/holdings" className="view-link">View all →</Link>
                  </div>
                  <table className="data-table">
                    <thead>
                      <tr>
                        {["Instrument", "Qty", "Avg Cost", "LTP", "P&L", "Day Chg"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((s, i) => {
                        const pnl = (s.price - s.avg) * s.qty;
                        const isP = pnl >= 0;
                        return (
                          <tr key={i}>
                            <td className="td-name">{s.name}</td>
                            <td>{s.qty}</td>
                            <td>₹{fmt(s.avg)}</td>
                            <td>₹{fmt(s.price)}</td>
                            <td className={isP ? "up" : "down"}>{isP ? "+" : "-"}₹{fmt(Math.abs(pnl))}</td>
                            <td className={s.isLoss ? "down" : "up"}>{s.day}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* POSITIONS */}
              {activeTab === "positions" && (
                <div>
                  <div className="tab-summary-row">
                    <div className="tab-stat">
                      <span className="tab-stat-label">Day's P&amp;L</span>
                      <span className={`tab-stat-val lg ${posUp ? "up" : "down"}`}>
                        {posUp ? "+" : "-"}₹{fmt(Math.abs(posPnL))}
                      </span>
                    </div>
                    <Link to="/positions" className="view-link">View all →</Link>
                  </div>
                  {positions.length === 0 ? (
                    <div className="empty-state">No open positions</div>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          {["Product", "Instrument", "Qty", "Avg", "LTP", "P&L"].map(h => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((s, i) => {
                          const pnl = (s.price - s.avg) * s.qty;
                          const isP = pnl >= 0;
                          return (
                            <tr key={i}>
                              <td><span className="product-tag">{s.product}</span></td>
                              <td className="td-name">{s.name}</td>
                              <td>{s.qty}</td>
                              <td>₹{fmt(s.avg)}</td>
                              <td>₹{fmt(s.price)}</td>
                              <td className={isP ? "up" : "down"}>{isP ? "+" : "-"}₹{fmt(Math.abs(pnl))}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* ORDERS */}
              {activeTab === "orders" && (
                <div>
                  <div className="tab-summary-row">
                    <span className="tab-stat-label">{todayOrders.length} orders today</span>
                    <Link to="/orders" className="view-link">View all →</Link>
                  </div>
                  {todayOrders.length === 0 ? (
                    <div className="empty-state">No orders placed today</div>
                  ) : (
                    todayOrders.map((o, i) => (
                      <div key={i} className="order-row-item">
                        <div className="order-row-left">
                          <span className={`mode-tag ${o.mode === "BUY" ? "buy" : "sell"}`}>{o.mode}</span>
                          <div>
                            <p className="order-name">{o.name}</p>
                            <p className="order-meta">Qty {o.qty} · {o.orderType || "MARKET"} · {o.productType || "CNC"}</p>
                          </div>
                        </div>
                        <div className="order-row-right">
                          <p className="order-price">₹{fmt(o.price)}</p>
                          <p className="order-meta">Value ₹{fmt(o.price * o.qty)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
