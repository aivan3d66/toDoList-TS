import React, {useCallback, useEffect} from "react";
import {ChangeFilter, ChangeTodoListTitleType, RemoveTodoList} from "../../app/App";
import {FILTERS} from "../../common/constants";
import '../../app/App.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../TodoListItems/EditableSpan/EditableSpan";
import {TodoListTasks} from "../TodoListItems/TodoListTasks";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {getAllTodoListTasks, setNewTodoListTask} from "../../state/task-reducer";
import {FilterValueType, TodoListDomainType} from "../../state/todolist-reducer";
import {TasksResponseType, TaskStatuses} from "../../api/tasks-api";

export type TodoListProps = {
  todoList: TodoListDomainType,
  filter: FilterValueType,
  changeFilter: ChangeFilter,
  removeTodoList: RemoveTodoList,
  changeTodoListTitle: ChangeTodoListTitleType
  demo?: boolean,
};

const todoListBtnWrapperStyles = {
  display: "flex",
  justifyContent: "space-between",
  margin: "auto 0 0 0"
}

export const TodoList: React.FC<TodoListProps> = React.memo(({demo = false, ...props}) => {
    console.log('TodoList called');

    const {
      todoList,
      filter,
      changeTodoListTitle,
      removeTodoList,
      changeFilter,
    } = props;

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TasksResponseType>>(state => state.tasks[todoList.id])
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todoLists)

    useEffect(() => {
      if (!demo) {
        dispatch(getAllTodoListTasks(todoList.id))
      }
    }, [todoLists])

    const onChangeTodoListTitle = useCallback((title: string) => {
      changeTodoListTitle(todoList.id, title)
    }, [changeTodoListTitle, todoList.id]);
    const onRemoveListHandler = useCallback(() => {
      removeTodoList(todoList.id);
    }, [removeTodoList, todoList.id]);

    const addTaskHandler = useCallback((title: string) => {
      dispatch(setNewTodoListTask(todoList.id, title));
    }, [todoList.id]);

    let taskForTodoList = tasks;

    if (filter === FILTERS.ACTIVE) {
      taskForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === FILTERS.COMPLETED) {
      taskForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const onAllFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.ALL), [todoList.id, FILTERS.ALL, changeFilter]);
    const onActiveFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.ACTIVE), [todoList.id, FILTERS.ACTIVE, changeFilter]);
    const onCompletedFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.COMPLETED), [todoList.id, FILTERS.COMPLETED, changeFilter]);

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
          <EditableSpan title={todoList.title} onChange={onChangeTodoListTitle}/>
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

        <TodoListTasks
          tasks={taskForTodoList}
          todoListID={todoList.id}
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
