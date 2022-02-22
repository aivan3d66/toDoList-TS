import React, {useEffect, useState} from "react";
import axios from "axios";
import {v1} from "uuid";

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
    axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
      .then((res) => {
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
    axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {
      title: "Some list"
    }, settings)
      .then((res) => {
        setState(res.data);
      })
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const DeleteTodoLists = () => {
  const [state, setState] = useState(null);
  const todolistId = v1();
  useEffect(() => {
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then((res) => {
        setState(res.data);
      })
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const UpdateTodoLists = () => {
  const [state, setState] = useState(null);
  const todolistId = v1();
  useEffect(() => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
      title: "Yo"
    }, settings)
      .then((res) => {
        setState(res.data);
      })
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
}