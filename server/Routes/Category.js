const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");
router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  try {
    const data = await Category.find();
    res.send({ success: true, data: data });
  } catch (error) {
    res.send({ success: false, error: error });
  }
});

router.get("/check/:Name", async (req, res) => {
  try {
    const { Name } = req.params
    const data = await Category.find({ Name: Name });

    if (data.length > 0) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false, message: "No data found for the given Name." });
    }
  } catch (error) {
    res.send({ success: true, error: error.message });
  }
});


router.post("/create" , async (req,res)=>
{
  try{
    const data = Category(req.body);
    await data.save().catch((err) => {
      res.send({ success: false });
    });
    res.send({success: true})
  }
  catch(err)
  {
    res.send({success : false , error : err})
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    const data = await Category.findByIdAndRemove(id);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: true, error: err });
  }
});

module.exports = router;
