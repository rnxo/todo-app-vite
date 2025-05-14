import { useTodoDispatch } from "../context/useTodoContext";
import { useState } from "react";
import styles from "./TaskForm.module.css";
import PropTypes from 'prop-types';
import { Button } from "./Button/Button";

export function TaskForm({ task, editContent }) {
    const dispatch = useTodoDispatch();
    const [editText, setEditText] = useState(editContent);
    
    const handleUpdate = (e) => {
        e?.preventDefault(); // イベントが存在する場合のみpreventDefault
        dispatch({ type: "TASK_EDITED", payload: { id: task.id, content: editText } });
    };

    return (
        <form onSubmit={handleUpdate} className={styles.TaskForm}>
            <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
            />
            <Button type="submit">
                SAVE
            </Button>
        </form>
    );
}

TaskForm.propTypes = {
    editContent: PropTypes.string.isRequired,
	task: PropTypes.object.isRequired
};

