const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    Title: {
      type: String,
      require: true,
      unique: true,
    },
    Author: {
      type: String,
      require: true,
    },
    CreatedAt: {
      type: Date,
      default: Date.now(),
    },
    ISBN: {
      type: Number,
      require: true,
      unique: true,
    },
    RentPrice: {
      type: Number,
      require: true,
    },
    Fine: {
      type: Number,
      require: true,
    },
    Image: {
      type: String,
      require: true,
    },
    IsAvailable: {
      type: Boolean,
      default: true,
    },
    Language: {
      type: String,
      require: true,
    },
    CategoryId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", BookSchema);
