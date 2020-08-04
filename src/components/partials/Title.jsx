import React from "react";

const Title = ({ id, children }) => {
  return (
    <div id={id} className="title">
      <h1>{children}</h1>
    </div>
  );
};

export default Title;
