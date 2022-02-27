import React, {useEffect, useState} from "react";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";

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
  const title = "What to learn?";
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
  const todolistId = "a013f8a5-d6d0-499b-b411-6ee1f5749ae6";
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
  const todolistId = "c3bd9c93-aa32-4705-807c-b761e8c93480";
  const title = "What to buy?";
  useEffect(() => {
    todoListsAPI.updateTodoList(todolistId, title).then(res => setState(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};