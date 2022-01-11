import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SET_ERROR_NAME} from "../common/constants";
import SuperInputText from "../common/super-components/SuperInputText/SuperInputText";
import SuperButton from "../common/super-components/SuperButton/SuperButton";

type AddItemFormPropsType = {
  addTask: (title: string) => void,
};
export type OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => void;
export type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type AddTaskHandler = () => void;

export const AddItemForm: React.FC<AddItemFormPropsType> = (
  {
    addTask,
  }
) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addItemHandler: AddTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(title);
      setTitle("");
      setError("");
    } else {
      setError(SET_ERROR_NAME);
    }
  };
  const onKeyPressHandler: OnKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      addItemHandler();
    }
  };
  const onChangeTitleHandler: OnChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    setError("");
  };

  return (
    <div className="tasks-list__field">
      <SuperInputText
        value={title}
        error={error}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeTitleHandler}
      />
      <SuperButton
        red={!!error}
        onClick={addItemHandler}
      >
        +
      </SuperButton>
    </div>
  )
}
