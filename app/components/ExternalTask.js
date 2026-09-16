export default async function ExternalTask() {
  const json = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    // next: {
    //   revalidate: 10,
    // },

    cache: "no-store",
  }).then((response) => response.json());

  return <div>{json.title}</div>;
  // return <div>ExternalTask</div>;
}
