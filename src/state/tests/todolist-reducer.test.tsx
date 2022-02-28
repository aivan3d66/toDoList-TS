import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC, getAllTodoListAC,
  removeTodoListAC, TodoListDomainType,
  todoListsReducer
} from "../todolist-reducer";
import {v1} from "uuid";
import {FILTERS} from "../../common/constants";

const todoListId1 = v1();
const todoListId2 = v1();

const startState: Array<TodoListDomainType> = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: FILTERS.ALL,
    addedDate: '',
    order: 0,
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: FILTERS.ALL,
    addedDate: '',
    order: 0,
  }
]

test('current todolist should be removed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const startState: Array<TodoListDomainType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    }
  ]
  const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2)
})

test('current todolist should be added', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTodoListTitle = "New TodoList"

  const startState: Array<TodoListDomainType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    }
  ]

  const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle, todoListId2))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle)
  expect(endState[2].filter).toBe(FILTERS.ALL)
})

test('current todolist should change his name', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTodoListTitle = "New TodoList"

  const startState: Array<TodoListDomainType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    }
  ]

  const action = changeTodoListTitleAC(todoListId2, newTodoListTitle)

  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})

test('current filter should be changed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newFilter = FILTERS.COMPLETED

  const startState: Array<TodoListDomainType> = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
    }
  ]

  const action = changeTodoListFilterAC(todoListId2, newFilter)

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe(FILTERS.ALL)
  expect(endState[1].filter).toBe(newFilter)
})

test('todoLists should be added', () => {

  const endState = todoListsReducer([], getAllTodoListAC(startState))

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todoListId1)
})