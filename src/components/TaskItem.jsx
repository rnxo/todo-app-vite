import PropTypes from "prop-types";
import { useTodoDispatch } from "../context/useTodoContext";

export function TaskItem({ task, handleEdit}) {
	const dispatch = useTodoDispatch();
    
    return (
		<>
			<span>{task.content}</span>
			<button
				type="button"
				onClick={() => dispatch({ type: "TASK_DELETE", id: task.id })}
			>
				DONE
			</button>
			<button type="button" onClick={() => handleEdit(task)}>
				EDIT
			</button>
		</>
	);
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
}