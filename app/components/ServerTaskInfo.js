export default async function ServerTaskInfo() {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return <div>Task fetched on the server</div>;
}
