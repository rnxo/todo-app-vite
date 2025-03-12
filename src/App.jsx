import "./App.css";
import { Form } from "./components/Form";
import { TaskList } from "./components/TaskList";
import { TodoProvider } from "./context/TodoProvider";

export default function App() {
	return (
		<TodoProvider>
			<Form />
			<TaskList />
		</TodoProvider>
	);
}
