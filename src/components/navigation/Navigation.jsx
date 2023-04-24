import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange }) => {
  return (
    <>
      <nav className="navigation">
        <button onClick={() => onRouteChange("signin")}>
          <a href="null">Sign Out</a>
        </button>
      </nav>
    </>
  );
};

export default Navigation;
