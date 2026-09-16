"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

function TaskItem({ item, index, arr, setArr, handleDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const router = useRouter();
  function handleClick() {
    editingIndex == null ? setEditingIndex(index) : setEditingIndex(null);
  }

  return (
    <div>
      {/* (e) => setIsChecked(e.target.value) */}
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          setArr(
            arr.map((task, i) => {
              return i === index ? { ...task, checked: !task.checked } : task;
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

      <button className="cursor-pointer" onClick={() => handleClick()}>
        {editingIndex !== index ? "Edit" : "Save"}
      </button>

      <button
        className="cursor-pointer"
        // onClick={() => setArr(arr.filter((_, i) => i !== index))}
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
      <Link href={`/task/${index}/?filter=completed&sort=latest`}>
        Navigate to task with filter
      </Link>
      <button onClick={() => router.push(`/task/${index}/`)}>
        Navigate to task
      </button>
      <button onClick={() => router.replace(`/task/${index}/`)}>
        Replace with task
      </button>
    </div>
  );
}
export default memo(TaskItem);
