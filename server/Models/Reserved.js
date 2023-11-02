const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Schema } = mongoose;

const ReservedSchema = new Schema(
    {
        UserId:{
            type : String,
            require:true
        },
        BookId:{
            type:String,
            require:true,
        }
        ,
        ReservedAt:{
            type: Date,
            require:true,
            default:Date.now()
        },
        IsRented:{
            type:Boolean,
            default:false,
        }
    }
)

module.exports = mongoose.model("reserved", ReservedSchema);