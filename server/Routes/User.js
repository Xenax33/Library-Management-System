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

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: updatedUser });
  } catch (err) {
    res.send({ success: false, error: err });
  }
});

router.put("/editpassword/:id", async (req, res) => {
  const userId = req.params.id;
  const newPassword = req.body.newPassword;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the password field
    user.Password = newPassword;

    // Save the updated user
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params; // Use req.params.id directly, no need to destructure again
  try {
    const data = await User.findById(id);
    if (data) {
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
});


module.exports = router;
