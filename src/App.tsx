import React from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state from "./redux/state";

function App() {
  return (
    <div className="App">
      <TodoList title={state.todoListTitle[0]} tasks={state.tasksWeb}/>
      <TodoList title={state.todoListTitle[1]} tasks={state.tasksBuy}/>
    </div>
  );
}

export default App;
