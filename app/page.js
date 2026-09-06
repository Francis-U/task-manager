import { Suspense } from "react";

import ServerTaskInfo from "./components/ServerTaskInfo";
import Taskmanager from "./components/Taskmanager";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <Taskmanager />
        <Suspense fallback={<p>Loading task info...</p>}>
          <ServerTaskInfo />
        </Suspense>
      </main>
      {/* {arr.map((data, i) => console.log(data))} */}
    </div>
  );
}
