import { getTableData } from "@/app/_lib/data-service";

export default async function TableData() {
  const tableData = await getTableData();
  // console.log("tableData");
  // console.log(tableData);

  return (
    <table>
      <tbody>
        {tableData.map((td, i) => (
          <tr key={i}>
            <td>{td.id}</td>
            <td>{td.created_at}</td>
            <td>{td.text}</td>
            <td>{td.checked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
