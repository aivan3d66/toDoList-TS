import React, {useEffect, useState} from "react";
import {v1} from "uuid";
import {tasksAPI} from "../api/tasks-api";

export default {
  title: "Project/API's/Task API",
}

export const GetTasks = () => {
  const [state, setState] = useState({});
  const todoLisId = "c3bd9c93-aa32-4705-807c-b761e8c93480";
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
          placeholder={"taskId"}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={createTask}>
          Crate task
        </button>
      </div>
    </div>

  )
}

export const AddNewTask = () => {
  const [state, setState] = useState({});
  const todoLisId = "c3bd9c93-aa32-4705-807c-b761e8c93480";
  const taskTitle = "Water";
  useEffect(() => {
    tasksAPI.addTask(todoLisId, taskTitle)
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
  const todoLisId = "c3bd9c93-aa32-4705-807c-b761e8c93480";
  const taskId = "7e011ac7-75fe-41f3-9069-611200675eae";
  useEffect(() => {
    tasksAPI.deleteTask(todoLisId, taskId)
      .then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};


// export const DeleteTask = () => {
//   const [state, setState] = useState({});
//   const [taskId, setTaskId] = useState("");
//   const [todolistId, setTodoListId] = useState("");
//
//   const deleteTask = () => {
//     const todolistId = v1();
//     const taskId = v1();
//
//     tasksAPI.deleteTask(todolistId, taskId)
//       .then(res => setState(res.data));
//   }
//
//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           placeholder={"todolistId"}
//           value={todolistId}
//           onChange={(e) => {
//             setTodoListId(e.currentTarget.value)
//           }}
//         />
//         <input
//           placeholder={"taskId"}
//           value={taskId}
//           onChange={(e) => {
//             setTaskId(e.currentTarget.value)
//           }}
//         />
//         <button onClick={deleteTask}>
//           delete task
//         </button>
//       </div>
//     </div>
//   )
// };
