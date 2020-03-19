import React from "react";

export default ({ onClick }) => {
  return (
    <div className="add-button">
      <button onClick={() => onClick()}>&#x271A;</button>
    </div>
  );
};
