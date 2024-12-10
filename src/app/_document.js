import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/public/images/elmahdibenbrahim.jpeg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="El Mahdi Benbrahim" />
        <meta name="description" content="El Mahdi Benbrahim's personal website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}