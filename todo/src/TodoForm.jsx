import { useEffect, useState } from "react";

const getItems = () => {
  const items = localStorage.getItem("tasks");
  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [submitTasks, setSubmitTasks] = useState(getItems);

  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (isEditing) {
        const updatedTasks = submitTasks.map((t) =>
          t.id === editTaskId ? { ...t, text: task } : t
        );
        setSubmitTasks(updatedTasks);
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        const newTask = { id: Date.now(), text: task };
        setSubmitTasks([...submitTasks, newTask]);
      }
      setTask("");
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = submitTasks.find((t) => t.id === id);
    setTask(taskToEdit.text);
    setIsEditing(true);
    setEditTaskId(id);
  };

  const handleDelete = (id) => {
    const updatedTasks = submitTasks.filter((task) => task.id !== id);
    setSubmitTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(submitTasks));
  }, [submitTasks]);

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
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul>
        {submitTasks.length > 0 &&
          submitTasks.map(({ id, text }) => (
            <div
              key={id}
              style={{ whiteSpace: "nowrap", display: "flex", gap: "0.5rem" }}
            >
              <input type="checkbox" />
              <li>
                {text}
                <p style={{ cursor: "pointer" }} onClick={() => handleEdit(id)}>
                  Edit
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </p>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default TodoForm;
