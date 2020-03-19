import React from "react";

export default ({ todos, deleteTodo, completedToDo, viewToDo }) => {
  const isEmptyArr = todos.length > 0 ? false : true;
  return (
    <div className="todo-list-container">
      <ul>
        {!isEmptyArr &&
          todos.map((todo, index) => (
            <li className="" key={index}>
             {!todo.completed &&  <button className="completed-todo" onClick={() => completedToDo(todo.id)}>&#10004;</button> }
              <div className={`todo-text-container ${todo.completed ? 'margin-left' : ''}`} onClick={() => viewToDo(todo.id)}>
                  <p className={`'font18 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</p>
                  <p className={`font14 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>
              </div>
              <button className="remove-todo" onClick={() => deleteTodo(todo.id)}>&#10006;</button>
            </li>
          ))}
        {isEmptyArr && <li>Add Task</li>}
      </ul>
    </div>
  );
};
