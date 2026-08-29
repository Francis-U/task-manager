"use client";
// import Image from "next/image";

import { useState } from "react";
import TaskItem from "./components/TaskItem";

export default function Home() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);

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
          <TaskItem
            key={index}
            item={item}
            index={index}
            arr={arr}
            setArr={setArr}
          />
        ))}
      </main>
      {/* {arr.map((data, i) => console.log(data))} */}
    </div>
  );
}
