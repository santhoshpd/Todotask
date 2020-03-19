import React from "react";

export default ({ buttonArray, onClick, btnActive }) => {
  const isArray = Array.isArray(buttonArray);
  return (
    <div className="todo-filters">
      {isArray &&
        buttonArray.map(btn => (
          <button
            onClick={() => onClick(btn)}
            className={`${btnActive === btn ? "btn-active" : ""}`}
            key={btn}
          >
            <span>{btn}</span>
          </button>
        ))}
    </div>
  );
};
