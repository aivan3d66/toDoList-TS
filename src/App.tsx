import React from 'react';
import './App.css';
import TodoList from "./components/ToDoList";

export type TaskType = {
  title?: string
  isDone?: boolean
  id?: number
}

// CRUD
function App() {
  // BLL
  const todoListTitle_1: string = "What to do";
  const todoListTitle_2: string = "What to buy";
  const tasks_1: Array<TaskType> = [
    {id: 1, title: "HTML", isDone: false},
    {id: 2, title: "CSS", isDone: false},
    {id: 3, title: "JS/TS", isDone: true},
  ];

  const tasks_2: Array<TaskType> = [
    {id: 4, title: "Potato", isDone: false},
    {id: 5, title: "Beer", isDone: true},
    {id: 6, title: "Fish", isDone: true},
  ];


  // UI
  return (
    <div className="App">
      <TodoList title={todoListTitle_1} tasks={tasks_1}/>
      <TodoList title={todoListTitle_2} tasks={tasks_2}/>
    </div>
  );
}

export default App;
