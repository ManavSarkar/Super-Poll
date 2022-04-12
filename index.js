const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 5000;
const userRoute = require("./routes/user");
const pollRoute = require("./routes/poll");

require("dotenv").config();
app.use(cors());
const database = require("./database/db-conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

// Page Routes

// Home Route

const path = require("path");

// Step 1:
app.use("/user", userRoute);

app.use("/poll", pollRoute);
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.get("/", (req, res) => {
  res.send("Home");
});
// listening to port

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
