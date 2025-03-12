import { useTodoDispatch } from "../context/useTodoContext";
import PropTypes from 'prop-types';

export function TaskForm({ task, editContent, setEditContent}) {
    const dispatch = useTodoDispatch();
    
    const handleUpdate = (task) => {
		dispatch({ type: "TASK_EDIT", payload: { id: task.id, content: editContent } });
	};

    return (
		<>
			<input
				type="text"
				value={editContent}
				onChange={(e) => setEditContent(e.target.value)}
			/>
			<button type="button" onClick={() => handleUpdate(task)}>
				SAVE
			</button>
		</>
	);
}

TaskForm.propTypes = {
    editContent: PropTypes.string.isRequired,
    setEditContent: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

