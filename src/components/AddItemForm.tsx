import React, {useState} from "react";
import {SET_ERROR_NAME} from "../common/constants";
import SuperInputText from "../common/super-components/SuperInputText/SuperInputText";
import SuperButton from "../common/super-components/SuperButton/SuperButton";
import {AddTaskHandler, OnChangeHandler, OnKeyPressHandler} from "./ToDoList";

type AddItemFormPropsType = {
  addTask: (todoListID: string, title: string) => void,
  id: string,
  todoListID: string,
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (
  {
    addTask,
    id,
    todoListID,
  }
) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addTaskHandler: AddTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(todoListID, title);
      setTitle("");
      setError("");
    } else {
      setError(SET_ERROR_NAME);
    }
  };
  const onKeyPressHandler: OnKeyPressHandler = (e) => {
    if (e.charCode === 13) {
      addTaskHandler();
    }
  };
  const onChangeTitleHandler: OnChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    setError("");
  };

  return (
    <div className="todoList-editor">
      <SuperInputText
        value={title}
        error={error}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeTitleHandler}
      />
      <SuperButton
        red={!!error}
        onClick={addTaskHandler}
      >
        +
      </SuperButton>
    </div>
  )
}
