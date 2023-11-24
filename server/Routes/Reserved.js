const express = require("express");
const router = express.Router();
const Reserved = require("../Models/Reserved");
router.use(express.json());

router.get("/", async (req, res) => {
  const data = await Reserved.find();
  res.send({ success: true, data: data });
});

router.post("/create", async (req, res) => {
  const data = Reserved(req.body);
  await data.save().catch((err) => {
    res.send({ success: false });
  });
  res.send({ success: true });
});

router.get("/checkUser/:UserId/:BookId" , async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const BookId = req.params.BookId;
    const data = await Reserved.find({ UserId: UserId, BookId: BookId });

    if (data.length > 0) {
      res.send({ success: false, data: data });
    } else {
      res.send({ success: true, message: "No data found for the given Name." });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});


module.exports = router;
