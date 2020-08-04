import React from "react";
import "styles/Checkbox.css";

export const CheckboxOutlinedEmpty = () => {
  return <div id="Checkbox" className="Checkbox"></div>;
};

export const CheckboxOutlinedFull = () => {
  return (
    <div id="Checkbox" className="Checkbox">
      <div className="active"></div>
    </div>
  );
};
