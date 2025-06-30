import "../styles/main.css";
import Head from "next/head";
import type { AppProps } from "next/app";

import ColorModeProvider from '@/common/components/ColorModeProvider'
import { Provider } from 'react-redux';
import { store, persistor } from '@/config/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>StRo | Administración de almacén</title>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ColorModeProvider>
  );
}

