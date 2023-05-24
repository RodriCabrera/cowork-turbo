import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../common/styles/globals.css'

import { BaseLayout } from '@/common/Layout/BaseLayout'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available, else use the BaseLayout
  const getLayout =
    Component.getLayout ??
    ((page) => <BaseLayout admin={undefined}>{page}</BaseLayout>)
  // NOTE: Might need to remove this getLayout implementation and use custom layouts per page
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
