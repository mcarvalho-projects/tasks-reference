/*
Why this file exists:
- Minimal working React UI that calls the backend at http://localhost:5101
- Shows: state, form, list, toggle done, simple toast (no libraries)
*/

import { useEffect, useState } from "react";

const API = "http://localhost:5101";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState(false);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 900);
  }

  async function load() {
    const res = await fetch(`${API}/tasks`);
    setTasks(await res.json());
  }

  async function addTask(e) {
    e.preventDefault();

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    showToast();
    load();
  }

  async function toggleDone(id) {
    await fetch(`${API}/tasks/${id}/done`, { method: "PATCH" });
    showToast();
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Tasks</h2>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <button type="submit" disabled={!title.trim()}>
          Add
        </button>
      </form>

      {toast && <div style={{ marginTop: 8 }}>Saved!</div>}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!t.done}
                onChange={() => toggleDone(t.id)}
              />
              <span style={{ marginLeft: 8, textDecoration: t.done ? "line-through" : "none" }}>
                {t.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
