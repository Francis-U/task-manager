"use client";
// import Image from "next/image";

import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function handleClick() {
    setArr([...arr, { text: task, checked: false }]);
    setTask("");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <h2>MY TASKS</h2>
        <div className="mb-15">
          <input
            type="text"
            placeholder="input your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleClick}>Add Task</button>
        </div>
        {arr.map((item, index) => (
          <div key={index}>
            {/* (e) => setIsChecked(e.target.value) */}
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => {
                setArr(
                  arr.map((task, i) => {
                    return i === index
                      ? { ...task, checked: !task.checked }
                      : task;
                  }),
                );
              }}
            />
            {/* <span>{item.text} </span> */}
            <input
              type="text"
              name="item_text"
              value={item.text}
              disabled={editingIndex !== index}
              onChange={(e) =>
                setArr(
                  arr.map((task, i) =>
                    i === index ? { ...task, text: e.target.value } : task,
                  ),
                )
              }
            />
            <button
              className="cursor-pointer"
              onClick={() => setEditingIndex(index)}
            >
              Edit
            </button>

            <button
              className="cursor-pointer"
              onClick={() => setEditingIndex(null)}
            >
              Save
            </button>
            <button
              className="cursor-pointer"
              onClick={() => setArr(arr.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </div>
        ))}
      </main>
      {arr.map((data, i) => console.log(data))}
    </div>
  );
}
