import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state, {TaskType} from "./redux/state";

export type FilterValueType = "all" | "completed" | "active";

function App() {
  let initTasks: Array<TaskType> = state.tasks;
  let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
  let [filter, setFilter] = useState<FilterValueType>("all");

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  function getTasksForTodoList() {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.isDone);

      case "active":
        return tasks.filter(t => !t.isDone);

      default:
        return tasks;
    }
  }

  function removeTask(id: number) {
    let filteredTasks: Array<TaskType> = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks)
  }

  return (
    <div className="App">
      <TodoList title={state.todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
