import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state from "./redux/state";

function App() {
  let initTasksWeb = state.tasksWeb;
  let [tasks, setTasks] = useState(initTasksWeb);

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
