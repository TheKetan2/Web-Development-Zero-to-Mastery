import React from "react";

const FaceRecognition = ({ imgUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 bg-red">
        <img style={{ width: "70%" }} alt="" src={imgUrl} />
      </div>
    </div>
  );
};

export default FaceRecognition;
