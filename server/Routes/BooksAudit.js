const express = require("express");
const router = express.Router();
const BookAudit = require("../Models/BooksAudit");
router.use(express.json());

router.post("/create" , async (req,res)=>
{
    try{
        const data = BookAudit(req.body);
        await data.save().catch((err) => {
          console.log(err);
          res.send({ success: false });
        });
        res.send({ success:true });
    }
    catch(err)
    {
        res.send({success : false})
    }
})

router.get("/get" , async (req,res)=>
{
    try
    {
        const data =await BookAudit.find();
        res.send({success: true , data: data})
    }
    catch(err)
    {
        res.send({success : false , error: err})
    }
})

module.exports = router;