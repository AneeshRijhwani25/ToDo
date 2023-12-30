
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { status } = useSession();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const tasks = await res.json();
        setMainTask(tasks || []);
      } else {
        console.error("Failed to fetch tasks");
        // alert("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
      // alert("Error fetching tasks");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (status !== "authenticated") {
      alert("Login First");
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: desc,
        }),
      });

      if (res.ok) {
        fetchTasks();
        setTitle("");
        setDesc("");
      } else {
        console.error("Failed to create task");
        // alert("Failed to create task");
      }
    } catch (error) {
      console.error("Failed to create task", error);
      // alert("Failed to create task");
    }
  };

  const deleteHandler = async (taskId) => {
    console.log(taskId)
    try {
      const res = await fetch(`/api/tasks/?taskId=${taskId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setMainTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        fetchTasks();
      } else {
        console.error("Error deleting task");
        // alert("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
      // alert("Error deleting task");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchTasks();
    }
  }, [status]);

  let renderTask = (
    <h2 className="font-bold text-xl text-red-500">No Task Available</h2>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t) => (
      <li key={t.id} className="flex items-center justify-between mb-5">
        <div className="flex items-center justify-between w-2/3 mb-5 dark:text-black">
          <h5 className="text-2xl font-semibold">{t.title}</h5>
          <h6 className="text-xl font-semibold">{t.description}</h6>
        </div>
        <button
          onClick={() => deleteHandler(t.id)}
          className="bg-red-400 text-white px-4 py-2 rounded font-bold"
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <section>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-4 border-zinc-800 m-8 px-4 py-2"
          placeholder="Enter task here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-4 border-zinc-800 m-8 px-4 py-2"
          placeholder="Enter Description here.."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          Add task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </section>
  );
};

export default Page;
