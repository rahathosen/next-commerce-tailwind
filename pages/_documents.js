import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full bg-gray-50 antialiased" lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="nextelite-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
