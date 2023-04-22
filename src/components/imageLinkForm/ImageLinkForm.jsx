import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div className="form-container">
      <p className="title">
        {"This Magic Brain will detect faces in pitures. Give it a try."}
      </p>
      <div className="input-container">
        <input type="text" />
        <button>Detect</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
