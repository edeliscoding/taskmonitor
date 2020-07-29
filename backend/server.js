const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");
const updateTaskRoute = require("./routes/TaskRoute");
const deleteTaskRoute = require("./routes/TaskRoute");
const getTaskRoute = require("./routes/TaskRoute");

const secureRoute = require("./routes/secure");
const dashboardRoute = require("./routes/dashboard");
const port = process.env.PORT || 3001;

// //import routes

app.use(cors());
app.use(express.json());

//DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfuly");
});

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/task", taskRoute);
app.use("/api/secure", secureRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/task", updateTaskRoute);
app.use("/api/task", deleteTaskRoute);
app.use("/api/task", getTaskRoute);

app.listen(port, () => console.log(`server up and running on port: ${port}`));
