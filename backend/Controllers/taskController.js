const Task = require("../models/task.model");

exports.updateTaskItem = async (req, res) => {
  const index = req.params.id;
  const { firstName, lastName, taskIndex, additional } = req.body;
  console.log(taskIndex);

  const foundTask = await Task.findById(index);
  const foundTaskItem = await foundTask.tasks[taskIndex].firstName;
  const foundTaskItemLname = await foundTask.tasks[taskIndex].lastName;
  const foundAdditional = await foundTask.additional;
  //code to type to update
  // Task.update(
  //   { _id: index }, "tasks.taskIndex"
  //   {
  //     $set: {
  //       "tasks.$.firstName": firstName
  //     }
  //   }
  // );
  Task.find();
  Task.findOneAndUpdate(
    {
      _id: index,
      "tasks.firstName": foundTaskItem,
      "tasks.lastName": foundTaskItemLname,
      additional: foundAdditional
    },
    {
      $set: {
        "tasks.$.firstName": firstName,
        "tasks.$.lastName": lastName,
        additional: additional
      }
    },
    { new: true, sort: { _id: -1 } }
  )
    .exec()
    .then(result => {
      res.json({
        data: result,
        message: "successful edit"
      });
    })
    .catch(error => {
      console.log(error);
    });
  // Task.findById(index).then(foundTask => foundTask.update(req.body));

  // Task.findByIdAndUpdate(index, req.body, {
  //   new: true
  // }).then(
  //   function(task) {
  //     res.send(task);
  //   },
  //   function(err) {
  //     res.send(err);
  //   }
  // );
  // Task.update({ _id: index }, { $set: { "tasks.$.firstName": firstName } })
  //   .exec()
  //   .then(result => {});
  // // Task.findOneAndUpdate(
  //   { _id: index },
  //   { $set: { "tasks.$.firstName": firstName } },
  //   { new: true, fields: {"tasks.firstName" :}, sort: { _id: -1 } }
  // )
  //   .exec()
  //   .then(result => {})
  //   .catch(error => {
  //     console.log(error);
  //   });

  // console.log(foundTaskItem);
  // then(item => {
  //   (item.firstName = firstName), (item.lastName = lastName);
  // });
  // foundTask.tasks[index].then(task => {
  //   task.firstName = firstName;
  // });

  // console.log(foundTaskItem);
  // then(task => {
  //   task.firstName = req.body.firstName;
  //   task.lastName = req.body.lastName;

  //   task
  //     .save()
  //     .then(() => res.json("Task Updated"))
  //     .catch(err => res.status(400).json("Error"));
  // });
};

//this works for updating the first tasksArray item only
exports.updateTask = async (req, res) => {
  // const taskId = req.params.id;
  console.log(req.body);
  // console.log(taskId);
  // const firstName = req.body.task_firstName;
  // const lastName = req.body.task_lastName;
  // const additional = req.body.task_additional;

  // const updatedTask =

  let task;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // task = await Task.findById(taskId);
    res.status(201).json({
      status: "success",
      data: {
        task
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
//delete taks works for deleting an entire array including tasksArray
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteTaskItem = async (req, res) => {
  const taskindex = req.params.id;
  const index = req.params.index;
  // console.log(taskindex);
  // console.log(index);
  try {
    const taskfound = await Task.findById(taskindex);
    const taskfounditem = await taskfound.tasks[index];

    // console.log(taskfounditem);

    taskfound.tasks.splice(taskindex, 1);
    taskfound.markModified("tasks");
    await taskfound.save();

    // await Task.update(
    //   { _id: ObjectId(taskindex) },
    //   { $pull: { tasks:  index } }
    // );

    // console.log(taskfound);
    // console.log(taskindex); // ._id
    // await Task.findByIdAndUpdate(taskindex, {
    //   $pull: {
    //     tasks: { _id: index }
    //   }
    // });

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { task }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
