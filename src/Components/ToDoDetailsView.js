import React from "react";

export default ({ cancel, detailsToView }) => {
  const isArray = Array.isArray(detailsToView);
  return (
    <>
      {isArray &&
        detailsToView.map(view => (
          <>
            <h4 key={view.id}>{view.title}</h4>
            <p key={view.id}>{view.description}</p>
          </>
        ))}
      <div className="modal-action-btn-container">
        <button className="modal-action-button" onClick={() => cancel()}>
          Okay
        </button>
      </div>
    </>
  );
};
