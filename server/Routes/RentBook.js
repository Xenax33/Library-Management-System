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

router.get("/returnCheck/:UserId/:BookId", async (req, res) => {
  const UserId = req.params.UserId;
  const BookId = req.params.BookId;

  try {
    const data = await RentBook.find({ UserId: UserId, BookId: BookId, ReturnedAt: null });

    if (data.length > 0) {
      res.send({ success: false, data: data });
    } else {
      res.send({ success: true });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});


module.exports = router;
