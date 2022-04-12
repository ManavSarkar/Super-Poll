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

app.use("/user", userRoute);

app.use("/poll", pollRoute);
const path = require("path");

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
// Step 1:

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
