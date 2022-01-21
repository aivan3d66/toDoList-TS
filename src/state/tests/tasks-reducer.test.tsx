import {
  changeTodoListFilterAC,
  todoListsReducer
} from "../todolist-reducer";
import {v1} from "uuid";
import {FILTERS} from "../../common/constants";
import {TodoListsType, TodoListTasksType} from "../../redux/state";
import {addTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../task-reducer";

test('current task should be removed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const currentId = v1()

  const startState: TodoListTasksType = {
    [todoListId1]: [
      {id: currentId, title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JavaScript", isDone: false},
      {id: v1(), title: "TypeScript", isDone: false},
      {id: v1(), title: "React", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Coffee", isDone: true},
      {id: v1(), title: "New brains", isDone: false},
      {id: v1(), title: "React book", isDone: false},
    ]
  }

  const endState = taskReducer(startState, removeTaskAC(todoListId1, currentId))

  expect(endState[todoListId1].length).toBe(4)
})

test('current task should be added', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTitle = "Something new"

  const startState: TodoListTasksType = {
    [todoListId1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JavaScript", isDone: false},
      {id: v1(), title: "TypeScript", isDone: false},
      {id: v1(), title: "React", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Coffee", isDone: true},
      {id: v1(), title: "New brains", isDone: false},
      {id: v1(), title: "React book", isDone: false},
    ]
  }

  const endState = taskReducer(startState, addTaskAC(todoListId2, newTitle))

  expect(endState[todoListId2].length).toBe(4)
  // expect(endState[todoListId2][4].title).toBe(newTitle)
})

test('current task should change his name', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const todoListId3 = v1();
  const newTitle = "SASS or LESS"

  const startState: TodoListTasksType = {
    [todoListId1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JavaScript", isDone: false},
      {id: v1(), title: "TypeScript", isDone: false},
      {id: v1(), title: "React", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Coffee", isDone: true},
      {id: v1(), title: "New brains", isDone: false},
      {id: todoListId3, title: "React book", isDone: false},
    ]
  }

  const endState = taskReducer(startState, changeTaskTitleAC(todoListId2, todoListId3, newTitle))

  expect(endState[todoListId2][3].title).toBe(newTitle)
})

// test('current task checkbox should be changed', () => {
//   const todoListId1 = v1();
//   const todoListId2 = v1();
//   const newFilter = FILTERS.COMPLETED
//
//   const startState: Array<TodoListsType> = [
//     {
//       id: todoListId1,
//       title: "What to learn",
//       filter: FILTERS.ALL,
//     },
//     {
//       id: todoListId2,
//       title: "What to buy",
//       filter: FILTERS.ALL,
//     },
//   ]
//
//   const action = changeTodoListFilterAC(todoListId2, newFilter)
//
//   const endState = todoListsReducer(startState, action)
//
//   expect(endState[0].filter).toBe(FILTERS.ALL)
//   expect(endState[1].filter).toBe(newFilter)
// })
