const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//   taskname: { type: String },
//   taskcomment: { type: String },
//   taskadditional: { type: String },
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const taskSchema = new Schema({
//   task: String
// });

// const projectSchema = new Schema({
//   tasks: [taskSchema],
//   additional: String
// });

const TaskSchema = new Schema({
  tasks: [{}],
  additional: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", TaskSchema);
