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
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// Page Routes

// Home Route

app.use("/user", userRoute);

app.use("/poll", pollRoute);

// listening to port
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
