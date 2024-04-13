"use client"

import { ChildrenProps } from "@/core/types/children-props"
import { Header } from "./components/header"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/lib/react-query"

export default function AppLayout({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Header />

        {children}
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
