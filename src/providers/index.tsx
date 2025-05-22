"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode,
}

export function Providers({ children }: ProvidersProps) {

  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}