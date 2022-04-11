import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
const Home = () => {
  return (
    <div className="bg-white">
      <div className="rounded-md m-3 border-4 border-blue-800 bg-blue-400">
        <p className="text-center text-4xl text-white font-bold drop-shadow-md p-4  mx-auto sm:w-96 w-48 my-4 rounded-md border-2 ">
          Super Pole
        </p>
        <p>Free Online Poll Maker</p>
        <p>Instant Online Results</p>
        <Link to="/poll/newpoll">
          <div className="inline-flex bg-blue-800 m-4 p-4 rounded-md transition hover:bg-blue-900 duration-200 hover:scale-110">
            <PlusIcon className="h-5 w-5 my-auto text-white" />

            <p className="text-lg mx-2 text-white">Make a Poll Now !</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
