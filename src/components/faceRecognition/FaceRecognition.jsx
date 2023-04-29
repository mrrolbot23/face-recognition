import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="container">
      <div className="image-container">
        <img id="input-image" src={imageUrl} alt="" />
        {box.map((face, i) => {
          return (
            <div
              className="bounding-box"
              key={[i]}
              style={{
                top: box[i].topRow,
                right: box[i].rightCol,
                bottom: box[i].bottomRow,
                left: box[i].leftCol,
              }}
            ></div>
          );
        })}
      </div>
      <h2>{box.length} Faces detected</h2>
    </div>
  );
};

export default FaceRecognition;
