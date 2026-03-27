import React, { useState } from "react";

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const IconWallet  = ({ c = "#10b981" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>;
const IconShield  = ({ c = "#f59e0b" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconDown    = ({ c = "#387ed1" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>;
const IconUp      = ({ c = "#6b7280" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>;
const IconClose   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconUPI     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#387ed1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const IconBank    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const IconCheck   = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const equityRows = [
  { label: "Used margin",         key: "usedMargin" },
  { label: "Payin",               key: "payin" },
  { label: "SPAN",                value: "0.00" },
  { label: "Delivery margin",     value: "0.00" },
  { label: "Exposure",            value: "0.00" },
  { label: "Options premium",     value: "0.00" },
  { label: "Collateral (Liquid)", value: "0.00" },
  { label: "Collateral (Equity)", value: "0.00" },
];

const nowStr = () => {
  const d = new Date();
  return `Today, ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
};

const Modal = ({ mode, balance, onClose, onConfirm }) => {
  const [amount, setAmount]     = useState("");
  const [method, setMethod]     = useState("upi");
  const [upiId, setUpiId]       = useState("");
  const [step, setStep]         = useState("form"); // form | processing | done | error
  const [errMsg, setErrMsg]     = useState("");
  const isAdd = mode === "add";

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = Number(amount);
    if (!val || val <= 0) return;
    if (!isAdd && val > balance) { setErrMsg(`Insufficient balance. Available: ₹${fmt(balance)}`); return; }
    if (isAdd && method === "upi" && !upiId.trim()) { setErrMsg("Please enter your UPI ID"); return; }
    setErrMsg("");
    setStep("processing");
    setTimeout(() => { setStep("done"); onConfirm(isAdd ? val : -val); }, 2000);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={step === "processing" ? null : onClose}>
      <div style={{ background:"#fff", borderRadius:20, width:"100%", maxWidth:420, padding:28, boxShadow:"0 24px 64px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <div>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{isAdd ? "Add Funds" : "Withdraw Funds"}</h3>
            <p style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>{isAdd ? "Instant transfer via UPI or Net Banking" : "Transfer to your linked bank account"}</p>
          </div>
          {step !== "processing" && (
            <button onClick={onClose} style={{ background:"#f3f4f6", border:"none", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <IconClose />
            </button>
          )}
        </div>

        {/* Processing */}
        {step === "processing" && (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ width:56, height:56, borderRadius:"50%", border:"3px solid #e8eaed", borderTopColor: isAdd ? "#10b981" : "#ef4444", margin:"0 auto 20px", animation:"spin 0.8s linear infinite" }} />
            <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:"0 0 6px" }}>Processing...</p>
            <p style={{ fontSize:12, color:"#9ca3af" }}>{isAdd ? "Verifying your UPI payment" : "Initiating bank transfer"}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ width:60, height:60, borderRadius:"50%", background:"#f0fdf4", border:"2px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <IconCheck />
            </div>
            <p style={{ fontSize:16, fontWeight:700, color:"#111827", margin:"0 0 6px" }}>{isAdd ? "Funds Added!" : "Withdrawal Initiated!"}</p>
            <p style={{ fontSize:13, color:"#9ca3af", margin:"0 0 4px" }}>
              <span style={{ fontWeight:700, color: isAdd ? "#10b981" : "#ef4444" }}>₹{fmt(Number(amount))}</span> {isAdd ? "added to your account" : "will reach your bank in 1–2 days"}
            </p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:"0 0 24px" }}>New balance: <strong style={{ color:"#111827" }}>₹{fmt(isAdd ? balance + Number(amount) : balance - Number(amount))}</strong></p>
            <button onClick={onClose} style={{ padding:"10px 32px", background:"#111827", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer" }}>Done</button>
          </div>
        )}

        {/* Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit}>
            {isAdd && (
              <div style={{ display:"flex", gap:8, marginBottom:18 }}>
                {[{ id:"upi", label:"UPI", icon:<IconUPI /> }, { id:"netbanking", label:"Net Banking", icon:<IconBank /> }].map(m => (
                  <button type="button" key={m.id} onClick={() => setMethod(m.id)} style={{
                    flex:1, padding:"10px 12px", borderRadius:10, border:`1.5px solid ${method===m.id?"#387ed1":"#e8eaed"}`,
                    background: method===m.id ? "#eff6ff" : "#fff", cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                    fontSize:12, fontWeight:600, color: method===m.id ? "#387ed1" : "#6b7280",
                  }}>{m.icon}{m.label}</button>
                ))}
              </div>
            )}

            {/* Balance info */}
            <div style={{ background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:"#9ca3af" }}>{isAdd ? "Current Balance" : "Available to Withdraw"}</span>
              <span style={{ fontSize:12, fontWeight:700, color:"#111827" }}>₹{fmt(balance)}</span>
            </div>

            {/* Amount */}
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:11, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.05em", display:"block", marginBottom:7 }}>Amount (₹)</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:15, fontWeight:600, color:"#9ca3af" }}>₹</span>
                <input
                  type="number" min="1" max={isAdd ? undefined : balance} placeholder="0.00"
                  value={amount} onChange={e => { setAmount(e.target.value); setErrMsg(""); }}
                  style={{ width:"100%", padding:"12px 14px 12px 30px", border:"1.5px solid #e8eaed", borderRadius:10, fontSize:16, fontWeight:700, outline:"none", boxSizing:"border-box", fontFamily:"Inter,sans-serif" }}
                  onFocus={e => e.target.style.borderColor = isAdd ? "#10b981" : "#ef4444"}
                  onBlur={e => e.target.style.borderColor = "#e8eaed"}
                  required
                />
              </div>
              <div style={{ display:"flex", gap:6, marginTop:8 }}>
                {[1000,2000,5000,10000].map(v => (
                  <button type="button" key={v} onClick={() => { setAmount(v); setErrMsg(""); }} style={{ flex:1, padding:"5px 0", fontSize:11, fontWeight:600, color:"#387ed1", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:6, cursor:"pointer" }}>
                    +{v/1000}K
                  </button>
                ))}
              </div>
            </div>

            {isAdd && method === "upi" && (
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.05em", display:"block", marginBottom:7 }}>UPI ID</label>
                <input
                  type="text" placeholder="yourname@upi" value={upiId}
                  onChange={e => { setUpiId(e.target.value); setErrMsg(""); }}
                  style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8eaed", borderRadius:10, fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"Inter,sans-serif" }}
                  onFocus={e => e.target.style.borderColor="#387ed1"}
                  onBlur={e => e.target.style.borderColor="#e8eaed"}
                />
              </div>
            )}

            {!isAdd && (
              <div style={{ background:"#f9fafb", border:"1px solid #e8eaed", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 4px" }}>Withdrawing to</p>
                <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>HDFC Bank •••• 4521</p>
              </div>
            )}

            {errMsg && (
              <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:12, color:"#ef4444", fontWeight:500 }}>
                {errMsg}
              </div>
            )}

            <button type="submit" style={{ width:"100%", padding:"13px", background: isAdd ? "#10b981" : "#ef4444", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {isAdd ? `Add ₹${amount ? fmt(Number(amount)) : "0.00"}` : `Withdraw ₹${amount ? fmt(Number(amount)) : "0.00"}`}
            </button>
            <p style={{ fontSize:11, color:"#9ca3af", textAlign:"center", marginTop:10 }}>
              {isAdd ? "Zero charges · Instant via UPI" : "Processed within 1–2 business days"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

const Funds = () => {
  const [modal, setModal]           = useState(null);
  const [balance, setBalance]       = useState(4043.10);
  const [txns, setTxns]             = useState([
    { type:"credit", label:"UPI Transfer",  sub:"HDFC Bank •••4521",  amount:5000,  date:"Today, 10:32 AM" },
    { type:"debit",  label:"Withdrawal",    sub:"ICICI Bank •••8823", amount:2000,  date:"Yesterday, 3:15 PM" },
    { type:"credit", label:"UPI Transfer",  sub:"SBI •••1102",        amount:10000, date:"12 Jul, 9:00 AM" },
    { type:"debit",  label:"Withdrawal",    sub:"HDFC Bank •••4521",  amount:3500,  date:"10 Jul, 5:45 PM" },
  ]);

  const handleConfirm = (delta) => {
    setBalance(prev => +(prev + delta).toFixed(2));
    setTxns(prev => [{
      type:   delta > 0 ? "credit" : "debit",
      label:  delta > 0 ? "UPI Transfer" : "Withdrawal",
      sub:    delta > 0 ? "UPI Payment" : "HDFC Bank •••4521",
      amount: Math.abs(delta),
      date:   nowStr(),
    }, ...prev]);
  };

  const usedMargin = 3757.30;
  const stats = [
    { label:"Available Margin", val: balance,      color:"#10b981", bg:"#f0fdf4", border:"#bbf7d0", icon:<IconWallet c="#10b981"/> },
    { label:"Used Margin",      val: usedMargin,   color:"#f59e0b", bg:"#fffbeb", border:"#fde68a", icon:<IconShield c="#f59e0b"/> },
    { label:"Available Cash",   val: balance,      color:"#387ed1", bg:"#eff6ff", border:"#bfdbfe", icon:<IconDown c="#387ed1"/> },
    { label:"Opening Balance",  val: 4043.10,      color:"#6b7280", bg:"#f9fafb", border:"#e5e7eb", icon:<IconUp c="#6b7280"/> },
  ];

  return (
    <>
      <style>{`
        .funds-tbl { width:100%; border-collapse:collapse; }
        .funds-tbl td { padding:11px 0; font-size:13px; border-bottom:1px solid #f3f4f6; }
        .funds-tbl tr:last-child td { border-bottom:none; }
      `}</style>

      {modal && <Modal mode={modal} balance={balance} onClose={() => setModal(null)} onConfirm={(d) => { handleConfirm(d); }} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.3px" }}>Funds</h3>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>Instant, zero-cost fund transfers with UPI</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => setModal("add")} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 20px", background:"#10b981", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", boxShadow:"0 2px 8px rgba(16,185,129,0.25)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Funds
          </button>
          <button onClick={() => setModal("withdraw")} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 20px", background:"#fff", color:"#374151", border:"1px solid #e8eaed", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            Withdraw
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:12, padding:"18px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <p style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", margin:0 }}>{s.label}</p>
              {s.icon}
            </div>
            <p style={{ fontSize:22, fontWeight:700, color:s.color, margin:0 }}>₹{fmt(s.val)}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>

        {/* Equity */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e8eaed", padding:"20px 22px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div>
              <h4 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Equity</h4>
              <p style={{ fontSize:12, color:"#9ca3af", margin:"3px 0 0" }}>NSE / BSE</p>
            </div>
            <span style={{ fontSize:11, fontWeight:600, color:"#10b981", background:"#f0fdf4", border:"1px solid #bbf7d0", padding:"3px 10px", borderRadius:20 }}>Active</span>
          </div>
          <table className="funds-tbl">
            <tbody>
              <tr>
                <td style={{ color:"#6b7280" }}>Available margin</td>
                <td style={{ textAlign:"right", fontWeight:600, color:"#387ed1" }}>₹{fmt(balance)}</td>
              </tr>
              {equityRows.map(row => (
                <tr key={row.label}>
                  <td style={{ color:"#6b7280" }}>{row.label}</td>
                  <td style={{ textAlign:"right", fontWeight:600, color:"#111827" }}>
                    ₹{row.key === "usedMargin" ? fmt(usedMargin) : row.key === "payin" ? fmt(balance + 20.90) : row.value}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight:700, color:"#111827", paddingTop:14 }}>Total Collateral</td>
                <td style={{ textAlign:"right", fontWeight:700, color:"#111827", paddingTop:14 }}>₹0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right col */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Transactions */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e8eaed", padding:"20px 22px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <h4 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 16px" }}>Recent Transactions</h4>
            {txns.slice(0, 5).map((t, i, arr) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i < arr.length-1 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", background: t.type==="credit" ? "#f0fdf4" : "#fef2f2", flexShrink:0 }}>
                    {t.type === "credit" ? <IconDown c="#10b981" /> : <IconUp c="#ef4444" />}
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{t.label}</p>
                    <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>{t.sub} · {t.date}</p>
                  </div>
                </div>
                <p style={{ fontSize:13, fontWeight:700, color: t.type==="credit" ? "#10b981" : "#ef4444", margin:0 }}>
                  {t.type==="credit" ? "+" : "-"}₹{fmt(t.amount)}
                </p>
              </div>
            ))}
          </div>

          {/* Commodity */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e8eaed", padding:"24px 22px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", flex:1, justifyContent:"center" }}>
            <div style={{ width:48, height:48, borderRadius:14, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>
              </svg>
            </div>
            <h4 style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 6px" }}>Commodity Account</h4>
            <p style={{ fontSize:12, color:"#9ca3af", lineHeight:1.6, margin:"0 0 16px", maxWidth:220 }}>You don't have a commodity account yet. Open one to trade in MCX.</p>
            <button style={{ padding:"9px 22px", background:"#111827", color:"#fff", border:"none", borderRadius:9, fontSize:12, fontWeight:600, cursor:"pointer" }}>Open Account</button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={{ background:"linear-gradient(135deg,#eff6ff,#f0fdf4)", border:"1px solid #bfdbfe", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:40, height:40, borderRadius:10, background:"#fff", border:"1px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <IconShield c="#387ed1" />
        </div>
        <div>
          <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>Instant &amp; Secure Transfers</p>
          <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>Add funds instantly via UPI with zero charges. Withdrawals processed within 1–2 business days.</p>
        </div>
      </div>
    </>
  );
};

export default Funds;
