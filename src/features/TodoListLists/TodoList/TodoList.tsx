import React, {useCallback, useEffect} from "react";
import {ChangeFilter, ChangeTodoListTitleType, RemoveTodoList} from "../TodoListsList";
import {FILTERS} from "../../../common/constants";
import '../../../app/App.css';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";
import {AppRootState} from "../../../state/redux-store";
import {taskReducerThunks} from "../../../state/slices/task-reducer";
import {FilterValueType, TodoListDomainType} from "../../../state/slices/todolist-reducer";
import {TasksResponseType, TaskStatuses} from "../../../api/tasks-api";
import {TodoListTasks} from "./TodoListItems/TodoListTasks";
import {useActions} from "../../../utils/helpers";

export type TodoListProps = {
    todoList: TodoListDomainType,
    filter: FilterValueType,
    changeFilter: ChangeFilter,
    removeTodoList: RemoveTodoList,
    changeTodoListTitle: ChangeTodoListTitleType
    demo?: boolean,
};

const todoListBtnWrapperStyles = {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto 0 0 0",
}

export const TodoList: React.FC<TodoListProps> = React.memo(({demo = false, ...props}) => {
        console.log('TodoList called');

        const {
            todoList,
            filter,
            changeTodoListTitle,
            removeTodoList,
            changeFilter,
        } = props;

        const tasks = useSelector<AppRootState, Array<TasksResponseType>>(state => state.tasks[todoList.id])
        const {getAllTodoListTasks, setNewTodoListTask} = useActions(taskReducerThunks);

        useEffect(() => {
            if (demo) {
                return
            }
            getAllTodoListTasks({todoListId: todoList.id})
        }, [todoList.id])

        const onChangeTodoListTitle = useCallback((title: string) => {
            changeTodoListTitle(todoList.id, title)
        }, [changeTodoListTitle, todoList.id]);
        const onRemoveListHandler = () => {
            removeTodoList(todoList.id);
        };

        const addTaskHandler = useCallback((title: string) => {
            setNewTodoListTask({todoListId: todoList.id, title});
        }, [todoList.id, setNewTodoListTask]);

        let taskForTodoList = tasks;

        if (filter === FILTERS.ACTIVE) {
            taskForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (filter === FILTERS.COMPLETED) {
            taskForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        const onAllFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.ALL), [todoList.id, FILTERS.ALL, changeFilter]);
        const onActiveFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.ACTIVE), [todoList.id, FILTERS.ACTIVE, changeFilter]);
        const onCompletedFilterHandler = useCallback(() => changeFilter(todoList.id, FILTERS.COMPLETED), [todoList.id, FILTERS.COMPLETED, changeFilter]);

        const getActiveBtnClassName = (filterValue: FilterValueType) => {
            return filter === filterValue ? 'contained' : 'outlined';
        };
        const getCurrentDate = (value: string) => {
            const setCurrentDate = new Date(value);
            return `Added date: ${setCurrentDate.toUTCString()}`
        }
        const date = getCurrentDate(props.todoList.addedDate)


        return (
            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minHeight: "400px"
            }}>
                <span style={{
                    position: "absolute",
                    top: "-40px",
                    left: "-15px",
                    fontSize: "12px",
                    color: "#b2b2b2"
                }}>
                     {date}
                </span>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "40px",
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    lineHeight: "16px",
                    fontWeight: "bold",
                    fontFamily: "Noto Sans, sans-serif"
                }}>
                    <EditableSpan title={todoList.title} onChange={onChangeTodoListTitle}/>
                    <Tooltip title="Delete this todolist">
                        <IconButton
                            onClick={onRemoveListHandler}
                            color={'default'}
                            size={'small'}
                            disabled={todoList.entityStatus === 'loading'}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>

                </div>
                <AddItemForm
                    addTask={addTaskHandler}
                    loading={todoList.entityStatus === 'loading'}
                    disabled={todoList.entityStatus === 'loading'}
                />

                <TodoListTasks
                    tasks={taskForTodoList}
                    todoListID={todoList.id}
                />

                <div style={todoListBtnWrapperStyles}>
                    <Button
                        variant={getActiveBtnClassName(FILTERS.ALL)}
                        onClick={onAllFilterHandler}
                        size={'small'}
                    >
                        All
                    </Button>
                    <Button
                        variant={getActiveBtnClassName(FILTERS.ACTIVE)}
                        onClick={onActiveFilterHandler}
                        size={'small'}
                    >
                        Active
                    </Button>
                    <Button
                        variant={getActiveBtnClassName(FILTERS.COMPLETED)}
                        onClick={onCompletedFilterHandler}
                        size={'small'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        )
    }
)
