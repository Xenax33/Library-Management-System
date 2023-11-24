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

router.get("/checkUser/:id" , async (req,res) =>
{
  try {
    const { id } = req.params
    const data = await Category.find({ Name: Name });

    if (data.length > 0) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false, message: "No data found for the given Name." });
    }
  } catch (error) {
    res.send({ success: true, error: error.message });
  }
})

module.exports = router;
