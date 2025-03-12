import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';

const TodoContext = createContext();
const TodoDispatchContext = createContext();

const initState = [
	{ id: 1, content: "for frontend: react.js", edit: false },
	{ id: 2, content: "for backend: python FastAPI", edit: false },
	{ id: 3, content: "ultimate goal: react.js + FastAPI", edit: false },
];

const taskReducer = (tasks, action) => {
	switch (action.type) {
		case "TASK_ADD":
			return [...tasks, { id: tasks.length + 1, content: action.payload, edit: false }];
		case "TASK_DELETE":
			return tasks.filter((_task) => _task.id !== action.id);
		case "TASK_EDIT":
			return tasks.map((task) => 
				task.id === action.payload.id ? { ...task, content: action.payload.content, edit: !task.edit } : task
			);
		case "TOGGLE_EDIT_MODE":
			return tasks.map((task) => 
				task.id === action.id ? { ...task, edit: !task.edit } : task
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
