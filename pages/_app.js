import { Fragment } from "react";
import "../styles/globals.css";
import store from "../store/index";
import { Provider } from "react-redux";
import MainLayout from "../components/layout/MainHeader/MainLayout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
