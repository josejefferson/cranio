import type { AppProps } from 'next/app'
import { Chakra } from '../theme/'
import '@/styles/main.css'
import { LoadingProvider } from '@/contexts/loading'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </LoadingProvider>
  )
}

export { getServerSideProps } from '../theme'