import { useEffect, useState } from "react";

export default function ExperementalPage() {
  const apiUrl = "/api/";
  const [tasks, setTasks] = useState([]);
  const [onBoard, setOnBoard] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchTasks() {
      setOnBoard(true);
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!cancelled) setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setOnBoard(false);
      }
    }
    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>welcome to skyremt's experemental lab</h1>
      {onBoard && <p>LOADING...</p>}
      <ul>
        {tasks && tasks.map((task) => <li key={task.id}>{task.content}</li>)}
      </ul>
    </div>
  );
}
