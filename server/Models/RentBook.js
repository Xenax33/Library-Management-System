const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const RentBookSchema = new Schema(
    {
        RentedAt:{
            type: Date,
            default:Date.now()
        },
        ReturnedAt:{
            type:Date,
            default: null
        },
        Charged:{
            type: Number,
            default: 0,
        },
        IsLateSubmit:{
            type: Boolean,
            default: false
        },
        UserId:{
            type: String,
            require:true
        },
        BookId:{
            type: String,
            require: true
        }
    }
)

module.exports = mongoose.model("rentbook", RentBookSchema);