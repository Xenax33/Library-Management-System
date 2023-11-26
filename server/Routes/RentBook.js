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
    const data = await RentBook.find({
      UserId: UserId,
      BookId: BookId,
      ReturnedAt: null,
    });

    if (data.length > 0) {
      res.send({ success: false, data: data });
    } else {
      res.send({ success: true });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

router.get("/getlist/:UserId", async (req, res) => {
  const { UserId } = req.params;
  try {
    const data = await RentBook.find({ UserId: UserId, ReturnedAt: null });
    res.send({ success: true, data: data });
  } catch (err) {
    res.send({ success: false, error: err });
  }
});

//late submission api

router.put("/lateSubmitted/:UserId/:BookId", async (req, res) => {
  const UserId = req.params.UserId;
  const BookId = req.params.BookId;

  try {
    // Use findOne instead of find to get a single document
    const data = await RentBook.findOne({
      UserId: UserId,
      BookId: BookId,
      ReturnedAt: null,
    });

    if (data) {
      // Update the document properties
      const chargedAmount = Number(req.body.Charged);
      data.ReturnedAt = Date.now();
      data.IsLateSubmit = true;
      data.Charged = chargedAmount;

      // Save the changes
      await data.save();

      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.json({ success: false, message: "Rent record not found" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// not late submission api

router.put("/returnBook/:UserId/:BookId", async (req, res) => {
  const UserId = req.params.UserId;
  const BookId = req.params.BookId;
  try {
    // Use findOne instead of find to get a single document
    const data = await RentBook.findOne({
      UserId: UserId,
      BookId: BookId,
      ReturnedAt: null,
    });

    if (data) {
      // Update the document properties
      const chargedAmount = Number(req.body.Charged);
      data.ReturnedAt = Date.now();
      data.Charged = chargedAmount;

      // Save the changes
      await data.save();

      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.json({ success: false, message: "Rent record not found" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.get("/rentedCheck/:BookId", async (req, res) => {
  const BookId = req.params.BookId;
  try {
    const data = await RentBook.find({
      BookId: BookId,
      ReturnedAt: null,
    });

    if (data.length > 0) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

router.get("/getuser/:UserId", async (req, res) => {
  const UserId = req.params.UserId;
  try {
    const data = await RentBook.find({
      UserId: UserId,
      ReturnedAt: null,
    });

    if (data.length > 0) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});


router.get("/getTotalRentBooks", async (req, res) => {
  try {
    // Count the total number of books
    const totalUser = await RentBook.countDocuments();

    res.json({ success: true, totalUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
