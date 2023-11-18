const express = require("express");
const router = express.Router();
const Book = require("../Models/Books");
router.use(express.json());
// router.use(cors());

router.get("/getBooks", async (req, res) => {
    const data = await Book.find();
    res.send({ success: true, data: data });
  });

router.post("/create" , async(req,res) =>
  {
    const data = Book(req.body);
    await data.save().catch((err) => {
      res.send({ success: false });
    });
    res.send({ success: true });
  })
module.exports = router;
