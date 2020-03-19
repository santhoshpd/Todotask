import React, { Component } from "react";
import "./App.css";
import ModalView from "./Components/ModalView";
import Modal from "./Components/Modal";
import Add from "./Components/Add";
import TodoList from "./Components/TodoList";
import TodoFil from "./Components/TodoFil";
import SearchBox from "./Components/SearchBox";
import ToDoDetailsView from "./Components/ToDoDetailsView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      title: "",
      description: "",
      allTodos: JSON.parse(localStorage.getItem("todos")) || [],
      showTodoType: "all",
      todoTypes: ["all", "pending", "completed"],
      searchTerm: "",
      showDetailsModal: false,
      showDetailsOf: ""
    };
  }

  onTitleChange = title => {
    this.setState({ title });
  };

  onDescChange = description => {
    this.setState({ description });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  resetData = () => {
    this.setState({ title: "", description: "" });
  };

  completedToDo = id => {
    const { allTodos } = this.state;
    const todoIndex = this.state.allTodos.findIndex(todo => todo.id === id);
    allTodos[todoIndex].completed = true;
    this.updateTodo(allTodos);
    this.updateLocalStorage(allTodos);
  };

  addTodo = () => {
    let todosList = [];
    let todoItem = {};
    const { title, description } = this.state;
    if (!title) return;
    //getting previous stored localstorage
    const previousList = JSON.parse(localStorage.getItem("todos"));
    if (previousList !== "" && Array.isArray(previousList)) {
      todosList = [...previousList];
    }
    //generating id based on milliseconds
    const d = new Date();
    const id = d.valueOf();
    todoItem = { id: id, title, description, completed: false };
    todosList.push(todoItem);
    //setting up local storage
    this.updateLocalStorage(todosList);
    //updating state
    this.updateTodo(todosList);
    //clearing state and hiding modal
    this.toggleModal();
    this.resetData();
  };

  updateTodo = allTodos => {
    this.setState({ allTodos });
  };

  updateLocalStorage = todoList => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  };

  deleteTodo = id => {
    const newList = this.state.allTodos.filter(todos => todos.id !== id);
    //setting up new list after filtering out
    this.updateLocalStorage(newList);
    this.updateTodo(newList);
  };

  todosToShow = type => {
    this.setState({ showTodoType: type });
  };

  fiilerTodosToShow = type => {
    const { allTodos } = this.state;
    switch (type) {
      case "completed":
        return allTodos.filter(todo => todo.completed === true);
      case "pending":
        return allTodos.filter(todo => todo.completed === false);
      default:
        return allTodos;
    }
  };

  searchTodo = e => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  };

  filterWithSearchTerm = (searchTerm, todoList) => {
    const pattern = new RegExp(`^.*${searchTerm}.*$`);
    // eslint-disable-next-line
    return todoList.filter(item => {
      if (pattern.test(item.title) || pattern.test(item.description)) {
          return item;
      }
    });
  };

  todoToView = id => {
    const { allTodos } = this.state;
    const detailsToShow = allTodos.filter(todo => todo.id === id);
    this.setState({
      showDetailsModal: !this.state.showDetailsModal,
      showDetailsOf: detailsToShow
    });
  };

  render() {
    const {
      isModalOpen,
      title,
      description,
      showTodoType,
      todoTypes,
      searchTerm,
      showDetailsModal,
      showDetailsOf
    } = this.state;

    const listOfTodos = this.filterWithSearchTerm(
      searchTerm,
      this.fiilerTodosToShow(showTodoType)
    );

    return (
      <>
      <div><h1>TODOLIST</h1></div>
        <div className="todo-wrapper">
          <TodoFil
            buttonArray={todoTypes}
            onClick={this.todosToShow}
            btnActive={showTodoType}
          />
          {listOfTodos.length > 1 || searchTerm !== "" ? (
            <SearchBox onChange={this.searchTodo} />
          ) : null}
          <TodoList
            todos={listOfTodos}
            deleteTodo={this.deleteTodo}
            completedToDo={this.completedToDo}
            viewToDo={this.todoToView}
          />
          {!isModalOpen && !showDetailsModal && (
            <Add onClick={this.toggleModal} />
          )}
          <ModalView isVisible={isModalOpen}>
            <Modal
              title={title}
              description={description}
              onTitleChange={this.onTitleChange}
              OnDescChange={this.onDescChange}
              add={this.addTodo}
              reset={this.resetData}
              cancel={this.toggleModal}
            />
          </ModalView>
          <ModalView isVisible={showDetailsModal}>
            <ToDoDetailsView
              detailsToView={showDetailsOf}
              cancel={() =>
                this.setState({
                  showDetailsModal: !this.state.showDetailsModal
                })
              }
            />
          </ModalView>
        </div>
      </>
    );
  }
}

export default App;
