import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="form-container">
      <h2>{"This Magic Brain will detect faces in pitures. Give it a try."}</h2>
      <div className="input-container">
        <input type="text" onChange={onInputChange} />
        <button onClick={onSubmit}>Detect</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
