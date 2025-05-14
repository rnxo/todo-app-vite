import { useState } from "react";
import { useTodoDispatch } from "../../context/useTodoContext";
import { useTodoState } from "../../context/useTodoContext";
import styles from "./Form.module.css";

export function Form() {
    const [inputValue, setInputValue] = useState("");
    const [selectedParentId, setSelectedParentId] = useState("");
    const dispatch = useTodoDispatch();
    const tasks = useTodoState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim()) {
            if (selectedParentId) {
                dispatch({ 
                    type: "SUBTASK_ADD", 
                    payload: {
                        content: inputValue,
                        parentId: Number.parseInt(selectedParentId)
                    }
                });
            } else {
                dispatch({ type: "TASK_ADD", payload: inputValue });
            }
            setInputValue("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                type="text"
                placeholder={`Create a ${selectedParentId ? 'sub' : 'main'} task...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.input}
            />
            <select 
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className={styles.select}
            >
                <option value="">Add as main task</option>
                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        Add as subtask to: {task.content}
                    </option>
                ))}
            </select>
            <button type="submit" className={styles.button}>
                Add Task
            </button>
        </form>
    );
}