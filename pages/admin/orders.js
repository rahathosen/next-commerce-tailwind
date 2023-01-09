import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import {
  CreditCardIcon,
  UserCircleIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: UserCircleIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: PaperAirplaneIcon,
    current: true,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? "bg-gray-50 text-cyan-700 hover:bg-white hover:text-cyan-700"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-cyan-500 group-hover:text-cyan-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <h1 className="mb-4 text-xl">Admin Orders</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            //

            //

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Paid
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Delivered
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders
                    .slice(0)
                    .reverse()
                    .map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order._id.substring(20, 24)}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {order.user ? (
                            order.user.name
                          ) : (
                            <span className="text-sm text-gray-500">
                              deleted user
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${order.totalPrice}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.isPaid ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 ">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 ">
                              not paid
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.isDelivered ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 ">
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 ">
                              not Delivered
                            </span>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                          <Link href={`/order/${order._id}`} passHref>
                            <a className="text-cyan-600 hover:text-cyan-900">
                              details
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
