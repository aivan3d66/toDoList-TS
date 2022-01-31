import {TodoListTasksType} from "../../redux/state";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../task-reducer";
import {removeTodoListAC} from "../todolist-reducer";

test('current task should be removed', () => {
const startState: TodoListTasksType = {
    "todoListId1": [
      {id: "1", title: "HTML", isDone: true},
      {id: "2", title: "CSS", isDone: true},
      {id: "3", title: "JavaScript", isDone: false},
    ],
    "todoListId2": [
      {id: "1", title: "Coffee", isDone: true},
      {id: "2", title: "New brains", isDone: false},
      {id: "3", title: "React book", isDone: false},
    ]
  }

  const action = removeTaskAC("todoListId2", "2")

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"].length).toBe(2)
})

test('current task should be added', () => {
  const newTitle = "Whiskey"

  const startState: TodoListTasksType = {
    "todoListId1": [
      {id: "1", title: "HTML", isDone: true},
      {id: "2", title: "CSS", isDone: true},
      {id: "3", title: "JavaScript", isDone: false},
    ],
    "todoListId2": [
      {id: "1", title: "Coffee", isDone: true},
      {id: "2", title: "New brains", isDone: false},
      {id: "3", title: "React book", isDone: false},
    ]
  }

  const action = addTaskAC("todoListId2", newTitle)

  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe(newTitle);
  expect(endState["todoListId2"][0].isDone).toBe(false);
})

test('current task should change his name', () => {
  const newTitle = "SASS or LESS"

  const startState: TodoListTasksType = {
    "todoListId1": [
      {id: "1", title: "HTML", isDone: true},
      {id: "2", title: "CSS", isDone: true},
      {id: "3", title: "JavaScript", isDone: false},
    ],
    "todoListId2": [
      {id: "1", title: "Coffee", isDone: true},
      {id: "2", title: "New brains", isDone: false},
      {id: "3", title: "React book", isDone: false},
    ]
  }

  const action = changeTaskTitleAC("todoListId2", "3", newTitle)

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"][2].title).toBe(newTitle)
})

test('current task checkbox should be changed', () => {
  const newIsDone = false

  const startState: TodoListTasksType = {
    "todoListId1": [
      {id: "1", title: "HTML", isDone: true},
      {id: "2", title: "CSS", isDone: true},
      {id: "3", title: "JavaScript", isDone: false},
    ],
    "todoListId2": [
      {id: "1", title: "Coffee", isDone: true},
      {id: "2", title: "New brains", isDone: false},
      {id: "3", title: "React book", isDone: false},
    ]
  }

  const action = changeStatusTaskAC("todoListId1", "1", newIsDone)
  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"][0].isDone).toBe(newIsDone)
})

test('property with todolistId should be deleted', () => {
  const startState: TodoListTasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = removeTodoListAC("todolistId2");

  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
