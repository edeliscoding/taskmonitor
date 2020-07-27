const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/user.model");
const Task = require("../models/task.model");

router.get("/", async (req, res) => {
  try {
    // const task = await Task.find({ creator: req.user });
    const task = await Task.find();
    res.json(task);
    // console.log(task);
  } catch (err) {
    console.log(err);
  }
  // Task.find({ creator: req.user }).then(tasks => res.json({ tasks: tasks }));
  // console.log(tasks);
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjEwY2JlMDFlMjgxYTA0MWNiYmZlNzciLCJpYXQiOjE1OTUzODcwNDV9.aNCkBvhvkw-Cnjuf0f8WujAD4aEm5m_E2pgheCqiILw
module.exports = router;
