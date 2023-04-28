import React from "react";
import "./Rank.css";

const Rank = ({ userName, userEntries }) => {
  return (
    <div className="rank-container">
      <div>
        <h1>{userName}, your current entry count is</h1>
      </div>
      <div>
        <h1>{userEntries}</h1>
      </div>
    </div>
  );
};

export default Rank;
