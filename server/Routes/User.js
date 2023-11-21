const express = require("express");
const router = express.Router();
const User = require("../Models/User");
router.use(express.json());
// router.use(cors());
// //API to get all the customers
// router.get("/getcustomers", async (req, res) => {
//   try {
//     const customers = await User.find({ Role: "customer" });
//     res.json({ success: true, data: customers });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error while fetching customers" });
//   }
// });

// //API for the search customers by email text box
// router.get("/getcustomers", async (req, res) => {
//   const Email = req.params.email;
//   try {
//     const customers = await User.find({ email: Email });
//     res.json({ success: true, data: customers });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error while fetching customers" });
//   }
// });

router.get("/getMembers", async (req, res) => {
  const data = await User.find({ isAdmin: false , Active: true });
  res.send({ success: true, data: data });
});

//Create Data API
router.post("/create", async (req, res) => {
  const data = User(req.body);
  await data.save().catch((err) => {
    console.log(err);
    res.send({ success: false });
  });
  res.send({ success: true });
});

//Login API
router.get("/logIn/:email/:password", async (req, res) => {
  const Email = req.params.email;
  const Password = req.params.password;
  try {
    const data = await User.findOne({ Email, Password });
    if (data) {
      res.send({ success: true, data });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndUpdate(id, { Active: false }, { new: true });
    res.send({ success: true, data });
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
});


module.exports = router;
