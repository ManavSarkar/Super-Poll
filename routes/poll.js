const router = require("express")();
const Poll = require("./../models/poll_model");
const User = require("./../models/user_model");

// router.get("/public", async (req, res) => {
//   var polls = await Poll.find({ visibility: 0 }).limit(10);
//   var p = "";
//   polls.forEach((e) => (p += JSON.stringify(e)));

//   res.send(JSON.stringify(polls));
// });
router.post("/newpoll", (req, res) => {
  var poll = new Poll({
    questions: req.body.questions,
    userId: req.body.userId,
    title: req.body.title,
  });
  console.log(poll);
  poll.save(function (err, poll) {
    if (err) res.status(500).send(err);
    else {
      User.findByIdAndUpdate(poll.userId, {
        $push: { pollsCreated: { poll: poll._id, shortId: poll.shortId } },
      }).then((e) => {
        console.log("Poll added to account");
      });
      res.status(200).send(poll);
    }
  });
});

router.post("/getPoll/:id", async (req, res) => {
  var poll = await Poll.findOne({ shortId: req.params.id });

  res.status(poll === null ? 500 : 200).send(poll);
});
router.post("/vote/:id", async (req, res) => {
  var poll = await Poll.findOne({ shortId: req.params.id });
  var answers = req.body.answers;
  console.log(answers);
  for (var q in answers) {
    poll.questions[answers[q].questionIndex].options[
      answers[q].optionAnswerIndex
    ].votes =
      poll.questions[answers[q].questionIndex].options[
        answers[q].optionAnswerIndex
      ].votes + 1;
  }
  poll.participated = poll.participated + 1;

  Poll.findByIdAndUpdate(poll.id, {
    questions: poll.questions,
    participated: poll.participated,
  })
    .then((poll) => {
      console.log("success");
      User.findByIdAndUpdate(req.body.userId, {
        $push: {
          pollsParticipated: { poll: req.params.id },
        },
      }).then((r) => {
        console.log("User voted successfully with id", req.body.userId);
      });
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ success: false });
    });
});
router.delete("/delete/:id", async (req, res) => {
  Poll.findByIdAndDelete(req.params.id)
    .then((v) => res.send("Successful"))
    .catch((e) => res.send(e));
});

module.exports = router;
