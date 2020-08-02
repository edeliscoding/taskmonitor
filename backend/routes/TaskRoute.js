const express = require("express");
const router = require("express").Router();
const taskController = require("./../Controllers/taskController");

router.post("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);
router.delete("/:id/:index", taskController.deleteTaskItem);

router.get("/:id", taskController.getTask);

router.put("/:id", taskController.updateTaskItem);

module.exports = router;
