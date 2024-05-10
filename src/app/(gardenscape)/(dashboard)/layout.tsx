"use client"

import { ChildrenProps } from "@/shared/lib"
import { Header } from "@/widgets/dashboard"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/shared/config"

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
