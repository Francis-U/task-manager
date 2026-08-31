"use client";
// import Image from "next/image";

import { useMemo, useState } from "react";
import TaskItem from "./components/TaskItem";
import TaskHeader from "./components/TaskHeader";
import TaskStats from "./components/TaskStats";

export default function Home() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  // let filteredTasks =[];
  const filteredTasks = useMemo(
    () =>
      arr.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()),
      ),
    [arr, search],
  );

  function handleSubmit(e) {
    e.preventDefault();
    setArr([...arr, { text: task, checked: false }]);
    setTask("");
  }

  function handleDelete(parentIndex) {
    setArr(arr.filter((_, i) => i !== parentIndex));
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <div className="mb-15">
          <TaskHeader />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="input your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button>Add Task</button>
          </form>
        </div>
        <input
          type="text"
          placeholder="search your task"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {filteredTasks.map((item, index) => (
          <TaskItem
            key={index}
            item={item}
            index={index}
            arr={arr}
            setArr={setArr}
            handleDelete={handleDelete}
          />
        ))}
        <TaskStats length={arr.length} />
      </main>
      {/* {arr.map((data, i) => console.log(data))} */}
    </div>
  );
}
