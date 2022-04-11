import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function login(e) {
    e.preventDefault();
    fetch("/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.success) {
          setEmail("");
          setPassword("");

          navigate(state.prevPath, { replace: true });
          window.location.reload();
        } else {
          alert("Wrong user credentials");
        }
      });
  }

  return (
    <div className="m-8 text-left">
      <p className="text-5xl text-center my-8 font-extrabold">Log In!</p>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <div className="mt-12 max-w-xl mx-auto">
          <form onSubmit={login}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              />
            </div>
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
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mt-10">
              <button
                className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg "
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?{" "}
            <div
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => {
                navigate("/user/signup", {
                  state: { prevPath: state.prevPath },
                });
              }}
            >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
