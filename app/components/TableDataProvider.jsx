"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import getTableData from "../services/getTableData";
export const tableDataContext = createContext();

export default function TableDataProvider({ children }) {
  const {
    data: tableData,
    isPending: isPendingTableData,
    isError,
    error,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: getTableData,
    // initialData: [],
  });

  return (
    <tableDataContext.Provider
      value={{ tableData, isPendingTableData, isError, error }}
    >
      {children}
    </tableDataContext.Provider>
  );
}
