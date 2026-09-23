import { supabase } from "./supabase";

export async function getTableData() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error(error);
  }
  // console.log("data");
  // console.log(tasks);
  // tasks.map((data, i) => console.log(data));
  // console.log();
  return tasks;
}

export async function getId(id) {
  try {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error("encountered Problem getting ID");
    }

    return tasks;
  } catch (error) {
    ///any error throw by the try will be caught here
    throw new Error("encountered Problem getting ID");
    // console.error(error);
  }
}

// export async function inputTableData(text, checked) {
//   // let { data: tasks, error } = await supabase.from("tasks").select("*");

//   const { data, error } = await supabase
//     .from("tasks")
//     .insert([{ text: text, checked: checked }])
//     .select();

//   if (error) {
//     console.error(error);
//   }
//   // console.log("data");
//   // console.log(tasks);
//   // tasks.map((data, i) => console.log(data));
//   // console.log();
//   return data;
// }
