import React, {useEffect, useState} from "react";
import {v1} from "uuid";
import {todoListsAPI} from "../api/api";

export default {
  title: "Project/API's/TodoList API",
}

export const GetTodoLists = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    todoListsAPI.getAllTodoLists().then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const CreateTodoLists = () => {
  const [state, setState] = useState({});
  const title = "Some list";
  useEffect(() => {
    todoListsAPI.setTodoLists(title).then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const DeleteTodoLists = () => {
  const [state, setState] = useState({});
  const todolistId = v1();
  useEffect(() => {
    todoListsAPI.deleteTodoList(todolistId).then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const UpdateTodoLists = () => {
  const [state, setState] = useState({});
  const todolistId = v1();
  const title = "Some new title";
  useEffect(() => {
    todoListsAPI.updateTodoList(todolistId, title).then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};