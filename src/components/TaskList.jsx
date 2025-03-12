import { useTodoState, useTodoDispatch } from "../context/useTodoContext";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { useState } from "react";

export function TaskList() {
	const tasks = useTodoState();
	const dispatch = useTodoDispatch();
	const [editContent, setEditContent] = useState("");

	const handleEdit = (task) => {
		setEditContent(task.content);
		dispatch({ type: "TOGGLE_EDIT_MODE", id: task.id });
	};

	return (
		<ul>
			{tasks.map((task) => (
				<div key={task.id}>
					{task.edit ? (
						<TaskForm
							task={task}
							editContent={editContent}
							setEditContent={setEditContent}
						/>
					) : (
						<TaskItem 
							task={task}
							handleEdit={handleEdit}
						/>
					)}
				</div>
			))}
		</ul>
	);
}
