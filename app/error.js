"use client";

import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();
  // console.err(error);
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>

      {/* <p className="text-lg">{JSON.stringify(error, null, 2)}</p> */}
      <p className="text-lg">Please contact the administrator</p>
      <p className="text-lg bg-red-100">💥⛔{error?.message}💥</p>
      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={() => router.push("/")}
      >
        Back to homepage
      </button>
      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again!!
      </button>
    </main>
  );
}
