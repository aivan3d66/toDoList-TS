import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
  title: "Project/API's",
}

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '326f0c95-3947-488e-9603-2e37b5da986c',
  }
}

export const GetTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    let response = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings);

    response.then((res) => {
      setState(res.data);
    })
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const CreateTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {

  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const DeleteTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {

  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const UpdateTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {

  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
}