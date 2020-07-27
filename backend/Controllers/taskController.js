const Task = require("../models/task.model");

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
