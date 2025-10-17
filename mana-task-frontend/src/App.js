import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Get tasks
  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
    .then((response) => response.json())
    .then((data) => setTasks(data))
    .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.trim()) return;
    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]))
      .catch((error) => console.error("Error adding task:", error));

      setNewTask("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial"}}>
      <h1>ManaTask</h1>
      <p>The Personal Task Manager</p>
      <div>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
