import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Utils from "../utils";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const utils = new Utils();

  const checkAuth = async () => {
    let l = await utils.checkLogin();
    setLoggedIn(l[0]);
  };

  useEffect(() => {
    checkAuth();
  }, []);
  var itemStyle =
    "transition text-white font-semibold text-xl hover:bg-blue-700 hover:scale-110 ease-in-out delay-100 duration-100 px-3 md:m-2  rounded-md";
  const logoutUser = async () => {
    await fetch("/user/logout", { method: "post" });
    checkAuth();
    navigate("/", function () {
      window.location.reload();
    });
  };
  return (
    <div className=" bg-blue-600">
      <ul className="list-none md:inline-flex">
        <Link to="/">
          <li className="text-white font-semibold text-xl  md:m-2  rounded-md left-0 md:absolute">
            Super Poll
          </li>
        </Link>
        <Link to="/">
          <li className={itemStyle}>Home</li>
        </Link>
        <Link to="/poll/newpoll">
          <li className={itemStyle}>Create Poll</li>
        </Link>
        <Link to="/user/dashboard">
          <li className={itemStyle}>Dashboard</li>
        </Link>
        <Link to="/about">
          <li className={itemStyle}>About</li>
        </Link>
        <Link to="/contact">
          <li className={itemStyle}>Contact</li>
        </Link>
        {!loggedIn ? (
          <div
            className="link"
            onClick={() => {
              navigate("/user/login", {
                state: { prevPath: "/" },
              });
            }}
          >
            <li className="text-white font-semibold text-xl hover:bg-blue-700 px-3 md:m-2  rounded-md right-0 md:absolute cursor-pointer">
              Login
            </li>
          </div>
        ) : (
          <div className="link" onClick={logoutUser}>
            <li className="text-white font-semibold text-xl hover:bg-blue-700 px-3 md:m-2  rounded-md right-0 md:absolute cursor-pointer">
              Logout
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
/*
Home
Create Poll
Dashboard
About
Contact
*/
