import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state from "./redux/state";

function App() {
  let initTasksWeb = state.tasksWeb;
  let [tasks, setTasks] = useState(initTasksWeb);
  let [filter, setFilter] = useState("all");

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone);
  }

  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => !t.isDone);
  }

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks)
  }

  return (
    <div className="App">
      <TodoList title={state.todoListTitle[0]}
                tasks={tasksForTodoList}
                removeTask={removeTask}/>
      {/*<TodoList title={state.todoListTitle[1]}*/}
      {/*          tasks={state.tasksBuy}*/}
      {/*          removeTask={removeTask}/>*/}
    </div>
  );
}

export default App;
