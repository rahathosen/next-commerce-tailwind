import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 | Rahat Hosen</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-[#FFFFFF] transition-colors duration-500 ">
        <div className="mx-auto flex h-screen w-full max-w-2xl flex-col items-center justify-center dark:text-stone-200 ">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: -0,
              },
              animate: {
                opacity: 1,
              },
            }}
          >
            <div className="mx-auto mb-16 flex w-full flex-col justify-center px-12 md:px-0 md:pl-0 ">
              <h1 className="loader mb-4 text-center text-3xl font-bold tracking-tight text-gray-800  md:text-5xl">
                404
              </h1>
              <h1 className="loader mb-4 text-center text-3xl font-bold tracking-tight text-gray-800  md:text-5xl">
                I think you&apos;re lost.
              </h1>
              <p className="mb-8 text-center text-gray-600 ">
                Why show a generic 404 when I can make it sound mysterious? It
                seems you&apos;ve found something that used to exist, or you
                spelled something wrong. I&apos;m guessing you spelled something
                wrong. Can you double check that URL?
              </p>
              <div className="mx-[100px] flex flex-row xs:mx-[50px]">
                <Link href="/contact">
                  <a className="mx-auto w-[125px] rounded-md bg-gray-200 p-1 text-center font-bold text-black hover:bg-gray-300  sm:p-4 md:w-40">
                    Contact Us
                  </a>
                </Link>
                <Link href="/">
                  <a className="mx-auto w-[125px] rounded-md bg-gray-200 p-1 text-center font-bold text-black hover:bg-gray-300  sm:p-4 md:w-40">
                    Return Home
                  </a>
                </Link>
              </div>
            </div>

            <div></div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
