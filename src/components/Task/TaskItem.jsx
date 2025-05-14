import PropTypes from "prop-types";
import { useTodoDispatch } from "../../context/useTodoContext";
import { CheckBox } from "../CheckBox/CheckBox";
import { Button } from "../Button/Button";
import { TaskForm } from "../TaskForm";
import styles from "./Task.module.css";

export function TaskItem({ task, children }) {
    const dispatch = useTodoDispatch();

    const handleEdit = () => {
        dispatch({ type: "TOGGLE_EDIT_MODE", id: task.id });
    };

    return (
        <div className={styles.TaskItem}>
            <CheckBox task={task} />
            {task.edit ? (
                <TaskForm task={task} editContent={task.content} />
            ) : (
                <span className={styles.span}>{task.content}</span>
            )}
            <Button onClick={handleEdit}>EDIT</Button>
            {children}
        </div>
    );
}

TaskItem.propTypes = {
    task: PropTypes.object,
    children: PropTypes.node.isRequired,
}

