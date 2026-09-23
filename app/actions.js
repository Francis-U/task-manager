"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./_lib/supabase";

// import { inputTableData } from "@/app/_lib/data-service";

export async function displayText(previousState, formData) {
  const taskk = formData.get("task");

  if (!taskk) {
    return "Task cannot be empty !!!";
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ text: taskk, checked: false }])
    .select();

  if (error) {
    console.error(error);
  }
  revalidatePath("/");

  // console.log("Task received on server: " + taskk);
  return "Task received successfully !!!";
}

export async function updateTxt(previousState, formData) {
  // console.log("formData");
  // console.log(formData);

  const id = formData.get("id");
  const text = formData.get("text");

  const { data, error } = await supabase
    .from("tasks")
    .update({ text: text })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("failed to update tasks");
    return;
  }

  revalidatePath("/");
  return "update successful";
}

export async function deleteTask(formData) {
  // console.log("formData");
  // console.log(formData);

  const id = formData.get("id");
  // const text = formData.get("text");
  // console.log("formdata");
  // console.log(formData);
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  return "Delete successful";
}

export async function updateCheckbox(previousState, formData) {
  // console.log("formData");
  // console.log(formData);

  const id = formData.get("id");
  // const checkbox = formData.get("checkbox") ? formData.get("checkbox") : null;
  //simpler as below formData.get("checkbox"); already returns null when no checkbox
  // const checkbox = formData.get("checkbox");

  // console.log(checkbox);
  const checked = formData.get("checkbox") === "on";
  // console.log(checkboxValue);

  const { data, error } = await supabase
    .from("tasks")
    .update({ checked }) ///same as  .update({  checked: checked  })
    .eq("id", id)
    .select();

  ////easier way
  // const checked = formData.get("checked") !== null;
  //   const { error } = await supabase
  //   .from("tasks")
  //   .update({ checked })
  //   .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  return "Checkbox update successful";
}
