import React, {useState} from "react";
import SuperInputText from "../../../common/super-components/SuperInputText/SuperInputText";

type EditableSpanPropsType = {
  title: string,
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
  {
    title,

  }
) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const activateEditMode = () => setEditMode(true);
  const activateViewMode = () => setEditMode(false);

  return (
    editMode
      ? <SuperInputText defaultValue={title} onBlur={activateViewMode} autoFocus/>
      : <span onDoubleClick={activateEditMode} className="editableSpan">{title}</span>
  )
}
