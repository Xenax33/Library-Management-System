const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const UserSchema = new Schema({
  NameBefore: {
    type: String,
  },
  NameAfter: {
    type: String,
  },
  Email: {
    type: String,
  },
  PasswordBefore: {
    type: String,
  },
  PasswordAfter: {
    type: String,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  CNICBefore: {
    type: String,
  },
  CNICAfter: {
    type: String,
  },
  PhoneNoBefore: {
    type: String,
  },
  PhoneNoAfter: {
    type: String,
  },
  ImageBefore: {
    type: String,
  },
  ImageAfter: {
    type: String,
  },
});

module.exports = mongoose.model("userAudit", UserSchema);
