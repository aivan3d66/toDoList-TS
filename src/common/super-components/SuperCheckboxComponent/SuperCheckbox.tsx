import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css';
import {ChangeStatus} from "../../../App";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string,
  changeStatus: ChangeStatus,
  id: string,
  todoListID: string,
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
  {
    type,
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children,
    changeStatus,
    id,
    todoListID,
    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked && onChangeChecked(e.currentTarget.checked)
    changeStatus(todoListID, id, e.currentTarget.checked)
    onChange && onChange(e)
  }

  const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

  return (
    <label>
      <input
        type={'checkbox'}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </label>
  )
}

export default SuperCheckbox
