import React, {useState} from "react";
import {tasksAPI} from "../api/tasks-api";

export default {
  title: "Project/API's/Task API",
}

export const GetTasks = () => {
  const [state, setState] = useState({});
  const [todoListId, setTodoListId] = useState<string>('');

  const getTasks = () => {
    tasksAPI.getAllTasks(todoListId)
      .then(res => setState(res.data.items));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoListId"}
          value={todoListId}
          onChange={(e) => setTodoListId(e.currentTarget.value)}
        />
        <button onClick={getTasks}>
          Get tasks
        </button>
      </div>
    </div>
  )
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [todoListId, setTodoListId] = useState<string>('');

  const createTask = () => {
    tasksAPI.addTask(todoListId, taskTitle)
      .then(res => setState(res.data));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoListId"}
          value={todoListId}
          onChange={(e) => setTodoListId(e.currentTarget.value)}
        />
        <input
          placeholder={"taskTitle"}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={createTask}>
          Create task
        </button>
      </div>
    </div>

  )
};

export const DeleteTask = () => {
  const [state, setState] = useState({});
  const [taskId, setTaskId] = useState("");
  const [todolistId, setTodoListId] = useState("");

  const deleteTask = () => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => setState(res.data));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>
          delete task
        </button>
      </div>
    </div>
  )
};
