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

router.post("/create", async (req, res) => {
  const data = RentBook(req.body);
  await data.save().catch((err) => {
    res.send({ success: false });
  });
  res.send({ success: true });
});

module.exports = router;
