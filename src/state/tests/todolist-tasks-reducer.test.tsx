import {TodoListsType, TodoListTasksType} from "../../redux/state";
import {addTodoListAC, todoListsReducer} from "../todolist-reducer";
import {taskReducer} from "../task-reducer";
import { v1 } from "uuid";

test('new array should be added when new todolist is added', () => {
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

  const action = addTodoListAC("new todolist", "todolistId3");

  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
  const startTasksState: TodoListTasksType = {};
  const startTodolistsState: Array<TodoListsType> = [];

  const action = addTodoListAC("new todolist", v1());
  const endTasksState = taskReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodolists).toBe(action.todoListId);
});


