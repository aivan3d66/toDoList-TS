import {v1} from "uuid";
import {TodoListTasksType} from "../../redux/state";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../task-reducer";

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
  const taskId = v1();
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
      {id: taskId, title: "React book", isDone: false},
    ]
  }

  const action = changeTaskTitleAC(todoListId2, taskId, newTitle)

  const endState = taskReducer(startState, action)

  expect(endState[todoListId2][2].title).toBe(newTitle)
})

test('current task checkbox should be changed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const taskId1 = v1();
  const newIsDone = false

  const startState: TodoListTasksType = {
    [todoListId1]: [
      {id: taskId1, title: "HTML", isDone: true},
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

  const action = changeStatusTaskAC(todoListId1, taskId1, newIsDone)

  const endState = taskReducer(startState, action)

  expect(endState[todoListId1][0].isDone).toBe(newIsDone)
})
