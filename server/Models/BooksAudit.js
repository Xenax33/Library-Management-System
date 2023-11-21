const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const BookAuditSchema = new Schema(
  {
    UpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    BookId: {
      type: String,
      required: true,
      unique: false
    },
    TitleBefore: {
      type: String,
      required: true,
      unique: false,
    },
    TitleAfter: {
      type: String,
      required: true,
      unique: false
    },
    AuthorBefore: {
      type: String,
      required: true,
      unique: false
    },
    AuthorAfter: {
      type: String,
      required: true,
      unique: false
    },
    ISBNbefore: {
      type: Number,
      required: true,
      unique: false
    },
    ISBNafter: {
      type: Number,
      required: true,
      unique: false
    },
    RentPriceBefore: {
      type: Number,
      required: true,
      unique: false
    },
    RentPriceAfter: {
      type: Number,
      required: true,
      unique: false
    },
    FineBefore: {
      type: Number,
      required: true,
      unique: false
    },
    FineAfter: {
      type: Number,
      required: true,
      unique: false
    },
    ImageBefore: {
      type: String,
      required: true,
      unique: false
    },
    ImageAfter: {
      type: String,
      required: true,
      unique: false
    },
    LanguageBefore: {
      type: String,
      required: true,
      unique: false
    },
    LanguageAfter: {
      type: String,
      required: true,
      unique: false
    },
    CategoryIdBefore: {
      type: String,
      required: true,
      unique: false
    },
    CategoryIdAfter: {
      type: String,
      required: true,
      unique: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books_audit", BookAuditSchema);
