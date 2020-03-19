import React from "react";

export default ({
  title,
  description,
  add,
  reset,
  cancel,
  onTitleChange,
  OnDescChange
}) => {
  return (
    <>
      <h3>Add New Todo</h3>
      <input
        type="text"
        placeholder="title"
        className="input"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        maxLength="40"
      />
      <textarea
        type="text"
        placeholder="description"
        value={description}
        className="input"
        rows="5"
        onChange={e => OnDescChange(e.target.value)}
        maxLength="250"
      />
      <div className="modal-action-btn-container">
        <button
          className="modal-action-button"
          onClick={() => add()}
          disabled={!title}
        >
          Add
        </button>
        <button className="modal-action-button" onClick={() => reset()}>
          Reset
        </button>
        <button className="modal-action-button" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </>
  );
};
