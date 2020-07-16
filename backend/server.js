const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

const port = process.env.PORT || 3001;

// //import routes

app.use(cors());
app.use(express.json());

//DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database conenction established successfuly");
});

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/task", taskRoute);

app.listen(port, () => console.log(`server up and running on port: ${port}`));
