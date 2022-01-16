import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SET_ERROR_NAME} from "../common/constants";
import {Button, TextField, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";

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
    <Grid container style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}>
      <TextField
        placeholder={"Just write something ..."}
        value={title}
        size={'small'}
        error={!!error}
        helperText={error}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeTitleHandler}
        style={{
          flexGrow: "10",
          margin: "0 10px 0 0",
          width: "auto",
          backgroundColor: "white"}}
      />
      {/*{error && <span className={finalSpanClassName}>{error}</span>}*/}
      <Button
        onClick={addItemHandler}
        startIcon={<Add/>}
        variant={'contained'}
        style={{flexGrow: "1"}}
      >
        add
      </Button>
    </Grid>
  )
}
