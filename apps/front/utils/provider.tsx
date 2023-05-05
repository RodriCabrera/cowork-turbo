'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* If the application gets complex, might consider adding devtools: */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default Providers
