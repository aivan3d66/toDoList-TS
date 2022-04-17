import {
    AddTaskArgsType, DeleteTaskType,
    GetAllTasksArgsType,
    TaskPriorities,
    tasksAPI,
    TasksResponseType,
    TaskStatuses,
    UpdateTaskModelType
} from "../../api/tasks-api";
import {ResultCode} from "../../api/api";
import {setAppError, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodoListAC,
    getAllTodoListAC,
    removeTodoListAC,
} from "./todolist-reducer";

export const getAllTodoListTasks = createAsyncThunk(
    'tasks/getAllTodolistTasks',
    async (payload: GetAllTasksArgsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        return await tasksAPI.getAllTasks({todoListId: payload.todoListId})
            .then(response => {
                if (response.data) {
                    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
                    return {todoListId: payload.todoListId, tasksList: response.data.items}
                } else {
                    handleServerAppError(response.data, thunkAPI.dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, thunkAPI.dispatch)
                thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            })
    });
export const setNewTodoListTask = createAsyncThunk(
    'tasks/setNewTodolistTasks',
    async (payload: AddTaskArgsType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        return await tasksAPI.addTask({todoListId: payload.todoListId, title: payload.title})
            .then(response => {
                if (response.resultCode === ResultCode.Success) {
                    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
                    thunkAPI.dispatch(getAllTodoListTasks({todoListId: payload.todoListId}))
                    return {task: response.data.item};
                } else {
                    handleServerAppError(response, thunkAPI.dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, thunkAPI.dispatch);
                thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            })
    });
export const deleteTodoListTask = createAsyncThunk(
    'task/deleteTodoListTask',
    async (payload: DeleteTaskType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        return await tasksAPI.deleteTask({todoListId: payload.todoListId, taskId: payload.taskId})
            .then(response => {
                if (response.data.resultCode === ResultCode.Success) {
                    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
                    return {todoListId: payload.todoListId, id: payload.taskId};
                }
            })
            .catch(error => {
                handleServerNetworkError(error, thunkAPI.dispatch);
                thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            })
    });

export const updateTodoListTask = createAsyncThunk('task/updateTodoListTask', async (payload: UpdatePayloadType, thunkAPI) => {
    const state = thunkAPI.getState();
    // @ts-ignore
    const currentTask = state.tasks[payload.todoListId].find((t: TasksResponseType) => t.id === payload.taskId);

    if (!currentTask) {
        return console.warn('The task is not found in state');
    }

    const apiModel: UpdateTaskModelType = {
        deadline: currentTask.deadline,
        description: currentTask.description,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        status: currentTask.status,
        title: currentTask.title,
        ...payload.domainModel
    };

    try {
        const response = await tasksAPI.updateTask({
            todoListId: payload.todoListId,
            taskId: payload.taskId,
            model: apiModel
        });

        if (response.data.resultCode === ResultCode.Success) {
            return {todoListId: payload.todoListId, taskId: payload.taskId, model: payload.domainModel}
        } else {
            handleServerAppError(response.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({
                errors: response.data.messages,
                fieldsErrors: response.data.fieldsErrors
            });
        }

    } catch (e: any) {
        thunkAPI.dispatch(setAppError(e.message));
        thunkAPI.dispatch(setAppStatus({status: 'failed'}));
        return thunkAPI.rejectWithValue({errors: [e.message], fieldsErrors: undefined});
    }
});


export const initialTasksState: TodoListTasksType = {};
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId];
        });
        builder.addCase(getAllTodoListAC, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = [];
            });
        });
        builder.addCase(getAllTodoListTasks.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId] = action.payload.tasksList;
            }
        });
        builder.addCase(setNewTodoListTask.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todolistId] = [action.payload.task];
            }
        });
        builder.addCase(deleteTodoListTask.fulfilled, (state, action: PayloadAction<any>) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(updateTodoListTask.fulfilled, (state, action: PayloadAction<any>) => {
            state[action.payload.todoListId] = state[action.payload.todoListId].map((t) => t.id === action.payload.taskId ? {
                ...t,
                ...action.payload.model
            } : t)
        });
    })
});

type UpdatePayloadType = {
    todoListId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
}
export const taskReducer = tasksSlice.reducer;
export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
};
export type TodoListTasksType = {
    [key: string]: Array<TasksResponseType>,
};
