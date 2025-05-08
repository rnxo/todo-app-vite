import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const TodoContext = createContext();
const TodoDispatchContext = createContext();

const initState = [
	{ id: 1, content: "task 1", edit: false },
	{ id: 2, content: "テストタスク", edit: false },
	{ id: 3, content: "ultimate goal: react native", edit: false },
];

const taskReducer = (tasks, action) => {
	switch (action.type) {
		case "TASK_ADD":
			return [
				...tasks,
				{ id: tasks.length + 1, content: action.payload, edit: false },
			];
		case "TASK_DELETE":
			return tasks.filter((task) => task.id !== action.id);
		case "TASK_EDITED":
			return tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, content: action.payload.content, edit: !task.edit }
					: task,
			);
		case "TOGGLE_EDIT_MODE":
			return tasks.map((task) =>
				task.id === action.id ? { ...task, edit: !task.edit } : task,
			);
		default:
			return tasks;
	}
};

export function TodoProvider({ children }) {
	const [tasks, dispatch] = useReducer(taskReducer, initState);
	return (
		<TodoContext.Provider value={tasks}>
			<TodoDispatchContext.Provider value={dispatch}>
				{children}
			</TodoDispatchContext.Provider>
		</TodoContext.Provider>
	);
}

TodoProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { TodoContext, TodoDispatchContext };
