import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <>
      <p className="f3 center white">
        put url and I'll detect the face, try it!
      </p>
      <div className="form center pa4 br3 shadow-5">
        <input
          className="f4 pa2 w-70"
          placeholder="paste img url here"
          type="text"
          onChange={onInputChange}
        ></input>
        <button
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          onClick={onButtonSubmit}
        >
          detect
        </button>
      </div>
    </>
  );
}

export default ImageLinkForm;
