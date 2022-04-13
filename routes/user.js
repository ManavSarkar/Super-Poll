const router = require("express")();
const bcrypt = require("bcrypt");
const User = require("./../models/user_model");
const jwt = require("jsonwebtoken");
const authenticate = require("./../middlewares/authenticate");
const Poll = require("../models/poll_model");

router.post("/signup", async (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username.toLowerCase(),
    password: req.body.password,
  });
  var existingUser = await User.findOne({
    $or: [
      { username: req.body.username.toLowerCase() },
      { email: req.body.email.toLowerCase() },
    ],
  });
  if (existingUser !== null) {
    res.status(401).json({ success: false, message: "User exists" });
  } else
    user.save(function (err, user) {
      if (err)
        res.status(401).json({ success: false, message: "Please try again" });
      else
        res
          .status(200)
          .json({ success: true, message: "Great! Sign up  successful" });
    });
});
router.post("/checkusername", (req, res) => {
  User.findOne(
    { username: req.query.username.toLowerCase() },
    function (err, user) {
      if (user) {
        res.json({ available: false });
      } else {
        res.json({ available: true });
      }
    }
  );
});
router.post("/checkemail", (req, res) => {
  User.findOne({ email: req.query.email.toLowerCase() }, function (err, user) {
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  });
});
// Login route

router.post("/logout", (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE);
  res.status(200).json({ success: true });
});
router.get("/pollsCreated/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user === null) {
      res.status(500).send("Error in server");
    }
    let polls = [];
    for (var p in user.pollsCreated) {
      await Poll.findById(user.pollsCreated[p].poll).then((res) => {
        polls.push(res);
      });
    }
    res.status(200).json(polls);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in server");
  }
});
router.get("/pollsParticipated/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user === null) {
      res.status(500).send("Error in server");
    }
    let polls = [];
    for (var p in user.pollsParticipated) {
      await Poll.findOne({ shortId: user.pollsParticipated[p].poll }).then(
        (res) => {
          polls.push(res);
        }
      );
    }
    res.status(200).json(polls);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in server");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  User.findOne(
    {
      $or: [{ username: email.toLowerCase() }, { email: email.toLowerCase() }],
    },
    async function (err, user) {
      if (user === null) {
        return res.json({ success: false });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.json({ success: false });
        } else {
          var token = await user.generateAuthToken();

          res.cookie(process.env.AUTH_COOKIE, token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true,
          });
          res.json({ success: true });
        }
        // res.redirect("/user/dashboard");
      }
    }
  );

  // res.send("Welcome to our platform, start your elections!");
});
// Dashboard
router.post("/dashboard", authenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;
