import { useContext } from "react";
import { tableDataContext } from "./TableDataProvider";

export default function TaskStats() {
  const { tableData } = useContext(tableDataContext);

  // length={tableData?.length ?? 0}

  const lengths = tableData?.length ?? 0;

  // length={tableData?.length ?? 0}

  return <div>Total tasks : {lengths}</div>;
}
