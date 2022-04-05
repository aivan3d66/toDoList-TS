import {
    AddTaskArgsType,
    GetAllTasksArgsType,
    TaskPriorities,
    tasksAPI,
    TasksResponseType,
    TaskStatuses,
    UpdateTaskModelType
} from "../api/tasks-api";
import {ThunkAction} from "redux-thunk";
import {ResultCode} from "../api/api";
import {setAppError, SetErrorActionType, setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppRootState, InferActionsTypes} from "./redux-store";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodoListAC,
    clearTodoData,
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


export const initialTasksState: TodoListTasksType = {};
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todoListId: string, id: string }>) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        updateTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
            state[action.payload.todoListId] = state[action.payload.todoListId].map((t) => t.id === action.payload.taskId ? {
                ...t,
                ...action.payload.model
            } : t)
        }
    },
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
            // @ts-ignore
            state[action.payload.todoListId] = action.payload.tasksList;
        });
        builder.addCase(setNewTodoListTask.fulfilled, (state, action) => {
            // @ts-ignore
            state[action.payload.task.todolistId] = [action.payload.task];
        });
    })
});

export const {removeTaskAC, updateTaskAC} = tasksSlice.actions;
export const taskReducer = tasksSlice.reducer;

export const deleteTodoListTask = (todoListId: string, taskId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksAPI.deleteTask(todoListId, taskId)
        .then(response => {
            if (response.data.resultCode === ResultCode.Success) {
                dispatch(removeTaskAC({todoListId, id: taskId}));
                dispatch(setAppStatus({status: 'succeeded'}));
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
            dispatch(setAppStatus({status: 'failed'}));
        })
};
export const updateTodoListTask = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType => async (dispatch, getState: () => AppRootState) => {
    const state = getState();
    const currentTask = state.tasks[todoListId].find(t => t.id === taskId);

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
        ...domainModel
    };

    tasksAPI.updateTask(todoListId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(updateTaskAC({todoListId, taskId, model: domainModel}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            dispatch(setAppError(e.message));
            dispatch(setAppStatus({status: 'failed'}));
        })

};

// types

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

type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
type GetAllTodoListActionType = ReturnType<typeof getAllTodoListAC>;

type ActionsTypes =
    InferActionsTypes<typeof tasksSlice.actions>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | GetAllTodoListActionType
    | SetErrorActionType
    | SetStatusActionType
    | ReturnType<typeof clearTodoData>;


type ThunkType = ThunkAction<void, AppRootState, unknown, ActionsTypes>;
