import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ExclamationIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      state;
  }
}
function OrderScreen() {
  // order/:id

  const { data: session } = useSession();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid successgully");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className="my-5 border-t border-b border-gray-200 bg-white py-5 pl-5  sm:rounded-lg sm:border">
        <div>
          Order ID:{" "}
          <span className="font-semibold text-gray-700">{orderId}</span>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {shippingAddress.fullName}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {shippingAddress.city}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {shippingAddress.address}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Country
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {shippingAddress.country}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      PostalCode
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {shippingAddress.postalCode}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-end">
                {isDelivered ? (
                  <div className="flex items-center pt-2">
                    <CheckCircleIcon
                      className="h-6 w-6  text-green-500"
                      aria-hidden="true"
                    />
                    <p className="ml-2  font-medium text-gray-700">
                      Delivered at {deliveredAt}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center pt-4 pl-5">
                    <ExclamationIcon
                      className="h-6 w-6  text-yellow-500"
                      aria-hidden="true"
                    />
                    <p className="ml-2  font-medium text-gray-700">
                      Not delivered yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-5 ">
              <h2 className="mb-2 text-lg ">Payment Method</h2>
              <div className="border-t border-gray-200 py-1">
                <div>{paymentMethod}</div>
                <div className="flex justify-end">
                  {isPaid ? (
                    <div className="flex items-center pt-2">
                      <CheckCircleIcon
                        className="h-6 w-6  text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2  font-medium text-gray-700">
                        Paid at {paidAt}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center pt-4 pl-5">
                      <ExclamationIcon
                        className="h-6 w-6  text-yellow-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2  font-medium text-gray-700">
                        Not Paid yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <div className="border-t border-gray-200 py-1"></div>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>{" "}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="primary-button w-full"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
