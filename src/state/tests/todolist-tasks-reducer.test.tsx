import {addTodoListAC, TodoListDomainType, todoListsReducer, TodoListType} from "../todolist-reducer";
import {taskReducer, TodoListTasksType} from "../task-reducer";

test('new array should be added when new todolist is added', () => {
  const startTasksState: TodoListTasksType = {};
  let newTodoList: TodoListType = {
    id: 'someId',
    title: 'new todolist',
    addedDate: '',
    order: 0
  }

  const action = addTodoListAC(newTodoList);

  const endState = taskReducer(startTasksState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(1);
  expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
  const startTasksState: TodoListTasksType = {};
  const startTodoListsState: Array<TodoListDomainType> = [];

  let newTodoList: TodoListType = {
    id: 'someId',
    title: 'new todolist',
    addedDate: '',
    order: 0
  }

  const action = addTodoListAC(newTodoList);
  const endTasksState = taskReducer(startTasksState, action)
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoList.id);
  expect(idFromTodoLists).toBe(action.todoList.id);
});


