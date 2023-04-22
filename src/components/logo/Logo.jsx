import React from "react";
import Tilt from "react-parallax-tilt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

import "./Logo.css";

const logo = () => {
  return (
    <Tilt className="logo">
      <div className="logo-container">
        <h1>
          <FontAwesomeIcon className="brain" icon={faBrain} />
        </h1>
      </div>
    </Tilt>
  );
};

export default logo;
