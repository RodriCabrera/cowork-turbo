import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../common/styles/globals.css'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BASEBLOOM</title>
        <meta name="description" content="BASEBLOOM" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
