import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import randomColor from "randomcolor";
import Chart from "chart.js/auto";
import Utils from "../utils";
import LoadingComponent from "../components/loading.component";
const PollResult = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [poll, setPoll] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPoll();
  }, []);
  async function getPoll() {
    const utils = new Utils();
    let loggedIn = await utils.checkLogin();
    if (!loggedIn[0]) {
      navigate("/user/login", {
        state: { prevPath: "/poll/result/" + params.id },
      });
    }
    fetch("/poll/getPoll/" + params.id)
      .then((res) => {
        if (res.status !== 200) {
          alert(
            "The poll is either removed or doesnot exist. Please check your link."
          );
          navigate("/");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setPoll(res);
        setLoading(false);
      });
  }

  if (loading) return <LoadingComponent />;
  return (
    <div>
      <p className="text-5xl font-medium m-4">Poll Result</p>
      <div id="chartHolder">
        {poll.questions.map((q, index) => {
          return (
            <ResultChartComponent key={index} question={q} index={index} />
          );
        })}
      </div>
    </div>
  );
};

const ResultChartComponent = ({ question, index }) => {
  useEffect(() => {
    createChart();
  }, []);
  function createChart() {
    const ctx = document.getElementById("myChart" + index);
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: question.options.map((e) => {
          return e.option;
        }),
        datasets: [
          {
            data: question.options.map((e) => e.votes),
            backgroundColor: question.options.map((e) => randomColor()),
            borderColor: question.options.map((e) => randomColor()),
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Custom Chart Title",
        },
      },
    });
  }
  return (
    <div>
      <p>
        Question {index + 1}. {question.question}
      </p>
      <canvas id={"myChart" + index} className="w-18 h-18 mx-auto"></canvas>
    </div>
  );
};

export default PollResult;
