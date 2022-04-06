import React, {useCallback, useEffect} from "react";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {
  changeTodoListFilterAC,
  deleteTodoListThunk, FilterValueType,
  getTodoListsThunk,
  setTodoListsThunk,
  TodoListDomainType, updateTodoListTitleThunk
} from "../../state/todolist-reducer";
import {TodoList} from "./TodoList/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../common/constants";

export type AddTodoList = (title: string) => void;
export type RemoveTodoList = (todoListId: string) => void;
export type ChangeTodoListTitleType = (todoListID: string, title: string) => void;
export type ChangeFilter = (todoListId: string, value: FilterValueType) => void;
export type TodoListsListPropsType = {
  demo?: boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo}) => {
  const paperAppStyles = {
    width: "280px",
    minHeight: "200px",
    padding: "16px",
    fontSize: "14px",
  };
  const gridItemAppStyles = {
    width: "100%",
    margin: "40px 0",
    padding: "16px",
    backgroundColor: "rgba(211, 211, 211, 0.5)",
    borderRadius: "5px"
  };
  const gridContainerAppStyles = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "0 auto 60px auto",
  };

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todoLists);
  const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoginIn);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(getTodoListsThunk())
  }, [])

  const addTodoList = useCallback((title: string) => {
    dispatch(setTodoListsThunk(title));
  }, [dispatch]);
  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(deleteTodoListThunk(todoListId));
  }, [dispatch]);
  const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
    dispatch(updateTodoListTitleThunk(todoListID, newTitle));
  }, [dispatch]);

  const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
    dispatch(changeTodoListFilterAC({id: todoListId, filter: value}));
  }, [dispatch]);

  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN}/>

  return (
    <Container fixed style={{
      width: "100%",
      margin: "0 auto",
      padding: "0",
    }}>
      <Grid container style={{maxWidth: "700px", margin: "0 auto"}}>
        <Grid item style={gridItemAppStyles}>
          <AddItemForm addTask={addTodoList}/>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={gridContainerAppStyles}>
        {todoLists.map(t => {
          return (
            <Grid item key={t.id}>
              <Paper style={paperAppStyles}>
                <TodoList
                  demo={demo}
                  todoList={t}
                  key={t.id}
                  filter={t.filter}
                  changeFilter={changeFilter}
                  removeTodoList={removeTodoList}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
