import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string,
  onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const {
    title,
    onChange
  } = props;

  console.log("EditableSpan called");

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  const activateEditMode = useCallback(() => {
    setEditMode(true);
    setNewTitle(title)
  }, []);
  const activateViewMode = () => {
    setEditMode(false);
    onChange(newTitle)
  }
  const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }, [])

  return (
    <div style={{
      flexGrow: 10,
      margin: "0",
    }}>
      {
        editMode
          ? <TextField
            onChange={onChangeTitleHandler}
            value={newTitle}
            onBlur={activateViewMode}
            autoFocus
            size={'small'}
            id="standard-basic"
            variant="standard"
            margin={'none'}
          />
          : <span onDoubleClick={activateEditMode}>{title}</span>
      }
    </div>

  )
});
