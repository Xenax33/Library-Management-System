const express = require("express");
const router = express.Router();
const UserAudit = require("../Models/UserAudit"); // Update the path
router.use(express.json());

router.post("/create", async (req, res) => {
  try {
    const {
      NameBefore,
      NameAfter,
      Email,
      PasswordBefore,
      PasswordAfter,
      CNICBefore,
      CNICAfter,
      PhoneNoBefore,
      PhoneNoAfter,
      ImageBefore,
      ImageAfter,
    } = req.body;

    const data = new UserAudit({
      NameBefore,
      NameAfter,
      Email,
      PasswordBefore,
      PasswordAfter,
      CNICBefore,
      CNICAfter,
      PhoneNoBefore,
      PhoneNoAfter,
      ImageBefore,
      ImageAfter,
    });

    await data.save();
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await UserAudit.find();
    res.send({ succes: true, data: data });
  } catch (err) {
    res.send({ succes: false, error: err });
  }
});
module.exports = router;
