import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
