import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const TodoContext = createContext();
const TodoDispatchContext = createContext();

// メインタスクとサブタスクでIDの範囲を分ける
const generateId = {
    main: (tasks) => tasks.length + 1,
    sub: (parentId, subTasks) => Number.parseInt(`${parentId}${subTasks.length + 1}`),
};

const initSubState = (parentId) => [
    { id: generateId.sub(parentId, []), content: "SubTask1", edit: false },
    { id: generateId.sub(parentId, [1]), content: "サブタスク", edit: false },
    { id: generateId.sub(parentId, [1, 2]), content: "task in task", edit: false },
];

const initState = [
    { id: 1, content: "MainTask1", edit: false, children: initSubState(1) },
    { id: 2, content: "メインタスク２", edit: false, children: initSubState(2) },
    { id: 3, content: "make your day productively", edit: false, children: initSubState(3) },
];

const taskReducer = (tasks, action) => {
    const updateTaskRecursively = (taskList, targetId, updateFunc) => {
        return taskList.map(task => {
            if (task.id === targetId) {
                return updateFunc(task);
            }
            if (task.children?.length > 0) {
                return {
                    ...task,
                    children: updateTaskRecursively(task.children, targetId, updateFunc)
                };
            }
            return task;
        });
    };

    switch (action.type) {
        case "TASK_ADD":
            return [...tasks, { 
                id: generateId.main(tasks), 
                content: action.payload, 
                edit: false,
                children: [] 
            }];
        case "SUBTASK_ADD":
            return tasks.map(task => {
                if (task.id === action.payload.parentId) {
                    return {
                        ...task,
                        children: [...task.children, {
                            id: generateId.sub(task.id, task.children),
                            content: action.payload.content,
                            edit: false
                        }]
                    };
                }
                return task;
            });
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
