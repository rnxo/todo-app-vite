import { useTodoState } from "../context/useTodoContext";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";


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
						<TaskItem 
							task={task}
						/>
					)}
				</div>
			))}
		</ul>
	);
}
