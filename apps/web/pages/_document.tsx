import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="shopify-api-key" content={process.env.SHOPIFY_API_KEY} />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
