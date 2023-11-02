const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const UserSchema = new Schema({
  OldName: {
    type: String,
    require: true,
  },
  NewName: {
    type: String,
  },
  OldEmail: {
    type: String,
    require: true,
  },
  NewEmail: {
    type: String,
  },
  OldPassword: {
    type: String,
    require: true,
  },
  NewPassword: {
    type: String,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  Active: {
    type: Boolean,
    default: false,
  },
  OldCNIC: {
    type: String,
    require: true,
  },
  NewCNIC: {
    type: String,
  },
  OldPhoneNo: {
    type: Number,
  },
  NewPhoneNo: {
    type: Number,
  },
  OldImage: {
    type: String,
  },
  NewImage: {
    type: String,
  },
});

module.exports = mongoose.model("userAudit", UserSchema);
