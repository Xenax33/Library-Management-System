const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const RentBookSchema = new Schema(
    {
        RentedAt:{
            type: Date,
            require: true,
            default:Date.now()
        },
        ReturnedAt:{
            type:Date,
            default: null
        },
        Charged:{
            type: Number,
        },
        IsLateSubmit:{
            type: Boolean,
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