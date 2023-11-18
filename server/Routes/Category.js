const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");
router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  try{

    const data = await Category.find();
    res.send({ success: true, data: data });
  }
  catch(error)
  {
    res.send({success : false , error : error})
  }
});

module.exports = router;
