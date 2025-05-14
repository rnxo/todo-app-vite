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
