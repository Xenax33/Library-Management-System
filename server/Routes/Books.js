const express = require("express");
const router = express.Router();
const Book = require("../Models/Books");
router.use(express.json());
// router.use(cors());

router.get("/getBooks", async (req, res) => {
  const data = await Book.find();
  res.send({ success: true, data: data });
});

router.get("/getbook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Book.find({ _id: id });
    res.send({ success: true, data: data });
  } catch (err) {
    res.send({ success: false });
  }
});

router.post("/create", async (req, res) => {
  const data = Book(req.body);
  await data.save().catch((err) => {
    res.send({ success: false });
  });
  res.send({ success: true });
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: updatedBook });
  } catch (err) {
    res.send({ success: false, error: err });
  }
});

router.put("/changeavailability/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the current book document
    const currentBook = await Book.findById(id);

    if (!currentBook) {
      return res.status(404).send({ success: false, error: "Book not found" });
    }

    // Update the IsAvailable to the opposite value
    currentBook.IsAvailable = !currentBook.IsAvailable;

    // Save the updated document
    const updatedBook = await currentBook.save();

    res.send({ success: true, data: updatedBook });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

router.put("/returningBook/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the current book document
    const currentBook = await Book.findById(id);

    if (!currentBook) {
      return res.status(404).send({ success: false, error: "Book not found" });
    }

    // Update the IsAvailable to the opposite value
    currentBook.IsAvailable = !currentBook.IsAvailable;
    const chargedAmount = Number(req.body.Charged);
    currentBook.TotalEarning += chargedAmount;

    // Save the updated document
    const updatedBook = await currentBook.save();

    res.send({ success: true, data: updatedBook });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

module.exports = router;
