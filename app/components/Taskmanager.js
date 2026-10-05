"use client";
import {
  Suspense,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
// import ServerInfo from "./ServerInfo";
import TaskItem from "./TaskItem";
import TaskStats from "./TaskStats";
import TaskHeader from "./TaskHeader";
import { displayText } from "../actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { tableDataContext } from "@/app/components/TableDataProvider";
import { useDispatch, useSelector } from "react-redux";
import { on, off } from "@/app/store/TaskUISlice";
import dynamic from "next/dynamic";

function reducer(reducerState, action) {
  if (action.type === "on") {
    return { showMessage: true };
  }
  if (action.type === "off") {
    return { showMessage: false };
  }
  return reducerState;
}

const ServerInfo = dynamic(() => import("./ServerInfo")); ///nextjs lazy loading
// const ServerInfo = lazy(() => import("./ServerInfo"));///react lazy loading

export default function Taskmanager() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  // const [showMessage, setShowMessage] = useState(false);

  const { tableData, isPendingTableData, isError, error } =
    useContext(tableDataContext);

  const [reducerState, dispatch] = useReducer(reducer, {
    showMessage: false,
  });

  // const {
  //   data: tableData,
  //   isPending: isPendingTableData,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["tableData"],
  //   queryFn: getTableData,
  //   // initialData: [],
  // });

  const queryClient = useQueryClient();

  const dispatchRedux = useDispatch();
  const stateRedux = useSelector((state) => state.taskUi.showMessage);

  const inputRef = useRef(null);
  const taskRef = useRef(null);
  const router = useRouter();

  // const externalList = ExternalTask;

  // console.log("extern allist");
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
      // setShowMessage(true);
      // dispatch({ type: "on" });
      dispatchRedux(on());

      const timer = setTimeout(() => {
        // setShowMessage(false);
        // dispatch({ type: "off" });
        dispatchRedux(off());
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
          key={item.id}
          item={item}
          index={item.id}
          arr={arr}
          setArr={setArr}
          tableData={tableData}
          updateTxt={updateTxt}
          handleDelete={handleDelete}
        />
      ))}
      <TaskStats />

      {/* {reducerState.showMessage && <div>Task added</div>} */}
      {stateRedux && <div>Task added</div>}
      {state && <div>new task: {state}</div>}
      <Suspense fallback={<p>working...</p>}>
        <ServerInfo />
      </Suspense>

      <Link href="/about">About</Link>
      <nav>
        <Link href="/settings/profile">settings</Link>
      </nav>

      <button onClick={() => router.refresh()}>Refresh Tasks</button>
    </div>
  );
}
