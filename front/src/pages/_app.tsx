import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Chakra } from '../theme/'
import '../styles/main.css'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </QueryClientProvider>
  )
}

export { getServerSideProps } from "../theme";
