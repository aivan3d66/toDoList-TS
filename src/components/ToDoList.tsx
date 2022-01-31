import React from "react";
import {TaskType} from "../redux/state";
import {
  ChangeFilter, ChangeTodoListTitleType,
  FilterValueType,
  RemoveTodoList
} from "../App";
import {FILTERS} from "../common/constants";
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./TodoListItems/EditableSpan/EditableSpan";
import {TodoListItems} from "./TodoListItems/TodoListItems";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/redux-store";
import {addTaskAC} from "../state/task-reducer";

export type TodoListProps = {
  todoListID: string,
  titleList: string,
  changeFilter: ChangeFilter,
  filter: FilterValueType,
  removeTodoList: RemoveTodoList,
  changeTodoListTitle: ChangeTodoListTitleType
};

const todoListBtnWrapperStyles = {
  display: "flex",
  justifyContent: "space-between",
  margin: "auto 0 0 0"
}

const TodoList: React.FC<TodoListProps> = (
  {
    todoListID,
    changeTodoListTitle,
    removeTodoList,
    titleList,
    filter,
    changeFilter,
  }
) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todoListID])

  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(todoListID, title)
  };
  const onRemoveListHandler = () => removeTodoList(todoListID);

  let taskForTodoList = tasks;

  if (filter === FILTERS.ACTIVE) {
    taskForTodoList = tasks.filter((t: TaskType) => !t.isDone)
  }
  if (filter === FILTERS.COMPLETED) {
    taskForTodoList = tasks.filter((t: TaskType) => t.isDone)
  }

  const onAllFilterHandler = () => changeFilter(todoListID, FILTERS.ALL);
  const onActiveFilterHandler = () => changeFilter(todoListID, FILTERS.ACTIVE);
  const onCompletedFilterHandler = () => changeFilter(todoListID, FILTERS.COMPLETED);

  const getActiveBtnClassName = (filterValue: FilterValueType) => {
    return filter === filterValue ? 'contained' : 'text';
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "320px",
      minHeight: "400px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "40px",
        margin: "0 0 20px 0",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        <EditableSpan title={titleList} onChange={onChangeTodoListTitle}/>
        <IconButton
          onClick={onRemoveListHandler}
          color={'default'}
          size={'small'}>
          <DeleteIcon/>
        </IconButton>
      </div>
      <AddItemForm
        addTask={(title) => dispatch(addTaskAC(todoListID, title))}
      />

      <TodoListItems
        tasks={taskForTodoList}
        todoListID={todoListID}
      />

      <div style={todoListBtnWrapperStyles}>
        <Button
          variant={getActiveBtnClassName(FILTERS.ALL)}
          onClick={onAllFilterHandler}
        >
          All
        </Button>
        <Button
          variant={getActiveBtnClassName(FILTERS.ACTIVE)}
          onClick={onActiveFilterHandler}
        >
          Active
        </Button>
        <Button
          variant={getActiveBtnClassName(FILTERS.COMPLETED)}
          onClick={onCompletedFilterHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}

export default TodoList;
