const express = require("express");
const router = express.Router();
const RentBook = require("../Models/RentBook");
router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  const data = await RentBook.find();
  console.log(data);
  res.send({ success: true, data: data });
});

module.exports = router;
