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

test('correct todolist should change his name', () => {
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

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todoListId2,
    title: newTodoListTitle
  }

  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter should be changed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newFilter = FILTERS.COMPLETED

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

  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todoListId2,
    filter: newFilter
  }

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe(FILTERS.ALL)
  expect(endState[1].filter).toBe(newFilter)
})
