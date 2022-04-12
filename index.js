const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 5000;
const userRoute = require("./routes/user");
const pollRoute = require("./routes/poll");

require("dotenv").config();
const database = require("./database/db-conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// Page Routes

// Home Route

app.use("/user", userRoute);

app.use("/poll", pollRoute);

const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// listening to port

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
