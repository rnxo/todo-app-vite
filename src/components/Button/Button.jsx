import styles from "./Button.module.css";
import PropTypes from "prop-types";

export function Button({ onClick, children }) {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
}