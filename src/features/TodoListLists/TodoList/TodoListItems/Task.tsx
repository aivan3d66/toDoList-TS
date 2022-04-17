import {Checkbox, IconButton, Tooltip} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, useCallback} from "react";
import {
    deleteTodoListTask, updateTodoListTask
} from "../../../../state/slices/task-reducer";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {TasksResponseType, TaskStatuses} from "../../../../api/tasks-api";

type TaskPropsType = TasksResponseType & {
    todolistId: string,
}

export const Task = React.memo((props: TaskPropsType) => {
    const {
        title,
        id,
        todolistId,
        status
    } = props;

    const taskStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 0",
        margin: "0",
        fontSize: "14px",
        borderBottom: "1px solid #bababa",
        opacity: status === TaskStatuses.Completed ? "0.4" : "",
    }

    const dispatch = useDispatch();
    const onClickHandler = useCallback(() => {
        dispatch(deleteTodoListTask({todoListId: todolistId, taskId: id}));
    }, [todolistId, id]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoListTask({todoListId: todolistId, taskId: id, domainModel: {title: newTitle}}))
    }, [todolistId, id]);
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus;
        if (e.currentTarget.checked) {
            newStatus = TaskStatuses.Completed
        } else if (!e.currentTarget.checked) {
            newStatus = TaskStatuses.New;
        }
        dispatch(updateTodoListTask({todoListId: todolistId, taskId: id, domainModel: {status: newStatus}}));
    }, [todolistId, id]);

    return (
        <li key={v1()} style={taskStyles}>
            <Checkbox
                color={"success"}
                checked={status === TaskStatuses.Completed}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan
                title={title}
                onChange={onChangeTitleHandler}
            />
            <IconButton
                onClick={onClickHandler}
                color={'default'}
                size={'small'}>
                <Tooltip title='Delete task'>
                    <DeleteIcon/>
                </Tooltip>
            </IconButton>
        </li>
    )
})
