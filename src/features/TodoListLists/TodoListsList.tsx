import React from "react";
import {Container, Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {TodoListDomainType} from "../../state/todolist-reducer";
import {ChangeFilter, ChangeTodoListTitleType, RemoveTodoList} from "../../app/App";
import {TodoList} from "./TodoList/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

export type TodoListsListPropsType = {
  addTask: (title: string) => void,
  changeFilter: ChangeFilter,
  removeTodoList: RemoveTodoList,
  changeTodoListTitle: ChangeTodoListTitleType,
  demo?: boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo, ...props}) => {
  const paperAppStyles = {
    width: "300px",
    minHeight: "200px",
    padding: "16px",
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
  };

  const {
    changeFilter,
    removeTodoList,
    changeTodoListTitle,
    addTask
  } = props;

  const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todoLists);

  return (
    <Container fixed maxWidth="xl">
      <Grid container style={{maxWidth: "760px", margin: "0 auto"}}>
        <Grid item style={gridItemAppStyles}>
          <AddItemForm addTask={addTask}/>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={gridContainerAppStyles}>
        {
          todoLists.length === 0
            ? <h3 style={{
              fontWeight: "normal",
              fontSize: "24px",
              textTransform: "uppercase",
              color: "#bababa"
            }}>Please, add new tasks list ...</h3>
            : todoLists.map(t => {
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
            })
        }
      </Grid>
    </Container>
  )
}
