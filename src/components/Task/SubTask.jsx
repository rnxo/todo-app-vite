import PropTypes from "prop-types";
import styles from "./Task.module.css";
import { TaskItem } from "./TaskItem";

export function SubTask({ subTasks }) {
    return (
        <div className={styles.childrenList}>
			{ subTasks.map((subTask) => (
				<TaskItem key={subTask.id} task={subTask} />
			))}
        </div>
    );
}

SubTask.propTypes = {
    subTasks: PropTypes.array.isRequired,
}

