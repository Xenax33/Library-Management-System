const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  Active: {
    type: Boolean,
    default: true,
  },
  CNIC: {
    type: String,
    require: true,
  },
  PhoneNo:{
    type: Number,
    unique:true
  },
  Image:{
    type:String,
    data: Buffer,
  }
}, {timestamps : true });

module.exports = mongoose.model("user", UserSchema);
