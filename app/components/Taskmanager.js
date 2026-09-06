"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ServerInfo from "./ServerInfo";
import TaskItem from "./TaskItem";
import TaskStats from "./TaskStats";
import TaskHeader from "./TaskHeader";

export default function Taskmanager() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const inputRef = useRef(null);
  const taskRef = useRef(null);

  useEffect(() => {
    taskRef.current = task;
  }, [task]);

  useEffect(() => {
    console.log("EFFECT CREATED");
    const keydownPress = () => {
      console.log("keydown pressed");
      console.log(taskRef.current);
    };
    inputRef.current.focus();

    document.body.addEventListener("keydown", keydownPress);

    return () => {
      document.body.removeEventListener("keydown", keydownPress);
    };
  }, []);

  useEffect(() => {
    const task = localStorage.getItem("tasks");
    if (task) {
      setArr(JSON.parse(task));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(arr));
  }, [arr]);

  const filteredTasks = useMemo(
    () =>
      arr.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()),
      ),
    [arr, search],
  );
  const previousLength = useRef(arr.length);

  useEffect(() => {
    if (arr.length > previousLength.current) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      previousLength.current = arr.length;
      return () => {
        clearTimeout(timer);
      };
    }

    previousLength.current = arr.length;
  }, [arr.length]);

  function handleSubmit(e) {
    e.preventDefault();
    setArr([...arr, { text: task, checked: false }]);
    setTask("");
  }

  const handleDelete = useCallback(
    (parentIndex) => {
      setArr(arr.filter((_, i) => i !== parentIndex));
    },
    [arr],
  );

  return (
    <div>
      <div className="mb-15">
        <TaskHeader />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
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

      {showMessage && <div>Task added</div>}
      <ServerInfo />
    </div>
  );
}
