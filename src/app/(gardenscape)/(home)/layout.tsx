"use client"

import { queryClient } from "@/shared/config"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
