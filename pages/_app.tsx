import 'react-toastify/dist/ReactToastify.css'
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify'
import Header from "../components/Header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
