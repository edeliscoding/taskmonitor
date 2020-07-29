const router = require("express").Router();
const Task = require("../models/task.model");
const verify = require("./verifyToken");
const User = require("../models/user.model");

router.post("/add", async (req, res) => {
  //dataTasks and comment work it prints the following
  //{
  //   tasks: [
  //     { firstName: 'abc', lastName: 'comment 1' },
  //     { firstName: 'def', lastName: 'comment 2' }
  //   ],
  //   comment: 'this is a comment from req.body'
  // }
  // const dataTasks = req.body.tasks;
  // const comment = req.body.comment;
  // // console.log(dataTasks);
  // // console.log(comment);
  // dataTasks.forEach(function(item) {
  //   // console.log(item);
  //   // console.log(item.lastName);
  //   const task = new Task({
  //     tasks: item,
  //     additional: comment
  //   });
  //   console.log(task);
  // });

  // let creator;
  //   const task = new Task({
  //     // additional: req.body.comment.secondary,
  //     additional: req.body.additional,
  //     tasks: req.body.tasks,
  //     creator: req.user
  //   });

  //   try {
  //     const savedTask = await task.save();
  //     res.send(savedTask);
  //     const currentUser = User.findById(req.user);
  //     // creator = currentUser;
  //     currentUser.tasks.push(task);
  //     // const savedUser = await
  //   } catch (err) {
  //     res.status(402).send(err);
  //   }
  // });
  let creator;

  const task = new Task({
    // additional: req.body.comment.secondary,
    additional: req.body.additional,
    tasks: req.body.tasks,
    creator: req.user
  });
  //  creator: req.user
  task
    .save()
    .then(result => {
      return User.findById(req.user);
    })
    .then(user => {
      creator = user;
      user.tasks.push(task);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Post created successfully",
        task: task,
        creator: { _id: creator._id, name: creator.email }
      });
    });
});
module.exports = router;
