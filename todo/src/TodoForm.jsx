import { useState } from "react";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [submitTask, setSubmitTask] = useState([]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    setSubmitTask([...submitTask, task]);
    setTask("");
  };

  const handleEdit = (task) => {};

  const handleDelete = (todo) => {
    const updatedTasks = submitTask.filter((task) => task !== todo);
    setSubmitTask(updatedTasks);
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      <form
        style={{ display: "flex", gap: "1rem" }}
        onSubmit={handleTaskSubmit}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          style={{ whiteSpace: "nowrap", padding: "0.5rem" }}
        >
          Add Task
        </button>
      </form>
      <ul>
        {submitTask &&
          submitTask.length > 0 &&
          submitTask.map((task, index) => {
            return (
              <div
                key={index}
                style={{ whiteSpace: "nowrap", display: "flex", gap: "0.5rem" }}
              >
                <input type="checkbox" />
                <li>
                  {task}
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </p>
                </li>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default TodoForm;
