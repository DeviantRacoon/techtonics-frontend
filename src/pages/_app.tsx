import "../styles/main.css";
import Head from "next/head";
import type { AppProps } from "next/app";

import ColorModeProvider from '@/common/components/ColorModeProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Head>
        <title>StRo | Administración de almacén</title>
      </Head>
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}

