import {
  taskReducer, tasksActions,
  TodoListTasksType,
} from "../task-reducer";
import {todoListActions, todoListId1} from "../todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

export const startState: TodoListTasksType = {
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
  const action = tasksActions.removeTaskAC("todoListId2", "2")

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"].length).toBe(2)
});

test('current task should be added', () => {
  const action = tasksActions.addTaskAC({
    todolistId: "todoListId2",
    id: "3",
    title: "beer",
    status: TaskStatuses.Completed,
    startDate: '',
    deadline: '',
    addedDate: '',
    priority: TaskPriorities.Low,
    order: 0,
    description: '',
  })

  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("beer");
});

test('current task should change his name', () => {
  const newTitle = "SASS or LESS"
  const action = tasksActions.updateTaskAC("todoListId2", "3", {
    title: "SASS or LESS"
  })

  const endState = taskReducer(startState, action)

  expect(endState["todoListId2"][2].title).toBe(newTitle)
});

test('current task checkbox should be changed', () => {
  const newIsDone = TaskStatuses.New
  const action = tasksActions.updateTaskAC("todoListId1", "1", {
    status: TaskStatuses.New
  })

  const endState = taskReducer(startState, action)

  expect(endState["todoListId1"][0].status).toBe(newIsDone)
});

test('property with todolistId should be deleted', () => {
  const action = todoListActions.removeTodoListAC("todolistId2");

  const endState = taskReducer(startState, action)

  // const keys = Object.keys(endState);
  //
  // expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test('tasks should be added', () => {
  const action = tasksActions.getAllTodoListTasksAC("todoListId1", startState["todoListId1"]);

  const endState = taskReducer({
    "todoListId2": [],
    "todoListId1": []
  }, action)

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(0);
})
