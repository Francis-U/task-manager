"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  // return <button onClick={() => router.back()}>Go Back</button>; Replace with About
  return (
    <div>
      <button onClick={() => router.push("/")}>Go Back</button>
      <button onClick={() => router.replace("/about")}>
        Replace with About
      </button>
    </div>
  );
}
