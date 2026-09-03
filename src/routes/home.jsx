import { Form } from "../components/Form/Form";
import { TaskList } from "../components/TaskList";
import { TodoProvider } from "../context/TodoProvider";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <TodoProvider>
      <div className="flex justify-between items-center">
        <h2>Todo Application</h2>
        <Link to="/exp">go to experemental page</Link>
      </div>
      <Form />
      <TaskList />
    </TodoProvider>
  );
}
