import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import {
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline";

const navigation = [
  {
    name: "Facebook",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  // {
  //   name: "Twitter",
  //   href: "#",
  //   icon: (props) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "GitHub",
  //   href: "https://github.com/rahathosen/next-commerce-tailwind",
  //   icon: (props) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path
  //         fillRule="evenodd"
  //         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
];

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { cart } = state;
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    dispatch({ type: "CART_RESET" });
    Cookies.remove("cart");
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div>
      {/* Banner Start */}

      {/* Banner End */}
      <Head>
        <title>{title ? title + " | NextElite" : "NextElite"}</title>
        <meta name="description" content="NextElite Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between py-5 ">
        <header className="sticky top-0 z-50 bg-white p-5 xs:p-1">
          <nav className=" flex  h-12 items-center  justify-between px-[35px]  ">
            <SearchIcon className="h-6 w-6 text-stone-600"></SearchIcon>
            <Link href="/">
              <div className="cursor-pointer text-3xl font-bold text-teal-800 xs:pl-6 xs:text-xl">
                NextElite
              </div>
            </Link>

            <div>
              <div className="flex flex-row gap-5">
                <div>
                  <Link href="/cart">
                    <a
                      href="#"
                      className="relative block text-center text-stone-600 transition hover:text-yellow-900 "
                    >
                      {cartItemsCount > 0 && (
                        <span className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full  bg-teal-700 text-xs text-white ">
                          {cartItemsCount}
                        </span>
                      )}{" "}
                      <div className="text-2xl">
                        <ShoppingCartIcon className="h-6 w-6"></ShoppingCartIcon>
                      </div>
                      <div className="text-sm font-semibold leading-3 "></div>
                    </a>
                  </Link>
                </div>
                {status === "loading" ? (
                  "Loading"
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="font-bold text-stone-600 transition hover:text-yellow-900">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 w-[140px] origin-top-right rounded-md bg-stone-100 text-stone-500 shadow-lg ">
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link "
                          href="/profile"
                        >
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className=" font-bold text-stone-600 transition hover:text-yellow-900">
                      <UserIcon className="h-6 w-6"></UserIcon>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className=" flex flex-row justify-center gap-[15px] px-4 pt-3 pb-6 font-semibold text-teal-700   shadow-md sm:gap-[40px] md:gap-[50px] md:text-lg md:font-bold lg:gap-[60]">
          <div className="hover:text-teal-600 xs:hidden">New Arrivals</div>
          <div className="hover:text-teal-600">Watch</div>
          <div className=" hover:text-teal-600">Cloth</div>
          <div className="hover:text-teal-600">Perfume</div>
        </div>
        <main className="container m-auto mt-4 md:mx-8 md:pb-7 ">
          {children}
        </main>

        <footer className="bg-white shadow-inner">
          <div className="2x:pt-10 mx-auto h-10 px-4 pt-8 pb-8 sm:px-6 md:flex md:items-center   md:justify-between lg:px-8  xl:pt-10">
            <div className="flex justify-center space-x-6 pb-5 md:order-3 md:pb-0">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="flex justify-around gap-10 md:order-2">
              <div className="text-center text-base text-gray-500">
                <p>
                  <Link rel="stylesheet" href="/">
                    <a>Terms of service </a>
                  </Link>
                </p>
              </div>
              <div className="text-center text-base text-gray-500">
                <p>
                  <Link rel="stylesheet" href="/">
                    <a>Security</a>
                  </Link>
                </p>
              </div>
              <div className="text-center text-base text-gray-500 ">
                <p>
                  <Link rel="stylesheet" href="/">
                    <a>Privacy Policy</a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-5 md:order-1 md:mt-0 ">
              <p className="pb-5 text-center text-base text-gray-500 md:pb-0">
                &copy; 2022 NextElite, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
