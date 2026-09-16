"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilteredComponent({ id }) {
  const [item, setItem] = useState([]);
  const [display, setDisplay] = useState([]);
  const searchedParam = useSearchParams();
  const searchQuery = searchedParam.get("filter");
  const sortQuery = searchedParam.get("sort");
  const router = useRouter();
  const currentPath = usePathname();
  // const handleSetItem = useCallback((arr) => {
  //   setItem([arr]);
  // }, []);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem("tasks"));

    if (task) {
      // console.log("task");
      // console.log(localStorage);
      // console.log(task);
      // setItem(JSON.parse(task));
      if (searchQuery === "completed") {
        setItem(task.filter((item, i) => item.checked == true));
        // setItem([...item, task.filter((item, i) => item.checked == true)]);
        // task.filter((item, i) => item.checked == true);
      } else if (searchQuery === "all") {
        setItem(task);
        // handleSetItem(task);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem("tasks"));
    setDisplay(task.filter((tk, i) => i === Number(id)));
    // console.log(task);
  }, [id]);
  return (
    <div>
      <p>current filter: {searchQuery}</p>
      <p>current sort: {sortQuery}</p>
      {item.map((itm, i) => (
        <p key={i}>{itm.text}</p>
      ))}
      {/* {display.map((itm, i) => (
        <div key={i}>
          {" "}
          <span>displayed text </span> {itm.text}
        </div>
      ))} */}
      {display.map((itm, i) => (
        <div key={i}>
          {" "}
          <span>displayed text </span> {itm.text}
        </div>
      ))}
      <button
        onClick={() =>
          router.replace(`${currentPath}?filter=all&sort=${sortQuery}`)
        }
      >
        Show all
      </button>
      <button
        onClick={() =>
          router.push(`${currentPath}?filter=completed&sort=${sortQuery}`)
        }
      >
        Show Completed
      </button>
    </div>
  );
}
