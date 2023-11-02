const express = require("express");
const router = express.Router();
const UserAudit = require("../Models/UserAudit");

router.post("/create", async (req, res) => {
    const data = User(req.body);
    await data.save().catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
    res.send({ success:true });
  });

module.exports = router;