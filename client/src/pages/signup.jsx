import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  var timer = null;
  var emailTimer = null;
  async function signupuser(e) {
    e.preventDefault();
    fetch("/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(res.message);
        if (res.success) {
          setEmail("");
          setName("");
          setPassword("");
          setConfirmPassword("");
          navigate("/user/login", { state: { prevPath: state.prevPath } });
        }
      });
  }

  function onFinishedUsernameTyping() {
    clearTimeout(timer);
    timer = setTimeout(checkUsername, 2000);
  }
  async function checkUsername() {
    if (username !== "")
      fetch("/user/checkusername?username=" + username.toLowerCase(), {
        method: "post",
      })
        .then((res) => res.json())
        .then((r) => {
          setIsValidUsername(r.available);
        });
  }
  function onFinishedEmailTyping() {
    clearTimeout(emailTimer);
    emailTimer = setTimeout(checkemail, 1000);
    console.log("dsads");
  }
  async function checkemail() {
    if (email !== "")
      fetch("/user/checkemail?email=" + email.toLowerCase(), {
        method: "post",
      })
        .then((res) => res.json())
        .then((r) => {
          setIsValidEmail(r.available);
        });
  }

  return (
    <div>
      <div className="m-8 text-left">
        <p className="text-5xl text-center my-8 font-extrabold">Sign Up</p>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <div className="mt-12 max-w-xl mx-auto">
            <form onSubmit={signupuser}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Name
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  name="email"
                  value={email.trim()}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  onKeyDown={() => clearTimeout(emailTimer)}
                  onKeyUp={onFinishedEmailTyping}
                  required
                />
              </div>
              {!isValidEmail ? (
                <div className="mt-4 text-sm font-display font-semibold text-red-700 text-center">
                  Email is already registered. Login or use another email.
                </div>
              ) : (
                <div></div>
              )}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Username
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  type="username"
                  placeholder="Enter a unique username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.trim().toLowerCase())
                  }
                  onKeyDown={() => clearTimeout(timer)}
                  onKeyUp={onFinishedUsernameTyping}
                  required
                />
              </div>

              {!isValidUsername ? (
                <div className="mt-4 text-sm font-display font-semibold text-red-700 text-center">
                  Username is not available, please enter a different username.
                </div>
              ) : (
                <div></div>
              )}
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordMatch(e.target.value === confirmPassword);
                  }}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Confirm Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMatch(password === e.target.value);
                  }}
                  placeholder="Enter your password again"
                />
              </div>
              {!passwordMatch ? (
                <div className="mt-4 text-sm font-display font-semibold text-red-700 text-center">
                  Passwords don't match
                </div>
              ) : (
                <div></div>
              )}

              <div className="mt-10">
                <button
                  className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg "
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account ?{" "}
              <a
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                href="/user/login"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
