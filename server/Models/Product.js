const mongoose = require("mongoose");
const express = require("express");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    // SellerId: {
    //     type: String,
    //     require: true
    // },
    Name:{
        type: String,
        require : true,
        unique:true
    },
    BuyPrice : {
        type : Number,
        require : true,
        min : 0
    },
    Price: {
        type : Number,
        require : true,
        min : 0
    },
    CategoryId : {
        type : String,
        require : true,
    },
    Image: {
        type : String,
        require : true,
        unique : true
    },
    Quantity : {
        type: Number,
        min:0,
        default:0
    },
    Date : {
        type : Date,
        default : Date.now() 
    },
    TotalSold : {
        type : Number,
        default : 0,
    },
    TotalRevenue : {
        type : Number,
        default :0
    }
});

module.exports = mongoose.model("Product", ProductSchema);