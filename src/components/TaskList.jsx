import PropTypes from "prop-types";
import { useTodoState } from "../context/useTodoContext";
import { Task } from "./Task/Task";

export function TaskList() {
	const tasks = useTodoState();

	return (
		<ul>
			{tasks.map((task) => (
				<Task key={task.id} task={task} />
			))}
		</ul>
	);
}

function TaskDeadLine({ task }) {
	return (
		<li>{task.content}: {task.deadline}</li>
	);
}

TaskDeadLine.propTypes = {
	task: PropTypes.object.isRequired,
}
