const express = require("express");
const router = require("express").Router();
const taskController = require("./../Controllers/taskController");

router.post("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

router.get("/:id", taskController.getTask);

module.exports = router;
