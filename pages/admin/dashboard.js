import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import {
  CreditCardIcon,
  HomeIcon,
  PaperAirplaneIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: PaperAirplaneIcon,
    current: false,
  },
  {
    name: "All Products",
    href: "/admin/products",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Users", href: "/admin/users", icon: UsersIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Admin Dashboard">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* <div className="grid md:grid-cols-4 md:gap-5"> */}
        <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? "border-black bg-zinc-100 text-black"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-black group-hover:text-neutral-500"
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
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error px-6 sm:px-6 lg:px-0">{error}</div>
          ) : (
            <div>
              {/* Dashboard State */}
              <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 md:pb-8 lg:grid-cols-4">
                  {/* 1 */}
                  <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <div className="absolute rounded-md bg-black p-3">
                        <CurrencyDollarIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        Total Sales
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">
                        ${summary.ordersPrice}
                      </p>

                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <Link href="/admin/orders">
                            <a className="font-medium text-black hover:text-neutral-800">
                              {" "}
                              View all
                              <span className="sr-only"> stats</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </dd>
                  </div>
                  {/* 2 */}
                  <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <div className="absolute rounded-md bg-black p-3">
                        <PaperAirplaneIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        Orders
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">
                        {summary.ordersCount}
                      </p>

                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <Link href="/admin/orders">
                            <a className="font-medium text-black hover:text-neutral-800">
                              {" "}
                              View all
                              <span className="sr-only"> stats</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </dd>
                  </div>
                  {/* 3 */}
                  <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <div className="absolute rounded-md bg-black p-3">
                        <CreditCardIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        Products
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">
                        {summary.productsCount}
                      </p>

                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <Link href="/admin/products">
                            <a className="font-medium text-black hover:text-neutral-800">
                              {" "}
                              View all
                              <span className="sr-only"> stats</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </dd>
                  </div>
                  {/* 4 */}
                  <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
                    <dt>
                      <div className="absolute rounded-md bg-black p-3">
                        <UsersIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        Users
                      </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">
                        {summary.usersCount}
                      </p>

                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <Link href="/admin/users">
                            <a className="font-medium text-black hover:text-neutral-800">
                              {" "}
                              View all
                              <span className="sr-only"> stats</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              {/* Dashboard State */}

              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
