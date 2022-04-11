import React, { useState, useEffect } from "react";
import LoadingComponent from "../components/loading.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailShareButton } from "react-share";
import { useNavigate } from "react-router";
import Utils from "../utils";
const Dashboard = () => {
  const utils = new Utils();
  const navigate = useNavigate();
  const [showValue, setshowValue] = useState(0);
  const [participatedPolls, setParticipatedPolls] = useState([]);
  const [createdPoll, setCreatedPoll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  async function showPlayedPolls(val) {
    setshowValue(val);
    setLoading(true);
    if (val == 1) {
      let res = await fetch("/user/pollsParticipated/" + user._id);
      if (res.status != 200) {
        res = res.body;
        console.log(res);
      } else {
        res = await res.json();
        setCreatedPoll(res);
        console.log(res);
      }
    }
    if (val == 2) {
      let res = await fetch("/user/pollsCreated/" + user._id);
      if (res.status != 200) {
        res = res.body;
        console.log(res);
      } else {
        res = await res.json();
        setCreatedPoll(res);
        console.log(res);
      }
    }
    setLoading(false);
  }
  async function init() {
    let loggedIn = await utils.checkLogin();
    setLoading(false);
    if (!loggedIn[0]) {
      navigate("/user/login", { state: { prevPath: "/user/dashboard" } });
    } else {
      setUser(loggedIn[1]);
    }
  }
  useEffect(() => {
    init();
  }, []);
  const PollParticipated = () => {
    return (
      <div>
        <p>Polls Participated</p>
        <table class="table-fixed w-full">
          <thead className="bg-green-100">
            <tr>
              <th className="w-24">Sl. No.</th>
              <th>Title</th>
              <th>Poll Result</th>
              <th>Number of Users played</th>
            </tr>
          </thead>
          <tbody>
            {createdPoll.map((poll, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{poll.title ?? "No title"}</td>
                  <td>
                    <a
                      href={"/poll/result/" + poll.shortId}
                      target="_blank"
                      className="inline-flex mr-4"
                    >
                      http://localhost/poll/result/{poll.shortId}
                    </a>
                  </td>
                  <td>{poll.participated ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const PollCreated = () => {
    return (
      <div>
        <p>Polls Created</p>
        <table class="table-fixed w-full">
          <thead className="bg-green-100">
            <tr>
              <th className="w-24">Sl. No.</th>
              <th>Title</th>
              <th>Poll Link</th>
              <th>Number of Users played</th>
            </tr>
          </thead>
          <tbody>
            {createdPoll.map((poll, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{poll.title ?? "No title"}</td>
                  <td>
                    <a
                      href={"/poll/vote/" + poll.shortId}
                      target="_blank"
                      className="inline-flex mr-4"
                    >
                      http://localhost/poll/vote/{poll.shortId}
                    </a>
                    <div
                      className="inline-flex border-2 border-gray-500 p-1 m-1 rounded-md"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "http://localhost:3000/poll/vote/" + poll.shortId
                        );
                        toast("Copied to Clipboard", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div className="inline-flex border-2 border-gray-500 p-1 m-1 rounded-md">
                      <EmailShareButton
                        url={"http://localhost:3000/poll/vote/" + poll.shortId}
                        subject={poll.title ?? "No Title"}
                        body={"Play my new poll"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </EmailShareButton>
                    </div>
                  </td>
                  <td>{poll.participated ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <p className="text-5xl font-medium m-4">My Dashboard</p>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="md:columns-2 mx-4">
        <div
          onClick={() => showPlayedPolls(1)}
          className={`p-4 mb-2 rounded-md  cursor-pointer ${
            showValue == 1 ? "bg-amber-500" : "bg-amber-400"
          }`}
        >
          Polls Participated
        </div>
        <div
          onClick={() => showPlayedPolls(2)}
          className={`p-4  rounded-md  cursor-pointer ${
            showValue == 2 ? "bg-green-500" : "bg-green-400"
          }`}
        >
          Polls Created
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : showValue == 1 ? (
        <PollParticipated />
      ) : showValue == 2 ? (
        <PollCreated />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Dashboard;
