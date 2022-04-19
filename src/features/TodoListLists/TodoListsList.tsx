import React, {useCallback, useEffect} from "react";
import {Container, Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {
  changeTodoListFilterAC,
  FilterValueType,
  TodoListDomainType, todoListsThunks
} from "../../state/slices/todolist-reducer";
import {TodoList} from "./TodoList/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../common/constants";
import {useActions} from "../../utils/helpers";

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
    margin: "0 0 40px 0",
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

  const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todoLists);
  const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoginIn);
  const {getTodoLists, setTodoLists, deleteTodoList, updateTodoListTitle} = useActions(todoListsThunks)

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    getTodoLists({})
  }, [])

  const addTodoList = useCallback((title: string) => {
    setTodoLists({title});
  }, []);
  const removeTodoList = useCallback((todoListId: string) => {
    deleteTodoList({todoListId});
  }, []);
  const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
    updateTodoListTitle({todoListId: todoListID, title: newTitle});
  }, []);

  const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
    changeTodoListFilterAC({id: todoListId, filter: value});
  }, []);

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
