"use client";

import { useState } from "react";

export default function TaskItem({ item, index, arr, setArr }) {
  const [editingIndex, setEditingIndex] = useState(null);

  function handleClick() {
    editingIndex == null ? setEditingIndex(index) : setEditingIndex(null);
  }

  return (
    <div key={index}>
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
        onClick={() => setArr(arr.filter((_, i) => i !== index))}
      >
        Delete
      </button>
    </div>
  );
}
