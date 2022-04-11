import React from "react";

const Contact = () => {
  return (
    <div className="mx-4">
      <p className="text-5xl font-medium m-4">Contact</p>
      <div className="text-left px-12 text-lg">
        <ol>
          <li>
            Email:{" "}
            <a className="text-blue-600" href="mailto:manavsarkar07@gmail.com">
              manavsarkar07@gmail.com
            </a>
          </li>
          <li>
            Github:{" "}
            <a className="text-blue-600" href="https://github.com/manavsarkar/">
              https://github.com/manavsarkar
            </a>
          </li>
          <li>
            Project Link:{" "}
            <a
              className="text-blue-600"
              href="https://github.com/ManavSarkar/Super-Poll"
            >
              https://github.com/ManavSarkar/Super-Poll
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Contact;
