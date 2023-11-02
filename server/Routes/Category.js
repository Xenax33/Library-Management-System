const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");
router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  const data = await Category.find();
  console.log(data);
  res.send({ success: true, data: data });
});

module.exports = router;
