import { useTodoState } from "../context/useTodoContext";
import { TaskForm } from "./TaskForm";
import { Task } from "./TaskItem";


export function TaskList() {
	const tasks = useTodoState();
		
	return (
		<ul>
			{tasks.map((task) => (
				<div key={task.id}>
					{task.edit ? (
						<TaskForm
							task={task}
							editContent={task.content}
						/>
					) : (
						<Task
							task={task}
						/>
					)}
				</div>
			))}
		</ul>
	);
}
