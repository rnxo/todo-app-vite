import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const TodoContext = createContext();
const TodoDispatchContext = createContext();

const initSubState = [
	{ id: 11, content: "SubTask1", edit: false, },
	{ id: 12, content: "サブタスク", edit: false, },
	{ id: 13, content: "task in task", edit: false, },
];

const initState = [
	{ id: 1, content: "MainTask1", edit: false, children: initSubState },
	{ id: 2, content: "メインタスク２", edit: false, children: initSubState},
	{ id: 3, content: "make your day productively", edit: false, children: initSubState },
];

//reducer for mainTasks
const taskReducer = (tasks, action) => {
    const updateTaskRecursively = (taskList, targetId, updateFn) => {
        return taskList.map(task => {
            if (task.id === targetId) {
                return updateFn(task);
            }
            if (task.children?.length > 0) {
                return {
                    ...task,
                    children: updateTaskRecursively(task.children, targetId, updateFn)
                };
            }
            return task;
        });
    };

    switch (action.type) {
        case "TASK_ADD":
            return [...tasks, { id: tasks.length + 1, content: action.payload, edit: false }];
        case "TASK_DELETE":
            return tasks.filter(task => task.id !== action.id);
        case "TASK_EDITED":
            return updateTaskRecursively(tasks, action.payload.id, task => ({
                ...task,
                content: action.payload.content,
                edit: !task.edit
            }));
        case "TOGGLE_EDIT_MODE":
            return updateTaskRecursively(tasks, action.id, task => ({
                ...task,
                edit: !task.edit
            }));
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
