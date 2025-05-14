import PropTypes from "prop-types";
import { TaskItem } from "./TaskItem";
import { SubDispButton } from "./SubDispButton";

export function MainTask({ task, children, dispProp }) {
	return (
		<div>
			<TaskItem task={task}>
				<SubDispButton
					isDisp={dispProp.isDisp}
					handleDisp={dispProp.handleDisp}
				/>
			</TaskItem>
			{children}
		</div>
	);
}

MainTask.propTypes = {
	task: PropTypes.object,
	dispProp: PropTypes.object,
	children: PropTypes.node.isRequired,
};
