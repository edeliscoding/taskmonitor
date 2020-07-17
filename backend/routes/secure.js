const router = require("express").Router();
const verify = require("./verifyToken"); //middleware

router.get("/", verify, (req, res) => {
  //we have access to user info using req.user because of token
  res.json({
    posts: {
      title: "my first posts",
      descript: "random data you shouldn't access."
    }
  });
  //   res.send(req.user);
});

module.exports = router;
