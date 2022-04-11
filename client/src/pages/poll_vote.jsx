import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Utils from "../utils";
import LoadingComponent from "../components/loading.component";
const PollVote = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [poll, setPoll] = useState();
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    getPoll();
  }, []);
  async function getPoll() {
    const utils = new Utils();
    let loggedIn = await utils.checkLogin();
    if (!loggedIn[0]) {
      navigate("/user/login", {
        state: { prevPath: "/poll/vote/" + params.id },
      });
    } else {
      setUser(loggedIn[1]);

      let res = await fetch("/poll/getPoll/" + params.id);

      if (res.status !== 200) {
        alert(
          "The poll is either removed or doesnot exist. Please check your link."
        );
        navigate("/");
      } else {
        res = await res.json();
        setPoll(res);
        //check if user already voted
        let user = loggedIn[1];
        for (let index = 0; index < user.pollsParticipated.length; index++) {
          const element = user.pollsParticipated[index];
          console.log(element);
          if (element.poll === params.id) {
            alert("You have already voted! Redirecting to Results Page.");
            navigate("/poll/result/" + params.id);
          }
        }

        let q = [];
        for (let i = 0; i < res.questions.length; i++) {
          q.push({
            questionIndex: i,
            optionAnswerIndex: -1,
          });
        }

        setAnswers(q);
      }
      setLoading(false);
    }
  }

  function setAnswer(index, oIndex) {
    let values = [...answers];
    values[index].optionAnswerIndex = oIndex;
    setAnswers(values);
  }
  function submitAnswers() {
    var allAnswered = true;
    for (var ans in answers) {
      if (answers[ans].optionAnswerIndex === -1) {
        allAnswered = false;
      }
    }
    if (!allAnswered) {
      alert("All questions not anwered.");
    } else {
      console.log(
        JSON.stringify({
          answers: answers,
        })
      );
      fetch("/poll/vote/" + params.id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: answers,
          userId: user._id,
        }),
      }).then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          toast("Voted Successfully", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/poll/result/" + params.id);
          }, 2000);
        } else {
          toast("Could not cast your vote! Please try again", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }
      });
    }
  }
  if (loading) return <LoadingComponent />;
  return (
    <div>
      <ToastContainer />
      <p className="text-5xl font-medium m-4">Poll Vote</p>
      <p className="text-4xl bg-blue-300 w-fit mx-auto p-4 rounded-md m-4">
        {poll.title}
      </p>
      <div id="questions">
        {poll.questions.map((question, index) => (
          <div key={index} className="m-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                htmlFor="question"
              >
                Question {index + 1}{" "}
              </label>
            </div>

            <p className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {question.question}
            </p>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="mx-4 my-2">
                <div className="flex justify-between ">
                  <div className="m-4">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300 "
                      htmlFor="option"
                    >
                      Option {oIndex + 1}
                    </label>
                  </div>
                </div>
                <p
                  onClick={() => setAnswer(index, oIndex)}
                  className={`${
                    answers[index].optionAnswerIndex === oIndex
                      ? "bg-green-300"
                      : "bg-gray-100"
                  }
                        "border-gray-300 border-2 text-gray-900 text-md rounded-lg  block w-full p-2.5 hover:cursor-pointer"`}
                >
                  {option.option}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={submitAnswers}
        className="bg-blue-500 p-4 text-white text-lg font-bold font-mono rounded-md hover:shadow-md"
      >
        Submit
      </button>
    </div>
  );
};

export default PollVote;
