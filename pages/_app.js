import "@/styles/globals.css";
import React from "react";
import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </SessionProvider>
  );
}
