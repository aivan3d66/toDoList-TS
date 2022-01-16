import React from "react";
import {TaskType} from "../redux/state";
import {
  AddTask,
  ChangeFilter,
  ChangeStatus,
  ChangeTaskTitleType, ChangeTodoListTitleType,
  FilterValueType,
  RemoveTask,
  RemoveTodoList
} from "../App";
import {FILTERS} from "../common/constants";
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./TodoListItems/EditableSpan/EditableSpan";
import {TodoListItems} from "./TodoListItems/TodoListItems";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export type TodoListProps = {
  todoListID: string,
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: ChangeFilter,
  addTask: AddTask,
  changeTaskStatus: ChangeStatus,
  filter: FilterValueType,
  removeTodoList: RemoveTodoList,
  changeTaskTitle: ChangeTaskTitleType,
  changeTodoListTitle: ChangeTodoListTitleType
};
export type OnRemoveListHandler = () => void;

const TodoList: React.FC<TodoListProps> = (
  {
    todoListID,
    changeTodoListTitle,
    removeTodoList,
    titleList,
    changeTaskTitle,
    filter,
    changeFilter,
    tasks,
    addTask,
    removeTask,
    changeTaskStatus,
  }
) => {

  const onRemoveListHandler: OnRemoveListHandler = () => removeTodoList(todoListID);
  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(todoListID, title)
  };
  const addTaskHandler = (title: string) => {
    addTask(todoListID, title)
  };

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
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "0 0 20px 0"
      }}>
        <EditableSpan title={titleList} onChange={onChangeTodoListTitle}/>
        <Button
          onClick={onRemoveListHandler}
          startIcon={<DeleteIcon/>}
          variant={'outlined'}
          color={'error'}
        >
        </Button>
      </div>
      <AddItemForm
        addTask={addTaskHandler}
      />

      <TodoListItems
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        todoListID={todoListID}
      />

      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
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
