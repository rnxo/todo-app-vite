import PropTypes from "prop-types";
import styles from "./TaskItem.module.css";
import { useTodoDispatch } from "../context/useTodoContext";
import { CheckBox } from "./CheckBox/CheckBox";
import { Button } from "./Button/Button"
import { useState } from "react";

export function Task({ task }) {
	return (
		<MainTaskItem mainTask={task} />
	);
}

function TaskItem({ task }) {
	const dispatch = useTodoDispatch();

	return (
		<div className={styles.TaskItem}>
			<CheckBox task={task} />
			<span className={styles.span}>{task.content}</span>
			<Button onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE", id: task.id})}>
				EDIT
			</Button>
		</div>
	);
}

function MainTaskItem({ mainTask }) {
    const [isDisp, setIsDisp] = useState(false);
	const dispatch = useTodoDispatch();
    const handleDisp = () => {
        setIsDisp(!isDisp);
    };

    return (
        <div className={styles.mainTaskContainer}>
            <div className={styles.TaskItem}>
                <CheckBox task={mainTask} />
                <span className={styles.span}>{mainTask.content}</span>
                <Button 
                    type="edit"
                    onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE", id: mainTask.id })}
                >
                    EDIT
                </Button>
                {mainTask.children?.length > 0 && (
                    <button 
                        type="button"
						className={`${styles.showButton} ${isDisp ? styles.open : ''}`}
                        onClick={handleDisp}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                        {isDisp ? 'Hide' : 'Show'} Subtasks
                    </button>
                )}
            </div>
            {isDisp && <SubTaskItem subTasks={mainTask.children} />}
        </div>
    );
}

function SubTaskItem({ subTasks }) {
    return (
        <div className={styles.childrenList}>
            {subTasks.map((subTask) => (
                <TaskItem key={subTask.id} task={subTask} />
            ))}
        </div>
    );
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
}

TaskItem.propTypes = {
	task: PropTypes.object.isRequired,
	//handleEdit: PropTypes.func.isRequired,
};

MainTaskItem.propTypes = {
	mainTask: PropTypes.object.isRequired,
	//handleEdit: PropTypes.func.isRequired,
};


SubTaskItem.propTypes = {
	subTasks: PropTypes.array.isRequired,
};
