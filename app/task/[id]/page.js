import BackButton from "@/app/components/BackButton";
import CurrentPath from "@/app/components/CurrentPath";
import FilteredComponent from "@/app/components/FilteredComponent";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1>this is the id: {id}</h1>
      <BackButton />
      <CurrentPath />
      <FilteredComponent id={id} />
    </div>
  );
}

// "use client";
// import { useParams } from "next/navigation";

// export default function Page() {
//   const { id } = useParams();
//   return <div>this is the id: {id}</div>;
// }
