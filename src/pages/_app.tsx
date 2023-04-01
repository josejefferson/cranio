import type { AppProps } from 'next/app'
import { Chakra } from '../theme/'
import '@/styles/main.css'
import { LoadingProvider } from '@/contexts/loading'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
      })
    }
  })

  return (
    <LoadingProvider>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </LoadingProvider>
  )
}

export { getServerSideProps } from '../theme'
