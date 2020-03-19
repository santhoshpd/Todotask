import React from "react";

export default props => {
  return (
    <div className={`${props.isVisible ? 'modal' : 'modal-closed'}`}>
      <div className="modal-container">{props.children}</div>
    </div>
  );
};
