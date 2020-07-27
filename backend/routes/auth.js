const router = require("express").Router();
const User = require("../models/user.model");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // LETS VALIDATE DATA BEFORE WE ADD A USER
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if the user email already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({ message: "User created", userId: user._id });
    // res.send({ user: user._id });
    //probably redirect to dashboard page
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if the user email already exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password doesn't exist");

  //check password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token); //append send(token) after ).
  res.status(200).json({ token: token, userId: user._id.toString() });

  // res.json({ isLoggedIn: true });
  // console.log(token);
  // res.redirect("/");
  // res.redirect("/");
  // res.redirect("/api/dashboard");
  // return res.redirect("/");
  // res.json({ msg: "LOGGEDIN" });
});

module.exports = router;
