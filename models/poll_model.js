const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const poll = new mongoose.Schema({
  participated: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
  },
  shortId: {
    type: String,
    default: nanoid(10),
  },
  voterType: {
    type: Number,
    /*
    0 - anyone can vote
    1 - unique ip addresses only
    2 - with accounts
    */
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  visibility: {
    type: Number,
    /*
      0 - Public
      1 - Private
      */
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      index: {
        type: Number,
      },
      options: [
        {
          option: {
            type: String,
          },
          index: {
            type: Number,
            default: 0,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
});
poll.pre("save", function (next) {
  if (this.isModified("questions")) {
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      question.index = i;
      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];
        option.index = j;
      }
    }
  }
  next();
});
const Poll = mongoose.model("POLL", poll);

module.exports = Poll;
