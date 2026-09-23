"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  // <QueryClientProvider client={queryClient}>

  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
}
