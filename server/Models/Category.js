const mongoose = require("mongoose");
const express = require("express");
const { Schema } = mongoose;

const CategorySchema = new Schema({
    Name: {
        type: String,
        require : true,
        unique: true
    }
})

module.exports = mongoose.model("Category", CategorySchema);