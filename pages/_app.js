import { Fragment } from "react";
import "../styles/globals.css";
import store from "../store/index";
import { Provider } from "react-redux";
import MainLayout from "../components/layout/MainHeader/MainLayout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
