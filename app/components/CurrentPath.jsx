"use client";

import { usePathname } from "next/navigation";

export default function CurrentPath() {
  const currentPath = usePathname();
  return <div>Current path: {currentPath}</div>;
}
