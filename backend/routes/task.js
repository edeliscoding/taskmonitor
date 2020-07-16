const router = require("express").Router();
const Task = require("../models/task.model");

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

  const task = new Task({
    additional: req.body.comment.secondary,
    tasks: req.body.tasks
  });

  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err) {
    res.status(402).send(err);
  }

  // const task = new Task({
  //   taskname: req.body.myArray.firstName,
  //   taskcomment: req.body.myArray.lastName,
  //   taskadditional: req.body.myObject.additional
  // });
  // try {
  //   const savedTask = await task.save();
  //   res.send(savedTask);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

module.exports = router;
