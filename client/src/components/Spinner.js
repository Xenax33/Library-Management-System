import React from "react";
import "./Spinner.css";

function Spinner(props) {
  return (
    <div>
      <div
        className="fullscreen-loader"
        style={{
          color: props.dark ? "#fff" : "#1707c4",
          backgroundColor: props.dark
            ? "rgba(58, 59, 60, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
