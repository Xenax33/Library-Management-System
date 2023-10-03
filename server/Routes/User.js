const express = require("express");
const router = express.Router();
const User = require("../Models/User");

//API to get all the customers
router.get("/getcustomers", async (req, res) => {
  try {
    const customers = await User.find({ Role: "customer" });
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching customers" });
  }
});

//API for the search customers by email text box
router.get("/getcustomers", async (req, res) => {
  const Email = req.params.email;
  try {
    const customers = await User.find({ email: Email });
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching customers" });
  }
});

//Create Data API
router.post("/create", async (req, res) => {
  const data = User(req.body);
  await data.save().catch((err) => {
    console.log(err);
    res.send({ success: false });
  });
  res.send({ success:true });
});

//Login API
router.get("/logIn/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  try {
    const data = await User.findOne({ email, password });
    if (data) {
      res.send({ success: true, data });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error finding user");
  }
});
module.exports = router;
