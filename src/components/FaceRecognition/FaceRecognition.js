import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ imgUrl, box }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImg" alt="" src={imgUrl} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
