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
    res.send({ user: user._id });
  } catch (err) {
    console.log(err);
  }
});

// //validation
// const Joi = require("@hapi/joi");

// const schema = Joi.object({
//   email: Joi.string.min(6).required().email,
//   password: Joi.string()
//     .min(6)
//     .required()
// });

// router.post("/register", async (req, res) => {
//   //Let's validate
//   const validation = schema.validate(req.body, schema);
//   res.send(validation);

//   // const user = new User({
//   //   email: req.body.email,
//   //   password: req.body.password
//   // });
//   // try {
//   //   const savedUser = await user.save();
//   //   res.send(savedUser);
//   // } catch (err) {
//   //   res.status(400).send(err);
//   // }
// });

module.exports = router;
