"use server";

export async function displayText(previousState, formData) {
  const taskk = formData.get("task");

  if (!taskk) {
    return "Task cannot be empty !!!";
  }

  // console.log("Task received on server: " + taskk);
  return "Task received successfully !!!";
}
