import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Spin() {
  return (
    <div className="hero" style={{background: "none"}}>
      <Spinner animation="border" />
    </div>
  );
}

export default Spin;
