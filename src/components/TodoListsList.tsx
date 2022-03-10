import React from "react";
import {Grid, Paper} from "@mui/material";
import {TodoListDomainType} from "../state/todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/redux-store";
import {ChangeFilter, ChangeTodoListTitleType, RemoveTodoList} from "../app/App";
import {TodoList} from "./TodoList/TodoList";

export type TodoListsListPropsType = {
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

  const {
    changeFilter,
    removeTodoList,
    changeTodoListTitle,
  } = props;

  const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todoLists);

  return (
    <>
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
                    key={t.id}
                    todoListID={t.id}
                    filter={t.filter}
                    titleList={t.title}
                    changeFilter={changeFilter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            )
          })
      }
    </>
  )
}
