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
