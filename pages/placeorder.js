import axios from "axios";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      {/* ---------------new------------------------------ */}
      <div className="">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Place Order
            </h1>
            <p className="mt-2 pb-6 text-sm text-gray-500">
              Check the final state
            </p>
          </div>
          {/*  */}
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link href="/">Go shopping</Link>
            </div>
          ) : (
            <div>
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="flex flex-row items-stretch justify-between">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details and application.
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <Link href="/shipping">
                      <button>Edit</button>
                    </Link>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {shippingAddress.fullName}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        City
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {shippingAddress.city}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {shippingAddress.address}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Country
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {shippingAddress.country}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        PostalCode
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {shippingAddress.postalCode}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              {/*  */}
              <div className="mt-16">
                <h2 className="sr-only">Recent orders</h2>

                <div className="space-y-20">
                  <div>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex flex-row items-stretch justify-between">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Order Items
                          </h3>
                        </div>
                        <div className="px-4 sm:px-6">
                          <Link href="/cart">Edit</Link>
                        </div>
                      </div>
                      <table className="mt-4 w-full text-gray-500 sm:mt-6">
                        <caption className="sr-only">Products</caption>
                        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                            >
                              Product
                            </th>
                            <th
                              scope="col"
                              className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3 pr-6 font-normal sm:table-cell"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3 pr-6 font-normal sm:table-cell"
                            >
                              SubTotal
                            </th>
                            <th
                              scope="col"
                              className="w-0 py-3 text-center font-normal"
                            >
                              Info
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                          {cartItems.map((item) => (
                            <tr key={item._id}>
                              <td className="py-6 pr-8">
                                <div className="flex items-center">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="mr-6 h-16 w-16 rounded object-cover object-center"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                    <div className="mt-1 sm:hidden">
                                      {item.price}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                ${item.price}
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {item.quantity}
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                ${item.quantity * item.price}
                              </td>
                              <td className="whitespace-nowrap py-6 text-right font-medium">
                                <a className="text-cyan-600">
                                  <Link href={`/product/${item.slug}`}>
                                    View
                                    {/* <span className="hidden lg:inline">
                                      {" "}
                                      Product
                                    </span> */}
                                  </Link>
                                  <span className="sr-only">, {item.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">Items</dt>
                    <dd className="sm:mt-1">${itemsPrice}</dd>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">Shipping</dt>
                    <dd className="sm:mt-1">${shippingPrice}</dd>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">Tax</dt>
                    <dd className="sm:mt-1">${taxPrice}</dd>
                  </div>
                  <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                    <dt>Total amount</dt>
                    <dd className="sm:mt-1">${totalPrice}</dd>
                  </div>
                </dl>
                {/* <a
                      href={order.invoiceHref}
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    >
                      View Invoice
                      <span className="sr-only">for order {order.number}</span>
                    </a> */}
              </div>

              <div className="mt-10 flex justify-end  pt-3">
                <button
                  className="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  disabled={loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
