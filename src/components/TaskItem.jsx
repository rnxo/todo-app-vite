import PropTypes from "prop-types";
import styles from "./TaskItem.module.css";
import { useTodoDispatch } from "../context/useTodoContext";

export function TaskItem({ task }) {
	const dispatch = useTodoDispatch();
    
    return (
		<div className={styles.TaskItem}>
			<span className={styles.span}>{task.content}</span>
			<button
				type="button"
				className={styles.button}
				onClick={() => dispatch({ type: "TASK_DELETE", id: task.id })}
			>
				DONE
			</button>
			<button 
				type="button" 
				className={styles.button}
				onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE", id: task.id })}
			>
				EDIT
			</button>
		</div>
	);
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    //handleEdit: PropTypes.func.isRequired,
}