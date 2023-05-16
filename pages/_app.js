import { Fragment } from "react";
import "../styles/globals.css";
import store from "../store/index";
import { Provider } from "react-redux";
import MainLayout from "../components/layout/MainHeader/MainLayout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <link
            href="https://fonts.cdnfonts.com/css/uni-sans"
            rel="stylesheet"
          ></link>
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
