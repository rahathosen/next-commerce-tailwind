import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { QuestionMarkCircleIcon, XIcon } from "@heroicons/react/solid";

const tax = 5;
const shipping = 8.43;

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <Layout title="Shopping Cart">
      <div className="mx-auto  xs:mx-5 sm:mx-5">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl">
              Shopping Cart
            </h1>
            {cartItems.length === 0 ? (
              <div>
                Cart is empty. <Link href="/">Go shopping</Link>
              </div>
            ) : (
              <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section
                  aria-labelledby="cart-heading"
                  className="lg:col-span-7"
                >
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>

                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-t border-b border-gray-200"
                  >
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6 sm:py-10">
                        <div className="h-24 w-24 flex-shrink-0 rounded-md object-cover object-center sm:h-48 sm:w-48">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={96}
                            width={96}
                            layout="responsive"
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={item.href}
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {item.name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">{item.category}</p>

                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {item.brand}
                                </p>
                              </div>
                              <p className="text-md mt-1 font-medium text-gray-900">
                                ${item.price}
                              </p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9">
                              {/* extra */}
                              <label
                                htmlFor={`quantity-${item.slug}`}
                                className="sr-only"
                              >
                                Quantity, {item.name}
                              </label>
                              {/* extra ! */}
                              <select
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateCartHandler(item, e.target.value)
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>

                              <div className="absolute top-0 right-0">
                                <button
                                  onClick={() => removeItemHandler(item)}
                                  type="button"
                                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Remove</span>
                                  <XIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Order summary */}
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Order summary
                  </h2>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Learn more about how shipping is calculated
                          </span>
                          <QuestionMarkCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${tax}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Learn more about how tax is calculated
                          </span>
                          <QuestionMarkCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${shipping}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-gray-900">
                        Order total (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)})
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        $
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          tax + shipping
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        router.push("login?redirect=/shipping");
                      }}
                      className="w-full rounded-md border border-transparent bg-teal-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Checkout
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
