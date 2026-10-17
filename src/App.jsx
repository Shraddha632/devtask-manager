
import { useMemo, useState } from "react";

const initialTasks = [
  { id: 1, title: "Fix login page validation", priority: "High", completed: false },
  { id: 2, title: "Update API documentation", priority: "Medium", completed: true },
  { id: 3, title: "Improve dashboard layout", priority: "Low", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    if (filter === "Pending") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  function addTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: title.trim(),
        priority,
        completed: false,
      },
    ]);

    setTitle("");
    setPriority("Medium");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">DEVELOPER WORKSPACE</p>
          <h1>DevTask Manager</h1>
          <p className="subtitle">Plan your work. Track your progress.</p>
        </div>
        <div className="progress-card">
          <strong>{completedCount}/{tasks.length}</strong>
          <span>Tasks completed</span>
        </div>
      </header>

      <section className="panel">
        <h2>Create a task</h2>
        <form onSubmit={addTask} className="task-form">
          <input
            aria-label="Task title"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <select
            aria-label="Priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button type="submit">Add task</button>
        </form>
      </section>

      <section className="task-section">
        <div className="section-heading">
          <div>
            <h2>Your tasks</h2>
            <p>{tasks.length} tasks in your workspace</p>
          </div>

          <div className="filters" aria-label="Task filters">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter active" : "filter"}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks found for this filter.</p>
          ) : (
            filteredTasks.map((task) => (
              <article className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.title} as ${
                      task.completed ? "pending" : "completed"
                    }`}
                  />
                  <span className={task.completed ? "task-title completed" : "task-title"}>
                    {task.title}
                  </span>
                </label>

                <span className={`priority priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
