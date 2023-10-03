const mongoose = require("mongoose");
const express = require("express");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  BuyerId: {
    type: String,
    require: true,
  },
  ProductName: {
    type: String,
    require: true,
  },
  OrderedAt: {
    type: Date,
    default: Date.now,
  },
  Price: {
    type: Number,
    require: true,
  },
  Quantity: {
    type: Number,
    require: true,
  },
  Total: {
    type: Number
  },
});

OrderSchema.pre("save", function (next) {
  this.Total = this.Price * this.Quantity;
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
