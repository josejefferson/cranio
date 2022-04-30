import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import { ColorModeScript } from '@chakra-ui/react';
import theme from '../theme/config'
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })

    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/img/logo.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content={"EPICE " + new Date().getFullYear()} />
          <meta name="keywords" content={"EPICE " + new Date().getFullYear()} />
          <meta property="og:title" content={"EPICE " + new Date().getFullYear()} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://epice-app.vercel.app/" />
          <meta property="og:description" content={"EPICE " + new Date().getFullYear()} />
          <meta name="robots" content="index, follow" />
          <meta property="og:locale" content="PT-BR" />
          <meta property="og:site_name" content="EPICE" />
          <meta property="og:url" content="http://epice-app.vercel.app/" />
          <meta property="twitter:title" content={"EPICE " + new Date().getFullYear()} />
          <meta property="twitter:description" content={"EPICE " + new Date().getFullYear()} />
          <meta property="twitter:site" content="http://epice-app.vercel.app/" />
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