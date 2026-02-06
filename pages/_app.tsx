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
        <meta
          name="description"
          content="Lucas Brogni — Senior Software Engineer & Engineering Leader. 10+ years building scalable systems and growing teams."
        />
        <title>{`Lucas Brogni | ${Component.displayName || 'Portfolio'}`}</title>
      </Head>

      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
