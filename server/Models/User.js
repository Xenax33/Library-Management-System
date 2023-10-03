const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Role: {
    type: String,
    require: true,
  },
  Address: {
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
});

module.exports = mongoose.model("user", UserSchema);
