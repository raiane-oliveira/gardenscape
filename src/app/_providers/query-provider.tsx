"use client"

import { queryClient } from "@/shared/config"
import { ChildrenProps } from "@/shared/lib"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function QueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
