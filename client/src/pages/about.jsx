import React from "react";

const About = () => {
  return (
    <div className="mx-4">
      <p className="text-5xl font-medium m-4">About</p>
      <p>
        This website aims to allow users from any part of world to create free
        and fair polls. Users have to be account holder in order to vote and
        also a user can vote for only once.
      </p>
      <p className="text-left text-lg font-semibold">Steps to create a poll.</p>
      <ol className="list-none text-left">
        <li>
          Step 1: Click on the <b> Create Poll</b> to create a new poll
        </li>
        <li>
          Step 2: Fill up the questions and options accordingly. There is no
          limit to questions and options.
        </li>
        <li>
          Step 3: After creating the poll, you will be redirected to the{" "}
          <b> Dashboard</b> page from where you can share it with your friends,
          colleagues, etc.
        </li>
      </ol>
    </div>
  );
};

export default About;
