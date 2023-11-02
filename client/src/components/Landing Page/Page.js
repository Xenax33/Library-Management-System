import React from "react";
import "./Page.css";
import { Link } from "react-router-dom";

function Page() {
  return (
    <>
      <div
        className="hero"
      >
        <nav>
          <div className="d-flex">
            {" "}
            {/* Added a parent container with the flex row class */}
            <img className="logo" src="Logo.png" alt="Logo" />
            <h1 className="hover heading">Xenax Library</h1>
          </div>
          <ul>
            <li>
              <Link to="/signin">
                <button className="button1">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="button2 mx-3">Sign Up</button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="about-us">
          <div className="centered-text">
            <h2 className="heading1">-ABOUT ME-</h2>
          </div>
          <div className="left-text">
            <div className="col-md-4">
              <p>
                This project is made by Khawaja Saad Akbar (2021-CS-172) for
                Software Engineering Lab. After many sleepless nights, I was
                able to complete this :). I hope you love it.
              </p>{" "}
            </div>
            {/* Add your additional text here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
