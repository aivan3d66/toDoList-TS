import React, {useEffect, useState} from "react";
import {tasksAPI} from "../api/api";
import {v1} from "uuid";

export default {
  title: "Project/API's/Task API",
}

export const GetTasks = () => {
  const [state, setState] = useState({});
  const todoLisId = v1();
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
//
// export const UpdateTodoLists = () => {
//   const [state, setState] = useState({});
//   const todolistId = v1();
//   const title = "Some new title";
//   useEffect(() => {
//     todoListsAPI.updateTodoList(todolistId, title).then(res => setState(res.data));
//   }, [])
//
//   return (
//     <div>
//       {JSON.stringify(state)}
//     </div>
//   )
// };