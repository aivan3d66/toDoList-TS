import {todoListsReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {FILTERS} from "../common/constants";
import {TodoListsType} from "../redux/state";

test('correct todolist should be removed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const startState: Array<TodoListsType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
    },
  ]
  const endState = todoListsReducer(startState, {
    type: 'REMOVE-TODOLIST',
    id: todoListId1
  })

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTodoListTitle = "New TodoList"
  const startState: Array<TodoListsType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
    },
  ]
  const endState = todoListsReducer(startState, {
    type: 'ADD-TODOLIST',
    title: newTodoListTitle
  })

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle)
  expect(endState[2].filter).toBe(FILTERS.ALL)
})
