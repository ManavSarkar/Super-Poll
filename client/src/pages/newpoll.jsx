import React, { useEffect, useState } from "react";
import Utils from "../utils";
import { useNavigate } from "react-router";
import LoadingComponent from "../components/loading.component";

const NewPoll = () => {
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [title, setTitle] = useState("");
  const today = new Date();
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        {
          option: "",
        },
        {
          option: "",
        },
      ],
    },
  ]);
  const init = async () => {
    let utils = new Utils();
    let loggedIn = await utils.checkLogin();
    setLoading(false);
    if (!loggedIn[0]) {
      navigate("/user/login", { state: { prevPath: "/poll/newpoll" } });
    } else {
      console.log(loggedIn);
      setUser(loggedIn[1]);
    }
  };

  useEffect(() => {
    init();
  }, []);
  function handleQuestionChangeEvent(e, index) {
    const values = [...questions];
    values[index][e.target.name] = e.target.value;
    setQuestions(values);
  }
  function handleOptionChangeEvent(e, qIndex, oIndex) {
    const values = [...questions];
    values[qIndex]["options"][oIndex]["option"] = e.target.value;
    setQuestions(values);
  }
  function addOption(qIndex) {
    const values = [...questions];
    values[qIndex]["options"].push({
      option: "",
    });
    setQuestions(values);
  }
  function removeOption(qIndex, oIndex) {
    const values = [...questions];
    let nvalues = values[qIndex]["options"].filter(
      (e, index) => index !== oIndex
    );
    values[qIndex]["options"] = nvalues;
    setQuestions(values);
  }
  function removeQuestion(qIndex) {
    let values = [...questions];
    values = values.filter((e, index) => index !== qIndex);
    setQuestions(values);
  }
  function addQuestion() {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [
          {
            option: "",
          },
          {
            option: "",
          },
        ],
      },
    ]);
  }
  async function createPoll(e) {
    e.preventDefault();

    let res = await fetch("/poll/newpoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions: questions,
        userId: user._id,
        title: title,
      }),
    });
    if (res.status !== 200) {
      alert(
        "Please try again! We couldnt save the poll.\nSorry for inconvenience."
      );
    } else {
      res = await res.json();

      alert(
        `Hooray! Your poll link is as follows\nhttp://localhost:3000/poll/vote/${res._id}`
      );
      navigate("/user/dashboard");
    }
  }
  if (loading) return <LoadingComponent />;

  return (
    <div>
      <p className="text-5xl font-medium m-4">Create a new poll</p>

      <form onSubmit={createPoll}>
        <div>
          <label htmlFor="title" className="text-left text-xl">
            Poll Title
          </label>
          <div className="mx-2">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="title"
              type="text"
              placeholder="Enter the title of poll"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        {/* <div className="m-4 flex justify-evenly">
          <label htmlFor="startDate">Start Date</label>
          <input
            min={today.toISOString().split("T")[0]}
            onChange={(e) => {
              setStartDate(new Date(e.target.value));
            }}
            type="date"
            name="startDate"
          />
          <label htmlFor="startDate">End Date</label>
          <input
            min={today.toISOString().split("T")[0]}
            onChange={(e) => {
              setEndDate(new Date(e.target.value));
            }}
            type="date"
            name="startDate"
          />
        </div> */}
        <div id="questions">
          {questions.map((question, index) => (
            <div key={index} className="m-4">
              <div className="flex justify-between">
                <div className="inline-block bg-green my-auto">
                  <label
                    className=" mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="question"
                  >
                    Question {index + 1}{" "}
                  </label>
                </div>
                <div className="inline-block mb-4">
                  {questions.length > 1 ? (
                    <div
                      className="bg-red-500 rounded p-2 inline-block"
                      onClick={() => removeQuestion(index)}
                    >
                      Delete
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <input
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="question"
                placeholder="Enter your question"
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChangeEvent(e, index)}
                required
              />
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="mx-4 my-2">
                  <div className="flex justify-between ">
                    <div className="m-4">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300 "
                        htmlFor="option"
                      >
                        {question.options.length > 2 ? (
                          <div
                            onClick={() => {
                              console.log(oIndex);
                              removeOption(index, oIndex);
                            }}
                            className="bg-red-400 text-white rounded p-2 mr-4 inline-block "
                          >
                            Delete
                          </div>
                        ) : (
                          <div></div>
                        )}
                        Option {oIndex + 1}
                      </label>
                    </div>
                    <div className="m-4 inline-block"></div>
                  </div>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="option"
                    type="text"
                    placeholder="Enter option"
                    value={option.option}
                    onChange={(e) => handleOptionChangeEvent(e, index, oIndex)}
                    required
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(index)}
                type="button"
                className=" bg-blue-600 rounded-lg p-2 text-white font-serif text-md mt-6"
              >
                Add a new option
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          type="button"
          className=" bg-blue-600 rounded-lg p-4 text-white font-medium text-lg mt-12"
        >
          Add a new question
        </button>
        <br />
        <button
          type="submit"
          className=" bg-blue-600 rounded-lg p-4 text-white font-medium text-lg my-8 "
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};
const OptionBar = () => {
  return <div></div>;
};
export default NewPoll;
