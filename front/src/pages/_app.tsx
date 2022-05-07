import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Chakra } from '../theme/'
import '../styles/main.css'
import Loading from '../components/Loading'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()
import { useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} setLoading={setLoading} />
        <Loading loading={loading} />
      </Chakra>
    </QueryClientProvider>
  )
}

export { getServerSideProps } from "../theme";
