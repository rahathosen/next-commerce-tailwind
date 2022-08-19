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
import Footer from "./Footer";
import Cookies from "js-cookie";
import {
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline";

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
              <div className="cursor-pointer text-3xl font-bold text-gray-700 xs:pl-6 xs:text-xl">
                NextElite
              </div>
            </Link>

            <div>
              <div className="flex flex-row gap-5">
                <div>
                  <Link href="/cart">
                    <a
                      href="#"
                      className="relative block text-center text-gray-800 transition hover:text-gray-500 "
                    >
                      {cartItemsCount > 0 && (
                        <span className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full  bg-yellow-700 text-xs text-white ">
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
                    <Menu.Button className="font-bold text-gray-600 transition hover:text-gray-500">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 w-[140px] origin-top-right rounded-md bg-gray-100 text-gray-500 shadow-lg ">
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
                    <a
                      className=" font-bold text-gray-600 transition hover:text-teal-500"
                      aria-label="login"
                    >
                      <UserIcon className="h-6 w-6"></UserIcon>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className=" flex flex-row justify-center gap-[15px] px-4 pt-1 pb-6 font-semibold text-gray-700   shadow-md sm:gap-[40px] md:gap-[50px] md:text-base lg:gap-[60]">
          <div className="hover:text-gray-600 xs:hidden">New Arrivals</div>
          <div className="hover:text-gray-600">Watch</div>
          <div className=" hover:text-gray-600">Cloth</div>
          <div className="hover:text-gray-600">Perfume</div>
        </div>

        <main className="container m-auto mt-4 md:mx-8 md:pb-7 ">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
