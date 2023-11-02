const express = require("express");
const router = express.Router();
const Reserved = require("../Models/Reserved");
router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  const data = await Reserved.find();
  console.log(data);
  res.send({ success: true, data: data });
});

module.exports = router;