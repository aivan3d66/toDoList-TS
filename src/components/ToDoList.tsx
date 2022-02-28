import React, {useCallback} from "react";
import {ChangeFilter, ChangeTodoListTitleType, RemoveTodoList} from "../App";
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
import {FilterValueType} from "../state/todolist-reducer";
import {TasksResponseType, TaskStatuses} from "../api/tasks-api";

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

const TodoList = React.memo((props: TodoListProps) => {
    console.log('TodoList called');

    const {
      todoListID,
      titleList,
      filter,
      changeTodoListTitle,
      removeTodoList,
      changeFilter,
    } = props;

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TasksResponseType>>(state => state.tasks[todoListID])

    const onChangeTodoListTitle = useCallback((title: string) => {
      changeTodoListTitle(todoListID, title)
    }, [changeTodoListTitle, todoListID]);
    const onRemoveListHandler = useCallback(() => {
      removeTodoList(todoListID);
    }, [removeTodoList, todoListID]);

    const addTaskHandler = useCallback((title: string) => {
      dispatch(addTaskAC(todoListID, title));
    }, [todoListID]);

    let taskForTodoList = tasks;

    if (filter === FILTERS.ACTIVE) {
      taskForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === FILTERS.COMPLETED) {
      taskForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const onAllFilterHandler = useCallback(() => changeFilter(todoListID, FILTERS.ALL), [todoListID, FILTERS.ALL, changeFilter]);
    const onActiveFilterHandler = useCallback(() => changeFilter(todoListID, FILTERS.ACTIVE), [todoListID, FILTERS.ACTIVE, changeFilter]);
    const onCompletedFilterHandler = useCallback(() => changeFilter(todoListID, FILTERS.COMPLETED), [todoListID, FILTERS.COMPLETED, changeFilter]);

    const getActiveBtnClassName = (filterValue: FilterValueType) => {
      return filter === filterValue ? 'contained' : 'outlined';
    };

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
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
          addTask={addTaskHandler}
        />

        <TodoListItems
          tasks={taskForTodoList}
          todoListID={todoListID}
        />

        <div style={todoListBtnWrapperStyles}>
          <Button
            variant={getActiveBtnClassName(FILTERS.ALL)}
            onClick={onAllFilterHandler}
            size={'small'}
          >
            All
          </Button>
          <Button
            variant={getActiveBtnClassName(FILTERS.ACTIVE)}
            onClick={onActiveFilterHandler}
            size={'small'}
          >
            Active
          </Button>
          <Button
            variant={getActiveBtnClassName(FILTERS.COMPLETED)}
            onClick={onCompletedFilterHandler}
            size={'small'}
          >
            Completed
          </Button>
        </div>
      </div>
    )
  }
)

export default TodoList;
