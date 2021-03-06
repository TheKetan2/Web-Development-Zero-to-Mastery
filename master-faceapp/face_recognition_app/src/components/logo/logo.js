import React from "react";
import Tilt from "react-tilt";
import facereco from "./facereco.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img src={facereco} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
