import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import '../public/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
