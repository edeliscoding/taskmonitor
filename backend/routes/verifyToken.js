//require jwt
//require this function as middleware for every route you want protected
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access is denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //req.user = verified is the id from the website jwt.io from calling jwt.verify() and it's the payload data below:
    // _id: "5f10cbe01e281a041cbbfe77" which is the username id of the currently logged on user.
    // iat: "158282"
    // now that we have _id, we can use it to query database because this is the user!
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

//req.user = verified;
//find user info based on token
// user.findbyOne({_id:req.user})
