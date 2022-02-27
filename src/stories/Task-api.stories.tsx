import React, {useState} from "react";
import {tasksAPI} from "../api/tasks-api";
import {todoListsAPI} from "../api/todoList-api";

export default {
  title: "Project/API's/Task API",
}

export const GetTasks = () => {
  const [state, setState] = useState({});
  const [todoListId, setTodoListId] = useState<string>('');

  const getTasks = () => {
    tasksAPI.getAllTasks(todoListId)
      .then(res => setState(res.data.items));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoListId"}
          value={todoListId}
          onChange={(e) => setTodoListId(e.currentTarget.value)}
        />
        <button onClick={getTasks}>
          Get tasks
        </button>
      </div>
    </div>
  )
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [todoListId, setTodoListId] = useState<string>('');

  const createTask = () => {
    tasksAPI.addTask(todoListId, taskTitle)
      .then(res => setState(res.data));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoListId"}
          value={todoListId}
          onChange={(e) => setTodoListId(e.currentTarget.value)}
        />
        <input
          placeholder={"taskTitle"}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={createTask}>
          Create task
        </button>
      </div>
    </div>

  )
};

export const DeleteTask = () => {
  const [state, setState] = useState({});
  const [taskId, setTaskId] = useState("");
  const [todolistId, setTodoListId] = useState("");

  const deleteTask = () => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => setState(res.data));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>
          delete task
        </button>
      </div>
    </div>
  )
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const [todoListId, setTodoListId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const createTask = () => {
    tasksAPI.updateTask(todoListId, taskId, {
      deadline: '',
      description: description,
      priority: priority,
      startDate: '',
      status: status,
      title: title
    }).then(res => setState(res.data));
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"todolistId"}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"task title"}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"task description"}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"status"}
          value={status}
          type={'number'}
          onChange={(e) => {
            setStatus(+e.currentTarget.value)
          }}
        />
        <input
          placeholder={"priority"}
          value={priority}
          type={'number'}
          onChange={(e) => {
            setPriority(+e.currentTarget.value)
          }}
        />
        <button onClick={createTask}>
          Create task
        </button>
      </div>
    </div>
  )
};