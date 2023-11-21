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

router.put("/edit/:id" , async(req,res) =>
  {
    try
    {
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send({success: true , data : updatedBook})
    }
    catch(err)
    {
      res.send({success: false , error: err})
    }
  })
module.exports = router;
