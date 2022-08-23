import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Nav from "./Nav";
export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title ? title + " | NextElite" : "NextElite"}</title>
        <meta name="description" content="NextElite Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between py-5 ">
        <main className="container m-auto mt-4 md:mx-8 md:pb-7 ">
          {children}
        </main>
        {/* <main className="  md:pb-7 ">{children}</main> */}
        <Footer />
      </div>
    </div>
  );
}
