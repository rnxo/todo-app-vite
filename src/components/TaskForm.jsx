import { useTodoDispatch } from "../context/useTodoContext";
import { useState } from "react";
import styles from "./TaskForm.module.css";
import PropTypes from 'prop-types';
import { Button } from "./Button/Button";

export function TaskForm({ task, editContent }) {
    const dispatch = useTodoDispatch();
	//state for onChange event
	const [ editText, setEditText ] = useState(editContent);
	
    const handleUpdate = (task) => {
		dispatch({ type: "TASK_EDITED", payload: { id: task.id, content: editText } });
	};

    return (
		<div className={styles.TaskForm}>
			<input
				type="text"
				value={editText}
				onChange={(e) => setEditText(e.target.value)}
			/>
			<Button onClick={() => handleUpdate(task)}>
				SAVE
			</Button>
		</div>
	);
}

TaskForm.propTypes = {
    editContent: PropTypes.string.isRequired,
	task: PropTypes.object.isRequired
};

