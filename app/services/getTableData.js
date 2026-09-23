export default async function getTableData() {
  const response = await fetch("/api/task");

  if (!response.ok) {
    throw new Error("fetch failed");
  }
  const data = await response.json();

  return data;
}
