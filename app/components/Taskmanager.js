"use client";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ServerInfo from "./ServerInfo";
import TaskItem from "./TaskItem";
import TaskStats from "./TaskStats";
import TaskHeader from "./TaskHeader";
import { displayText } from "../actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getTableData from "@/app/services/getTableData";

export default function Taskmanager() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const {
    data: tableData,
    isPending: isPendingTableData,
    isError,
    error,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: getTableData,
    // initialData: [],
  });

  // if (condition) {
  // }

  // console.log("tableData");
  // console.log(tableData);

  const inputRef = useRef(null);
  const taskRef = useRef(null);
  const router = useRouter();
  // const externalList = ExternalTask;

  // console.log("externallist");
  // console.log(externalList);
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
      (tableData ?? []).filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()),
      ),
    [tableData, search],
  );
  const previousLength = useRef(tableData?.length ?? 0);

  useEffect(() => {
    if (tableData?.length > previousLength.current) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      previousLength.current = tableData?.length;
      return () => {
        clearTimeout(timer);
      };
    }

    previousLength.current = tableData?.length;
  }, [tableData?.length]);

  function handleSubmit(e) {
    // e.preventDefault();
    // setArr([...arr, { text: task, checked: false }]);
    setTask("");
  }

  const handleDelete = useCallback(
    (parentIndex) => {
      setArr(arr.filter((_, i) => i !== parentIndex));
    },
    [arr],
  );

  async function updateTxt(index, textValue) {
    // console.log(index,textValue)
    prompt(`index ${index} ${textValue}`);
  }

  const [state, formAction, isPending] = useActionState(displayText, "");
  // console.log(formAction);
  // console.log(displayText);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPending && state) {
      queryClient.invalidateQueries({ queryKey: ["tableData"] });
    }
  }, [isPending, state, queryClient]);

  return (
    <div>
      <div className="mb-15">
        <TaskHeader />
        <form onSubmit={handleSubmit} action={formAction}>
          <input
            type="text"
            ref={inputRef}
            placeholder="input your task"
            value={task}
            name="task"
            onChange={(e) => setTask(e.target.value)}
          />
          <button disabled={isPending}>
            {isPending ? "Submitting" : "Add Task"}
          </button>
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
          index={item.id}
          arr={arr}
          setArr={setArr}
          tableData={tableData}
          updateTxt={updateTxt}
          handleDelete={handleDelete}
        />
      ))}
      <TaskStats length={tableData?.length ?? 0} />

      {showMessage && <div>Task added</div>}
      {state && <div>new task: {state}</div>}
      <ServerInfo />

      <Link href="/about">About</Link>
      <nav>
        <Link href="/settings/profile">settings</Link>
      </nav>

      <button onClick={() => router.refresh()}>Refresh Tasks</button>
    </div>
  );
}
