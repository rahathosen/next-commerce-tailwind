import Link from "next/link";
import { Menu } from "@headlessui/react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";

// import Men from "../pages/men";

import {
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
const navigation = {
  pages: [
    { name: "Men", href: "/men" },
    { name: "Watch", href: "/watch" },
    { name: "Cloth", href: "/cloth" },
    { name: "Perfume", href: "/perfume" },
  ],
};
const currencies = ["BN", "US"];
export default function Nav() {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Mobile navigation */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link href={page.href}>
                      <a className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
              {/* sign in */}
              <div className="space-y-6  py-6 px-4">
                {status === "loading" ? (
                  <UserCircleIcon className="h-6 w-6"></UserCircleIcon>
                ) : session?.user ? (
                  <Menu
                    as="div"
                    className="space-y-6 border-t border-gray-200 py-6 px-4"
                  >
                    <Menu.Button className="font-bold text-gray-600 transition hover:text-gray-500">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className=" space-y-6 border-t border-gray-200 py-3 px-4 ">
                      <Menu.Item>
                        <DropdownLink className="sidebar-link " href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="sidebar-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="sidebar-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    <div className="flow-root">
                      <Link href="/register">
                        <a className="-m-2 block p-2 font-medium text-gray-900">
                          Create an account
                        </a>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link href="/login">
                        <a className="-m-2 block p-2 font-medium text-gray-900">
                          Sign in
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {/* sign in */}
              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                      <select
                        id="mobile-currency"
                        name="currency"
                        className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6 8l4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {/* Mobile navigation */}

      {/* Top navigation */}

      {/* Top navigation end */}

      {/* Header */}
      <header className="sticky top-0 z-10 shadow-md">
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="bg-white bg-opacity-70 backdrop-blur-md backdrop-filter">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a>
                      <span className="sr-only">Workflow</span>
                      {/* <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black"
                        alt=""
                      /> */}
                      <Link href="/">
                        <h4 className=" cursor-pointer text-2xl font-bold">
                          NextElite
                        </h4>
                      </Link>
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <Link href={page.href} key={page.name}>
                            <a className="flex items-center text-sm font-medium text-black">
                              {page.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 p-2 text-gray-800"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="#" className="ml-2 p-2 text-gray-800">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    {/* <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black"
                      alt=""
                      className="h-8 w-auto"
                    /> */}
                    <Link href="/">
                      <h4 className="cursor-pointer text-xl font-bold">
                        NextElite
                      </h4>
                    </Link>
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="lg:flex-2 hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                      {status === "loading" ? (
                        <UserCircleIcon className="h-6 w-6"></UserCircleIcon>
                      ) : session?.user ? (
                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="text-sm font-medium text-black transition hover:text-gray-600">
                            {session.user.name}
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 z-10 w-[140px] origin-top-right rounded-md bg-white text-gray-700 shadow-lg ">
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
                            {session.user.isAdmin && (
                              <Menu.Item>
                                <DropdownLink
                                  className="dropdown-link"
                                  href="/admin/dashboard"
                                >
                                  Admin Dashboard
                                </DropdownLink>
                              </Menu.Item>
                            )}
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
                        <div className="lg:flex-2 hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                          <Link href="/login">
                            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                              Sign in
                            </a>
                          </Link>
                          <span
                            className="h-6 w-px bg-gray-200"
                            aria-hidden="true"
                          />
                          <Link href="/register">
                            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                              Create account
                            </a>
                          </Link>
                        </div>
                      )}

                      <div className="flex lg:ml-6">
                        <a className="p-2 text-gray-800 hover:text-gray-600">
                          <span className="sr-only">Search</span>
                          <SearchIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center lg:ml-0">
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        <Link href="/cart">
                          <a className="group -m-2 flex items-center p-2">
                            <ShoppingBagIcon
                              className="h-6 w-6 flex-shrink-0 text-gray-800"
                              aria-hidden="true"
                            />
                            {cartItemsCount > 0 && (
                              <span className="ml-2 text-sm font-medium text-gray-800">
                                {cartItemsCount}
                              </span>
                            )}{" "}
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
