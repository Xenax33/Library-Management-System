const express = require("express");
const router = express.Router();
const Reserved = require("../Models/Reserved");
router.use(express.json());

router.get("/", async (req, res) => {
  const data = await Reserved.find();
  res.send({ success: true, data: data });
});

router.get("/getlist/:userId", async (req, res) => {
  const { userId } = req.params; // Use userId instead of id
  const data = await Reserved.find({ UserId: userId, IsRented: false });
  res.send({ success: true, data: data });
});

router.post("/create", async (req, res) => {
  const data = Reserved(req.body);
  await data.save().catch((err) => {
    res.send({ success: false });
  });
  res.send({ success: true });
});

router.get("/checkUser/:UserId/:BookId", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Reserved.findByIdAndRemove(id);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
});

router.put("/rented/:UserId/:BookId", async (req, res) => {
  const UserId = req.params.UserId;
  const BookId = req.params.BookId;

  try {
    const data = await Reserved.findOne({
      UserId: UserId,
      BookId: BookId,
      IsRented: false,
    });

    if (data) {
      // Update the document properties
      data.IsRented = true;

      // Save the changes
      await data.save();

      res.json({ success: true, message: "Data updated successfully" });
    } else {
      res.json({ success: false, message: "Rent record not found" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
module.exports = router;
