import {addTodoListAC, TodoListDomainType, todoListId1, todoListsReducer} from "../todolist-reducer";
import {taskReducer, TodoListTasksType} from "../task-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

test('new array should be added when new todolist is added', () => {
  const startState: TodoListTasksType = {
    "todoListId1": [
      {
        id: "1",
        title: "HTML",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "2",
        title: "CSS",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "3",
        title: "JavaScript",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      }
    ],
    "todoListId2": [
      {
        id: "1",
        title: "Coffee",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "2",
        title: "New brains",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "3",
        title: "React book",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      }
    ],
  }

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
  const startTodolistsState: Array<TodoListDomainType> = [];

  const action = addTodoListAC("new todolist", v1());
  const endTasksState = taskReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodolists).toBe(action.todoListId);
});


