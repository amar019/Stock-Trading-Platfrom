import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import API_BASE from "../config";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialMode = "BUY" }) => {
  const [mode, setMode] = useState(initialMode);
  const [orderType, setOrderType] = useState("MARKET"); // MARKET | LIMIT | SL | SL-M
  const [productType, setProductType] = useState("CNC");  // CNC | MIS | NRML
  const [validity, setValidity] = useState("DAY");        // DAY | IOC
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [statusMsg, setStatusMsg] = useState("");

  const generalContext = useContext(GeneralContext);
  const stock = watchlist.find(s => s.name === uid);
  const ltp = stock ? stock.price : 0;

  useEffect(() => {
    if (orderType === "MARKET") setPrice(ltp);
    else setPrice(ltp);
  }, [orderType, uid, ltp]); // eslint-disable-line react-hooks/exhaustive-deps

  const isMarket = orderType === "MARKET";
  const isSL = orderType === "SL" || orderType === "SL-M";
  const totalValue = (qty * (isMarket ? ltp : price)).toFixed(2);
  const marginReq = (totalValue * 0.2).toFixed(2);

  const handleSubmit = async () => {
    if (!qty || qty <= 0) return setStatusMsg("Enter valid quantity") || setStatus("error");
    if (!isMarket && (!price || price <= 0)) return setStatusMsg("Enter valid price") || setStatus("error");
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API_BASE}/newOrder`, {
        name: uid,
        qty: Number(qty),
        price: isMarket ? ltp : Number(price),
        mode,
        orderType,
        productType,
        validity,
      });
      setStatus("success");
      setStatusMsg(`${mode} order placed! ${uid} × ${qty} @ ₹${isMarket ? ltp : price}`);
      setTimeout(() => generalContext.closeBuyWindow(), 2500);
    } catch {
      setStatus("error");
      setStatusMsg("Order failed. Please try again.");
      setLoading(false);
    }
  };

  const isBuy = mode === "BUY";
  const accent = isBuy ? "#387ed1" : "#e05b5b";
  const accentLight = isBuy ? "#ebf3fb" : "#fdf0f0";

  return (
    <>
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 999,
      }} onClick={generalContext.closeBuyWindow} />

      <div className="order-window">
        {/* Top Tab Bar */}
        <div style={{ display: "flex", borderBottom: "2px solid #f0f0f0" }}>
          {["BUY", "SELL"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "12px", border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: "700", letterSpacing: "0.5px",
              background: mode === m ? (m === "BUY" ? "#ebf3fb" : "#fdf0f0") : "#fff",
              color: mode === m ? (m === "BUY" ? "#387ed1" : "#e05b5b") : "#9ca3af",
              borderBottom: mode === m ? `3px solid ${m === "BUY" ? "#387ed1" : "#e05b5b"}` : "3px solid transparent",
              transition: "all 0.15s",
            }}>{m}</button>
          ))}
          <button onClick={generalContext.closeBuyWindow} style={{
            padding: "0 16px", border: "none", background: "#fff",
            color: "#9ca3af", fontSize: "18px", cursor: "pointer"
          }}>×</button>
        </div>

        {/* Stock Info */}
        <div style={{ padding: "12px 16px", background: accentLight, borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>{uid}</span>
            <span style={{ fontSize: "11px", color: "#9ca3af", marginLeft: "8px", background: "#fff", padding: "2px 6px", borderRadius: "4px", border: "1px solid #e8eaed" }}>NSE</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "15px", fontWeight: "700", color: accent }}>₹{ltp}</p>
            <p style={{ fontSize: "11px", color: stock?.isDown ? "#e05b5b" : "#10b981" }}>{stock?.percent}</p>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {/* Product Type */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
            {["CNC", "MIS", "NRML"].map(p => (
              <button key={p} onClick={() => setProductType(p)} style={{
                padding: "5px 14px", borderRadius: "4px", cursor: "pointer",
                fontSize: "12px", fontWeight: "600", transition: "all 0.15s",
                background: productType === p ? accent : "#f3f4f6",
                color: productType === p ? "#fff" : "#6b7280",
                border: `1px solid ${productType === p ? accent : "#e8eaed"}`,
              }}>{p}</button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
              {["DAY", "IOC"].map(v => (
                <button key={v} onClick={() => setValidity(v)} style={{
                  padding: "5px 12px", borderRadius: "4px", cursor: "pointer",
                  fontSize: "12px", fontWeight: "600", transition: "all 0.15s",
                  background: validity === v ? "#374151" : "#f3f4f6",
                  color: validity === v ? "#fff" : "#6b7280",
                  border: `1px solid ${validity === v ? "#374151" : "#e8eaed"}`,
                }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Order Type */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
            {["MARKET", "LIMIT", "SL", "SL-M"].map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                padding: "5px 12px", borderRadius: "4px", cursor: "pointer",
                fontSize: "11px", fontWeight: "600", transition: "all 0.15s",
                background: orderType === t ? "#111827" : "#f3f4f6",
                color: orderType === t ? "#fff" : "#6b7280",
                border: `1px solid ${orderType === t ? "#111827" : "#e8eaed"}`,
              }}>{t}</button>
            ))}
          </div>

          {/* Inputs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
            {/* Qty */}
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600", display: "block", marginBottom: "5px" }}>QTY.</label>
              <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)}
                style={{ width: "100%", padding: "9px 10px", border: "1.5px solid #e8eaed", borderRadius: "6px", fontSize: "14px", fontWeight: "600", outline: "none", boxSizing: "border-box", fontFamily: "Inter,sans-serif" }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = "#e8eaed"}
              />
            </div>

            {/* Price */}
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "11px", color: isMarket ? "#d1d5db" : "#9ca3af", fontWeight: "600", display: "block", marginBottom: "5px" }}>PRICE</label>
              <input type="number" step="0.05" value={isMarket ? "Market" : price}
                disabled={isMarket}
                onChange={e => setPrice(e.target.value)}
                style={{ width: "100%", padding: "9px 10px", border: "1.5px solid #e8eaed", borderRadius: "6px", fontSize: "14px", fontWeight: "600", outline: "none", boxSizing: "border-box", fontFamily: "Inter,sans-serif", background: isMarket ? "#f9fafb" : "#fff", color: isMarket ? "#9ca3af" : "#111827" }}
                onFocus={e => !isMarket && (e.target.style.borderColor = accent)}
                onBlur={e => e.target.style.borderColor = "#e8eaed"}
              />
            </div>

            {/* Trigger Price for SL */}
            {isSL && (
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600", display: "block", marginBottom: "5px" }}>TRIGGER</label>
                <input type="number" step="0.05" value={triggerPrice} onChange={e => setTriggerPrice(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1.5px solid #e8eaed", borderRadius: "6px", fontSize: "14px", fontWeight: "600", outline: "none", boxSizing: "border-box", fontFamily: "Inter,sans-serif" }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = "#e8eaed"}
                />
              </div>
            )}
          </div>

          {/* Margin Info */}
          <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 12px", marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "11px", color: "#9ca3af" }}>Margin required</p>
              <p style={{ fontSize: "14px", fontWeight: "700", color: accent }}>₹{marginReq}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#9ca3af" }}>Order value</p>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>₹{totalValue}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#9ca3af" }}>Available margin</p>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#10b981" }}>₹3,740.00</p>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div style={{
              padding: "10px 12px", borderRadius: "8px", marginBottom: "12px", fontSize: "13px", fontWeight: "500",
              background: status === "success" ? "#f0fdf4" : "#fef2f2",
              color: status === "success" ? "#10b981" : "#ef4444",
              border: `1px solid ${status === "success" ? "#bbf7d0" : "#fecaca"}`,
            }}>
              {status === "success" ? "✓ " : "✕ "}{statusMsg}
            </div>
          )}

          {/* Submit Button */}
          <button onClick={handleSubmit} disabled={loading || status === "success"} style={{
            width: "100%", padding: "13px", borderRadius: "6px", border: "none",
            background: status === "success" ? "#10b981" : accent,
            color: "#fff", fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1, transition: "all 0.2s", letterSpacing: "0.3px"
          }}>
            {status === "success" ? "✓ Order Placed!" : loading ? "Placing Order..." : `${mode === "BUY" ? "Buy" : "Sell"} ${uid}`}
          </button>

          {/* Disclaimer */}
          <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "10px" }}>
            {productType === "CNC" ? "CNC — Delivery order, held overnight" : productType === "MIS" ? "MIS — Intraday, auto-squared off at 3:20 PM" : "NRML — F&O overnight position"}
          </p>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;
