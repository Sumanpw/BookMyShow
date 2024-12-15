import React from "react";
import "../Css/RadioComponent.css";


const RadioComponent = ({ text, changeSelection, data }) => {
  return (
    <div
      className={`form-check-label ${data === text ? "active" : "inactive"}`}
      onClick={() => changeSelection(text)} 
    >
      <span className="text">{text}</span>
    </div>
  );
};

export default RadioComponent;
