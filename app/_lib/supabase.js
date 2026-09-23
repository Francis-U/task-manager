import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// console.log(process.env.SUPABASE_KEY);
// console.log("supabse stuff");
export const supabase = createClient(supabaseUrl, supabaseKey);
