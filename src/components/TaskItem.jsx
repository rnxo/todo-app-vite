import PropTypes from "prop-types";
import styles from "./TaskItem.module.css";
import { useTodoDispatch } from "../context/useTodoContext";
import { CheckBox } from "./CheckBox/CheckBox";

export function TaskItem({ task }) {
	const dispatch = useTodoDispatch();

	return (
		<div className={styles.TaskItem}>
			<CheckBox task={task} />
			<span className={styles.span}>{task.content}</span>
			<button
				type="button"
				className={styles.button}
				onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE", id: task.id })}
			>
				EDIT
			</button>
			{ task.children?.length > 0 && <SubTasksList subTasks={task.children}/>}
		</div>
	);
}

function SubTasksList({ subTasks }) {
	return (
		<div className={styles.childrenList}>
			<ul style={{marginLeft: '20px'}}>
				{subTasks.map((subTask) => (
					<TaskItem key={subTask.id} task={subTask} />
				))}
			</ul>
		</div>
	);
}


TaskItem.propTypes = {
	task: PropTypes.object.isRequired,
	//handleEdit: PropTypes.func.isRequired,
};

SubTasksList.propTypes = {
	subTasks: PropTypes.array.isRequired,
};
