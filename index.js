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
app.get("/", (req, res) => {
  res.send("Welcome");
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Step 1:
app.use("/user", userRoute);

app.use("/poll", pollRoute);

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
