import PropTypes from "prop-types";
import styles from "./Task.module.css";

export function SubDispButton({ isDisp, handleDisp }) {
	return (
		<button
			type="button"
			className={`${styles.showButton} ${isDisp ? styles.open : ""}`}
			onClick={handleDisp}
			aria-label={isDisp ? "Hide subtasks" : "Show subtasks"}
		>
			<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				aria-hidden="true"
				role="img"
			>
				<title>Expand/Collapse arrow</title>
				<path fill="currentColor" d="M8 5v14l11-7z" />
			</svg>
			{isDisp ? "Hide" : "Show"} Subtasks
		</button>
	);
}

SubDispButton.propTypes = {
    isDisp: PropTypes.boolean,
    handleDisp: PropTypes.func.isRequired,

}
