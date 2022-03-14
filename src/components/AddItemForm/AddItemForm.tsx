import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SET_ERROR_NAME} from "../../common/constants";
import {Button, TextField, Grid, Alert} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
  addTask: (title: string) => void,
  disabled?: boolean
};
export type OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => void;
export type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type AddTaskHandler = () => void;

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addTask, disabled = false}) => {
  console.log('AddItemForm called');

  const addItemListContStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }
  const addItemTextFieldStyles = {
    flexGrow: 1,
    width: "100px",
    margin: "0 10px 0 0",
    backgroundColor: "white"
  }
  const editableSpanStyles = {
    width: "100%",
    margin: "10px 0 0 0",
    padding: "0 10px",
    height: "34px",
  }

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
    if (error !== '') {
      setError('')
    }
    if (e.key === "Enter") {
      addItemHandler();
    }
  };
  const onChangeTitleHandler: OnChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    if (error !== '') {
      setError('');
    }
  };

  return (
    <Grid container style={addItemListContStyles}>
      <TextField
        value={title}
        size={'small'}
        error={!!error}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeTitleHandler}
        style={addItemTextFieldStyles}
        disabled={disabled}
        label="Write the title"
      />
      <Button
        onClick={addItemHandler}
        startIcon={<Add/>}
        variant={'contained'}
        disabled={disabled}
      >
        add
      </Button>
      {error && <Alert
        severity="error"
        variant={"filled"}
        style={editableSpanStyles}
      >{SET_ERROR_NAME}</Alert>}
    </Grid>
  )
})