import { Suspense } from "react";

import ServerTaskInfo from "./components/ServerTaskInfo";
import Taskmanager from "./components/Taskmanager";
import ExternalTask from "./components/ExternalTask";
// import TableData from "./components/TableData";
import { getTableData } from "./_lib/data-service";
import TableDataProvider from "./components/TableDataProvider";

export default async function Home() {
  // const tableData = await getTableData();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <ExternalTask />
        <TableDataProvider>
          <Taskmanager />
        </TableDataProvider>

        <Suspense fallback={<p>Loading task info...</p>}>
          <ServerTaskInfo />
        </Suspense>
        {/* <TableData /> */}
      </main>
      {/* {arr.map((data, i) => console.log(data))} */}
    </div>
  );
}
