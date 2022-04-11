const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pollsCreated: [
    {
      poll: {
        type: String,
      },
      shortId: {
        type: String,
      },
    },
  ],
  pollsParticipated: [
    {
      poll: {
        type: String,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
user.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
user.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    return token;
  } catch (error) {}
};
const User = mongoose.model("USER", user);

module.exports = User;
