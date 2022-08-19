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
      <div className="flex min-h-screen flex-col bg-[#FFFFFF] transition-colors duration-500  dark:bg-[#161616]">
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
              <h1 className="loader mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                404 – Unavailable For Legal Reasons
              </h1>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                Why show a generic 404 when I can make it sound mysterious? It
                seems you&apos;ve found something that used to exist, or you
                spelled something wrong. I&apos;m guessing you spelled something
                wrong. Can you double check that URL?
              </p>
              <Link href="/">
                <a className="mx-auto w-[125px] rounded-md bg-stone-300 p-1 text-center font-bold text-black hover:bg-stone-400 dark:bg-neutral-800 dark:text-white hover:dark:bg-neutral-700 sm:p-4 md:w-40">
                  Return Home
                </a>
              </Link>
            </div>

            <div></div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
