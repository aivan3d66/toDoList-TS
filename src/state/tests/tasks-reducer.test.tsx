import {
  addTaskAC,
  changeStatusTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
  taskReducer,
  TodoListTasksType
} from "../task-reducer";
import {removeTodoListAC, todoListId1} from "../todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

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

test('current task should be removed', () => {
  const action = removeTaskAC("todoListId2", "2")

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"].length).toBe(2)
})

test('current task should be added', () => {
  const newTitle = "Whiskey"

  const action = addTaskAC("todoListId2", newTitle)

  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe(newTitle);
})

test('current task should change his name', () => {
  const newTitle = "SASS or LESS"

  const action = changeTaskTitleAC("todoListId2", "3", newTitle)

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"][2].title).toBe(newTitle)
})

test('current task checkbox should be changed', () => {
  const newIsDone = !TaskStatuses.Completed

  const action = changeStatusTaskAC("todoListId1", "1", newIsDone)

  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"][0].status).toBe(newIsDone)
})

test('property with todolistId should be deleted', () => {
  const action = removeTodoListAC("todolistId2");

  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
