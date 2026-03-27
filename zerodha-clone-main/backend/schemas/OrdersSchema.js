const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  orderType: { type: String, default: "MARKET" },
  productType: { type: String, default: "CNC" },
  validity: { type: String, default: "DAY" },
}, { timestamps: true });

module.exports = { OrdersSchema };
