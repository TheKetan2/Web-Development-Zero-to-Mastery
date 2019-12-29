import React from "react";
import "./imagelinkform.css";
const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">{"Find the faces in you pictures "}</p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input type="text" className="f4 pa2 w-70 center" />
          <button className="w-40 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
