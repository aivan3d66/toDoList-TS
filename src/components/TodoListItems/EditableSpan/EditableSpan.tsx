import React, {ChangeEvent, useState} from "react";
import SuperInputText from "../../../common/super-components/SuperInputText/SuperInputText";

type EditableSpanPropsType = {
  title: string,
  onChange: any
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
  {
    title,
    onChange
  }
) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(title)
  }
  const activateViewMode = () => {
    setEditMode(false);
    onChange(newTitle)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  return (
    <div style={{
      flexGrow: 10,
      margin: "8px 0",
    }}>
      {
        editMode
          ? <SuperInputText
            onChange={onChangeTitleHandler}
            value={newTitle}
            onBlur={activateViewMode}
            autoFocus
          />
          : <span onDoubleClick={activateEditMode}>{title}</span>
      }
    </div>

  )
}
