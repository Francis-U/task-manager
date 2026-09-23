import { getTableData } from "@/app/_lib/data-service";

export async function GET() {
  try {
    const tableData = await getTableData();
    return Response.json(tableData);
  } catch (error) {
    throw new Error("GET REQUEST FAILED");
  }
}
