import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map(s => s.name);

const WatchList = () => {
  const [search, setSearch] = useState("");

  const filtered = watchlist.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const data = {
    labels,
    datasets: [{
      label: "Price",
      data: watchlist.map(s => s.price),
      backgroundColor: [
        "rgba(59,130,246,0.6)", "rgba(16,185,129,0.6)", "rgba(245,158,11,0.6)",
        "rgba(239,68,68,0.6)", "rgba(139,92,246,0.6)", "rgba(236,72,153,0.6)",
      ],
      borderColor: [
        "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899",
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginRight: "8px" }}>
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search eg: INFY, TCS..."
          className="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ color: "#374151" }}
        />
        <span className="counts">{watchlist.length}/50</span>
      </div>

      <ul className="list">
        {filtered.length === 0 ? (
          <li style={{ padding: "20px 14px", textAlign: "center", color: "#9ca3af", fontSize: "12px" }}>No results found</li>
        ) : (
          filtered.map((stock, i) => <WatchListItem stock={stock} key={i} />)
        )}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <li>
      <div className="item">
        <div>
          <p style={{ fontSize: "12px", fontWeight: "600", color: stock.isDown ? "#ef4444" : "#10b981" }}>{stock.name}</p>
          <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "2px" }}>NSE</p>
        </div>
        <div className="itemInfo">
          <span className={stock.isDown ? "down" : "up"} style={{ fontSize: "11px", fontWeight: "500" }}>
            {stock.isDown ? <KeyboardArrowDown style={{ fontSize: "14px" }} /> : <KeyboardArrowUp style={{ fontSize: "14px" }} />}
            {stock.percent}
          </span>
          <span className="price" style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginLeft: "6px" }}>
            ₹{stock.price}
          </span>
        </div>
      </div>
      <span className="actions">
        <span>
          <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
            <button className="buy" onClick={() => generalContext.openBuyWindow(stock.name)}>Buy</button>
          </Tooltip>
          <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
            <button className="sell" onClick={() => generalContext.openSellWindow(stock.name)}>Sell</button>
          </Tooltip>
          <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
            <button className="action"><BarChartOutlined style={{ fontSize: "14px", color: "#6b7280" }} /></button>
          </Tooltip>
          <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
            <button className="action"><MoreHoriz style={{ fontSize: "14px", color: "#6b7280" }} /></button>
          </Tooltip>
        </span>
      </span>
    </li>
  );
};
