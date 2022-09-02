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
                <form>
                  <input
                    type="text"
                    name="search"
                    placeholder="search"
                    className="w-[150px] rounded-full border border-gray-500 bg-white px-4 py-2  text-gray-800 drop-shadow-sm duration-500  focus:w-full  focus:border-gray-600 
            focus:ring-transparent"
                  />
                </form>
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
              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {status === "loading" ? (
                  <UserCircleIcon className="h-6 w-6"></UserCircleIcon>
                ) : session?.user ? (
                  <Menu as="div" className="">
                    <Menu.Button className="font-bold text-gray-900 transition hover:text-gray-700">
                      {session.user.name.split(" ")} &#770;
                    </Menu.Button>
                    <Menu.Items className=" space-y-6  py-3 px-4 ">
                      <Menu.Item>
                        <DropdownLink className="sidebar-link " href="/profile">
                          account
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="sidebar-link"
                          href="/order-history"
                        >
                          order history
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link "
                            href="/admin/dashboard"
                          >
                            admin dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu>
                ) : (
                  <div className="space-y-6 ">
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
                {/* logout  */}
                {status === "loading" ? (
                  <UserCircleIcon className="h-6 w-6"></UserCircleIcon>
                ) : session?.user ? (
                  <a className="sidebar-link" onClick={logoutClickHandler}>
                    logout
                  </a>
                ) : (
                  <div></div>
                )}
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
                    <div className="">
                      {/* <form action="" className="relative  z-10 mx-auto w-max">
                        <input
                          type="search"
                          className="peer relative z-10 h-6 w-6 cursor-pointer rounded-2xl border border-transparent bg-transparent pl-12 outline-none focus:mr-1 focus:w-min focus:cursor-text focus:border-gray-300 focus:pl-8"
                        />
                        <SearchIcon className="absolute inset-y-0 my-auto  h-10 w-12 border-r border-transparent stroke-gray-700 pl-[12px] pr-[12px]" />
                      </form> */}
                    </div>

                    {/* <a href="#" className="ml-2 p-2 text-gray-800">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </a> */}
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
                      {/* Search box */}

                      <div className="flex lg:ml-6">
                        <a className="p-2 text-gray-800 hover:text-gray-600">
                          <span className="sr-only">Search</span>
                          <SearchIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Search box end */}
                      {status === "loading" ? (
                        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      ) : session?.user ? (
                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="text-sm font-medium text-black transition hover:text-gray-600">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                              <span className="text-sm font-medium leading-none text-white">
                                {session.user.name.slice(0, 2)}
                              </span>
                            </span>
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 z-10 w-[140px] origin-top-right rounded-md bg-white text-gray-700 drop-shadow-2xl ">
                            <Menu.Item>
                              <DropdownLink
                                className="dropdown-link "
                                href="/profile"
                              >
                                account
                              </DropdownLink>
                            </Menu.Item>
                            <Menu.Item>
                              <DropdownLink
                                className="dropdown-link"
                                href="/order-history"
                              >
                                order history
                              </DropdownLink>
                            </Menu.Item>
                            {session.user.isAdmin && (
                              <Menu.Item>
                                <DropdownLink
                                  className="dropdown-link"
                                  href="/admin/dashboard"
                                >
                                  admin dashboard
                                </DropdownLink>
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              <a
                                className="dropdown-link"
                                href="#"
                                onClick={logoutClickHandler}
                              >
                                logout
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
