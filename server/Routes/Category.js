const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");
const Category = require("../Models/Category");
// const bcrypt = require('bcrypt');

router.get("/",async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while fetching customers" });
      }
});

module.exports = router;