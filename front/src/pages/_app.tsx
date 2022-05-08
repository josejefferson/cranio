import type { AppProps } from 'next/app'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { Chakra } from '../theme/'
import '@/styles/main.css'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
import { LoadingProvider } from '@/contexts/loading'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <Chakra cookies={pageProps.cookies}>
          <Component {...pageProps} />
        </Chakra>
      </QueryClientProvider>
    </LoadingProvider>
  )
}

export { getServerSideProps } from '../theme'