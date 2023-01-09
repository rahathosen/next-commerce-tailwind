import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import {
  CreditCardIcon,
  HomeIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: PaperAirplaneIcon,
    current: false,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: CreditCardIcon,
    current: true,
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
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Admin Products">
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
          <div className="flex justify-between px-4 sm:px-6 lg:px-0">
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="default-button "
            >
              {loadingCreate ? "Loading" : "Add product"}
            </button>
            {loadingDelete && <div>Deleting item...</div>}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        {product._id.substring(20, 24)}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.name}
                      </td>
                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
                        ${product.price}
                      </td>
                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.countInStock === 0 ? (
                          <span className="inline-flex rounded-lg bg-rose-400 px-2 text-xs font-semibold leading-5 text-white ">
                            {product.countInStock}
                          </span>
                        ) : (
                          <span className="">{product.countInStock}</span>
                        )}
                      </td>

                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
                        {product.rating}
                      </td>
                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
                        <Link href={`/admin/product/${product._id}`}>
                          <a type="button" className="default-button">
                            Edit
                          </a>
                        </Link>
                        &nbsp;
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="delete-button"
                          type="button"
                        >
                          Delete
                        </button>
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

AdminProdcutsScreen.auth = { adminOnly: true };
