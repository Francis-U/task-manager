"use client";

////my version

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useActionState, useEffect, useRef, useState } from "react";
import { updateTxt, deleteTask, updateCheckbox } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function TaskItem({ item, index, arr, setArr, handleDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const router = useRouter();
  function handleClick() {
    editingIndex == null ? setEditingIndex(index) : setEditingIndex(null);
  }

  console.log("handleDelete:", handleDelete);

  const [state, formAction, isPending] = useActionState(updateTxt, "");
  const [stateCheckbox, formActionCheckbox, isPendingCheckbox] = useActionState(
    updateCheckbox,
    "",
  );
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: IsPendingmutate,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteTask,
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tableData"] }),
    // the above is now handled with onSettled

    // onError: (error) => console.error("Failed to delete task:", error),
    /// the above is used when you want something done if error happens
    // So onError is mainly for side effects like alerts, toasts, logging, etc.

    onMutate: async (newData) => {
      const newId = newData.get("id");

      ///cancel running queries
      await queryClient.cancelQueries({ queryKey: ["tableData"] });
      ////snapshot previousData
      const previousData = queryClient.getQueryData(["tableData"]);

      ///optimistic update
      queryClient.setQueryData(["tableData"], (currentTableData) => {
        // console.log("on mutate called");
        // console.log(newId);

        return currentTableData.filter((td) => td.id !== Number(newId));
        // console.log(tableData);
      });
      // queryClient.setQueryData(["tableData"], (tableData) => {
      //   const updated = tableData.filter((td) => td.id !== newId);
      //   console.log("OPTIMISTIC DATA:", updated);
      //   return updated;
      // });
      ///return context
      return { previousData };
    },

    onError: (error, newData, context) => {
      ////rollback the optimistic update
      if (context?.previousData) {
        queryClient.setQueryData(["tableData"], context.previousData);
      }

      ///show error
      toast.error(`an error occurred: ${error.message}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tableData"] }),
  });

  // console.log("state");
  // console.log(state);

  useEffect(() => {
    if (!isPending && state) {
      queryClient.invalidateQueries({ queryKey: ["tableData"] });
    }
  }, [state, isPending, queryClient]);

  useEffect(() => {
    if (!isPendingCheckbox && stateCheckbox) {
      queryClient.invalidateQueries({ queryKey: ["tableData"] });
    }
  }, [stateCheckbox, isPendingCheckbox, queryClient]);

  useEffect(() => {
    if (state === "Update successful") {
      setEditingIndex(null);
    }
  }, [state]);

  const formRef = useRef(null);
  console.log("TaskItem rendered:", item.id);
  return (
    <div>
      {/* (e) => setIsChecked(e.target.value) */}

      {/* const [stateCheckbox, formActionCheckbox, isPendingCheckbox] = useActionState(
    updateCheckbox,
    "",
  ); */}
      <form ref={formRef} action={formActionCheckbox}>
        <input type="hidden" name="id" value={item.id} />

        <input
          type="checkbox"
          checked={item.checked}
          // value={(e) => e.target.value}
          name="checkbox"
          // onChange={() => {
          //   setArr(
          //     arr.map((task, i) => {
          //       return i === index ? { ...task, checked: !task.checked } : task;
          //     }),
          //   );
          // }}
          onChange={() => formRef.current.requestSubmit()}
        />
      </form>

      {/* <span>{item.text} </span> */}
      <form action={formAction}>
        {/* async function handleSave() {
    await updateTxt(item.id, item.text);
    setEditingIndex(null);
  } */}
        <input type="hidden" name="id" value={item.id} />
        <input
          type="text"
          name="text"
          defaultValue={item.text}
          disabled={editingIndex !== index}
          // onChange={(e) =>
          //   setArr(
          //     arr.map((task, i) =>
          //       i === index ? { ...task, text: e.target.value } : task,
          //     ),
          //   )
          // }
        />
        <button type="button" onClick={handleClick}>
          Edit
        </button>

        <button
          type="submit"
          hidden={editingIndex !== index}
          disabled={isPending}
        >
          {isPending ? "saving" : "save"}
        </button>
        {/* {editingIndex !== index ? (
          <button
            type="button"
            className="cursor-pointer"
            // onClick={(e) => {
            //   // e.preventDefault();
            //   handleClick();
            // }}

            onClick={handleClick}
          >
            Edit
          </button>
        ) : (
          <button
            className="cursor-pointer"
            type="submit"
            // onClick={() => setEditingIndex(null)}
          >
            Save
          </button>
        )} */}
      </form>
      {/* action={mutate} */}
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   const formData = new FormData(e.currentTarget);
        //   mutate(formData);
        // }}
        action={mutate}
      >
        <input type="hidden" name="id" value={item.id} />
        {isError && <div>An error occurred: {error.message}</div>}
        <button
          className="cursor-pointer"
          type="submit"
          // onClick={() => setArr(arr.filter((_, i) => i !== index))}
          // onClick={() => handleDelete(index)}
        >
          {IsPendingmutate ? "Deleting..." : "Delete"}
        </button>
      </form>
      <Link href={`/task/${item.id}/?filter=completed&sort=latest`}>
        Navigate to task with filter
      </Link>
      <button onClick={() => router.push(`/task/${item.id}/`)}>
        Navigate to task
      </button>
      <button onClick={() => router.replace(`/task/${item.id}/`)}>
        Replace with task
      </button>
      <button
        onClick={() => setArr([...arr, { id: Date.now(), text: "Test task" }])}
      >
        Change arr
      </button>
    </div>
  );
}
export default memo(TaskItem);
