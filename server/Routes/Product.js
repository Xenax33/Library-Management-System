const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");
const Category = require("../Models/Category");

router.use(express.json());

router.get("/getProducts",async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while fetching products" });
      }
});

//API TO GET ALL CATEGORIES
router.get("/getCategories",async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while fetching Categories" });
      }
});

//API TO GET CATEGORIES FROM ID
router.get("/getCategory/:_id",async (req, res) => {
  const _id = req.params._id
    try {
        const categories = await Category.findOne({_id});
        res.json({ success: true, data: categories });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while fetching Category" });
      }
});
// //API TO GET THE MOST RECENTLY ADDED DATA
// router.get("/getCategories",async (req, res) => {
//     try {
//       const sortedData = Product.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       res.json({success : true , data : sortedData[0]})
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error while fetching customers" });
//       }
// });

router.post("/create", async (req, res) => {
  const data = Product(req.body);
  await data.save().catch((err) => {
    console.log(err);
    res.send({ status: false });
  });
  res.send({ message: "Connected" });
});

router.put("/updateafterorder" , async (req,res)=>
{
  const {Name,...rest} = req.body;
  const data = await Product.updateOne({Name : req.body.Name} , rest);
  if (!data) {
    return res.status(404).json({ succes: false });
  }
  else{
    return res.status(200).json({success : true});
  }
})

//Delete API

router.delete("/delete/:id",async(req,res)=>
{
    const data = await Product.deleteOne({_id: req.params.id});
    res.send(data)
});

module.exports = router;