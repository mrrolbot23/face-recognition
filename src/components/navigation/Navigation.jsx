import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="navigation">
        <button onClick={() => onRouteChange("signout")}>
          <p>Sign Out</p>
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="navigation">
        <button onClick={() => onRouteChange("signin")}>
          <p>Sign In</p>
        </button>
        <button onClick={() => onRouteChange("register")}>
          <p>Register</p>
        </button>
      </nav>
    );
  }
};

export default Navigation;
