const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const User = require ("../Models/User")
const Product = require("../Models/Product")
// const bcrypt = require('bcrypt');

router.post("/create", async (req, res) => {
  const data = Order(req.body);
  await data.save().catch((err) => {
    console.log(err);
    res.send({ status: false });
  });
  res.send({ message: "Connected" });
});

router.get("/getorders/:_id", async (req, res) => {
  const BuyerId = req.params._id;
  try {
    const data = await Order.aggregate([
      {
        $match: { BuyerId: BuyerId }
      },
      {
        $lookup: {
          from: 'products', // The name of the collection in the database (case-sensitive)
          localField: 'ProductName', // The field in the Order collection to match
          foreignField: 'Name', // The field in the Product collection to match
          as: 'ProductData' // The name of the new field that will contain the joined data
        }
      },
      {
        $unwind: { path: "$ProductData", preserveNullAndEmptyArrays: true } // Unwind the ProductData array
      },
      {
        $project: {
          _id: 1, // Include the Order _id field
          BuyerId: 1, // Include the BuyerId field
          ProductName: 1, // Include the ProductName field
          Price: 1,
          Quantity: 1,
          Total: 1,
          OrderedAt:1,
          Image: "$ProductData.Image" // Access the 'Image' field directly from ProductData
          // You can include additional fields from the Order if needed
        }
      }
    ]);

    res.send({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.send({ success: false });
  }
});


// db.books.find().forEach(
//   function (newBook) {
//       newBook.category = db.categories.findOne( { "_id": newBook.category } );
//       newBook.lendings = db.lendings.find( { "book": newBook._id  } ).toArray();
//       newBook.authors = db.authors.find( { "_id": { $in: newBook.authors }  } ).toArray();
//       db.booksReloaded.insert(newBook);
//   }
// );

router.get("/getcustomers", async (req, res) => {
  try {
    const customers = await User.find({ Role: "customer" }).lean(); // Using .lean() to get plain JavaScript objects instead of Mongoose documents

    // Loop through the customers and fetch their orders asynchronously
    const customerPromises = customers.map(async (customer) => {
      const orders = await Order.find({ BuyerId: customer._id }).lean();
      customer.Orders = orders;
      return customer;
    });

    // Wait for all the promises to resolve
    const customersWithOrders = await Promise.all(customerPromises);

    res.json({ success: true, data: customersWithOrders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching customers" });
  }
});

router.get("/getTodayOrders", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    // Find orders with OrderedAt greater than or equal to today's date
    const data = await Order.find({ OrderedAt: { $gte: today } });

    res.send({ success: true, data: data });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
});


router.get("/getMonthOrders", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    // Find orders with OrderedAt greater than or equal to the beginning of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const data = await Order.find({ OrderedAt: { $gte: startOfMonth } });

    res.send({ success: true, data: data });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
});


module.exports = router;
