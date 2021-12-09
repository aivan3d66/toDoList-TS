import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state from "./redux/state";

function App() {
  let initTasksWeb = state.tasksWeb;

  let arr = useState(initTasksWeb);
  let tasks = arr[0];
  let setTasks = arr[1];

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks)
  }

  return (
    <div className="App">
      <TodoList title={state.todoListTitle[0]}
                tasks={tasks}
                removeTask={removeTask}/>
      {/*<TodoList title={state.todoListTitle[1]}*/}
      {/*          tasks={state.tasksBuy}*/}
      {/*          removeTask={removeTask}/>*/}
    </div>
  );
}

export default App;
