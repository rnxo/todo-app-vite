import PropTypes from "prop-types";
import styles from "./Task.module.css";
import { MainTask } from "./MainTask";
import { SubTask } from "./SubTask";
import { useState } from "react";

export function Task({ task }) {
	const [isDisp, setIsDisp] = useState(false);
	const handleDisp = () => {
		setIsDisp(!isDisp);
	};
	const dispProp = { isDisp: isDisp, handleDisp: handleDisp };

	return (
		<div className={styles.taskContainer}>
			<MainTask task={task} dispProp={dispProp}>
				{isDisp && <SubTask subTasks={task.children} />}
			</MainTask>
		</div>
	);
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
};
