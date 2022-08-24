import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form
        className=" mx-auto mb-5  max-w-screen-md xs:mx-5"
        onSubmit={submitHandler}
      >
        <h2 className=" mt-10 pb-4 text-lg font-medium text-gray-900 ">
          Payment method
        </h2>
        {["PayPal", "BKash", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between pt-6">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Back
          </button>
          <button className="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50">
            Next step
          </button>
        </div>
      </form>

      {/* </div> */}
    </Layout>
  );
}

PaymentScreen.auth = true;
