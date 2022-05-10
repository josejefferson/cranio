import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme/config'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component
      })

    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/img/logo.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="O Crânio" />
          <meta name="keywords" content="O Crânio" />
          <meta property="og:title" content="O Crânio" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="O Crânio" />
          <meta name="robots" content="index, follow" />
          <meta property="og:locale" content="PT-BR" />
          <meta property="og:site_name" content="O Crânio" />
          <meta property="twitter:title" content="O Crânio" />
          <meta property="twitter:description" content="O Crânio" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}