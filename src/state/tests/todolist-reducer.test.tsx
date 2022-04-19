import {
  changeTodoListEntityStatus, changeTodoListFilterAC,
  TodoListDomainType,
  todoListsReducer, todoListsThunks
} from "../slices/todolist-reducer";
import {v1} from "uuid";
import {FILTERS} from "../../common/constants";
import {StatusType} from "../../app/app-reducer";

const {getTodoLists, setTodoLists, deleteTodoList, updateTodoListTitle} = todoListsThunks;

const todoListId1 = v1();
const todoListId2 = v1();

const startState: Array<TodoListDomainType> = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: FILTERS.ALL,
    addedDate: '',
    order: 0,
    entityStatus: 'idle'
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: FILTERS.ALL,
    addedDate: '',
    order: 0,
    entityStatus: 'idle'
  }
]

test('current todolist should be removed', () => {
  const action = deleteTodoList.fulfilled({todoListId: todoListId1}, '', {todoListId: todoListId1})
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2)
})

test('current todolist should be added', () => {
  const newObj = {
    id: "todoListId3",
    title: "New TodoList",
    addedDate: '',
    order: 0,
  }

  const action = setTodoLists.fulfilled({
    todoList: newObj
  }, '', {title: newObj.title})

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New TodoList")
  expect(endState[2].filter).toBe(FILTERS.ALL)
})

test('current todolist should change his name', () => {
  const newTodoListTitle = "New TodoList"
  const action = updateTodoListTitle.fulfilled({id: todoListId2, title: newTodoListTitle}, '', {todoListId: todoListId2, title: newTodoListTitle})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})

test('current filter should be changed', () => {
  const newFilter = FILTERS.COMPLETED;
  const action = changeTodoListFilterAC({id: todoListId2, filter: newFilter});

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe(FILTERS.ALL);
  expect(endState[1].filter).toBe(newFilter);
})

test('todoLists should be added', () => {
  const action = getTodoLists.fulfilled({
    todoLists: startState
  }, '', {todoLists: startState})

  const endState = todoListsReducer([], action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todoListId1);
})

test('current entity status should be changed', () => {
  const newStatus: StatusType = 'loading';
  const action = changeTodoListEntityStatus({id: todoListId2, status: newStatus});

  const endState = todoListsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
})
