import React from "react";
// import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Nav from "./Nav";
import Head from "next/head";
// import { seo } from "./../lib/seo";
// import { DefaultSeo } from "next-seo";
// import { NextSeo } from "next-seo";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " | NextElite" : "NextElite"}</title>
      </Head>
      <Nav />
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between py-5 ">
        <main className="container m-auto  ">{children}</main>
        {/* <main className="  md:pb-7 ">{children}</main> */}
        <Footer />
      </div>
    </>
  );
}
