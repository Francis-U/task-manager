export async function POST(request) {
  try {
    const tableData = await getTableData();
    return Response.json(tableData);
  } catch (error) {
    throw new Error("GET REQUEST FAILED");
  }
}
