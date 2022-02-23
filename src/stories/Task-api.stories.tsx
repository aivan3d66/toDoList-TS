import React, {useEffect, useState} from "react";
import {v1} from "uuid";
import {tasksAPI} from "../api/tasks-api";

export default {
  title: "Project/API's/Task API",
}

export const GetTasks = () => {
  const [state, setState] = useState({});
  const todoLisId = "aff84ef6-7e3f-4767-a90f-4361d4946ed8";
  useEffect(() => {
    tasksAPI.getAllTasks(todoLisId)
      .then(res => setState(res.data.items));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const DeleteTask = () => {
  const [state, setState] = useState({});
  const [taskId, setTaskId] = useState("");
  const [todolistId, setTodoListId] = useState("");

  const deleteTask = () => {
    const todolistId = v1();
    const taskId = v1();

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
