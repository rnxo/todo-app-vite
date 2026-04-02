import PropTypes from "prop-types";
import { useTodoDispatch } from "../../context/useTodoContext";
import  styles  from "./CheckBox.module.css";

export function CheckBox({ task }) {
    const dispatch = useTodoDispatch();
    const handleChecked = () => {
        dispatch({ type: "TASK_COMPLETE", id: task.id });
    }

    return (
        <label className={styles.checkbox_wrapper}>
            <input
                type="checkbox"
                className={styles.input}
                checked={task.completed}
                onChange={handleChecked}
            />
            <span className={styles.checkmark} />
        </label>
    );
}
CheckBox.propTypes = {
    task: PropTypes.object.isRequired,
}