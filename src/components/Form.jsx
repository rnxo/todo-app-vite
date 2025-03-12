import { useState } from "react";
import { useTodoDispatch } from "../context/useTodoContext";

export function Form() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useTodoDispatch();

    const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
			dispatch({ type: "TASK_ADD", payload: inputValue });
			setInputValue("");
		}
	};

    return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="create a new task"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button type="submit">ADD</button>
		</form>
	);
}
