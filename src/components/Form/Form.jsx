import { useState } from "react";

export function Form() {
    const [ inputValue, setInputValue ] = useState("");

    return (
        <form>
            <input 
                type="text"
                placeholder="create a new task"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            /> 
        </form>
    );
}