import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import Footer from "../components/Footer";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </SWRConfig>
  );
};

export default MyApp;
