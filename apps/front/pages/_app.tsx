import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../common/styles/globals.css'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
