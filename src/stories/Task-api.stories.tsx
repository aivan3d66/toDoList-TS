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

export const AddNewTask = () => {
  const [state, setState] = useState({});
  const todoLisId = "aff84ef6-7e3f-4767-a90f-4361d4946ed8";
  const taskTitle = "This is ask title";
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
