import React, { useState, useEffect } from "react";
import "./NavBar.css";
import NavBar from "./NavBar";

function LandingPage() {
  const [displayText, setDisplayText] = useState("Welcome to Xenax's Library");

  return (
    <body id="body">
      <div>
        <NavBar/>
      </div>
      <div className="library-text">{displayText}</div>
    </body>
  );
}

export default LandingPage;
