import PropTypes from "prop-types";
import { useState } from "react";
import { useTodoDispatch } from "../../context/useTodoContext";
import  styles  from "./CheckBox.module.css";

export function CheckBox({ task }) {
    const [ isChecked, setIsChecked ] = useState(false);
    const dispatch = useTodoDispatch();
    const handleChecked = () => {
        setIsChecked(!isChecked);
        dispatch({ type: "TASK_DELETE", id: task.id });
    }
    
    return (
        <label className={styles.checkbox_wrapper}>
            <input
                type="checkbox"
                className={styles.input}
                checked={isChecked}
                onChange={handleChecked}
            />
            <span className={styles.checkmark} />
        </label>
    );
}
CheckBox.propTypes = {
    task: PropTypes.object.isRequired,
}