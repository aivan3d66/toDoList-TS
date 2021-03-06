import {ApiResponseType, instance} from "./api";

type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: Array<TasksResponseType>
};
type SetTasksResponse = {
    item: TasksResponseType
};
export type TasksResponseType = {
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todolistId: string,
    order: number,
    addedDate: string,
};
export type UpdateTaskType = {
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
};
export type UpdateTaskModelType = {
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
};

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low = 0,
    Middle,
    Hi,
    Urgently,
    Later
}

export const tasksAPI = {
    getAllTasks: (args: GetAllTasksArgsType) => {
        return instance.get<GetTasksResponse>(`/todo-lists/${args.todoListId}/tasks`)
    },
    addTask: (args: AddTaskArgsType) => {
        return instance.post<ApiResponseType<SetTasksResponse>>(`/todo-lists/${args.todoListId}/tasks`, {title: args.title}).then(res => res.data)
    },
    deleteTask: (args: DeleteTaskType) => {
        return instance.delete<ApiResponseType>(`/todo-lists/${args.todoListId}/tasks/${args.taskId}`)
    },
    updateTask: (args: UpdateTaskArgsType) => {
        return instance.put<ApiResponseType<UpdateTaskType>>(`/todo-lists/${args.todoListId}/tasks/${args.taskId}`, args.model)
    }
};

export type GetAllTasksArgsType = {
    todoListId: string
};
export type AddTaskArgsType = {
    todoListId: string,
    title: string
};
export type DeleteTaskType = {
    todoListId: string,
    taskId: string
};
export type UpdateTaskArgsType = {
    todoListId: string,
    taskId: string,
    model: UpdateTaskModelType
};
