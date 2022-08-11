import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";

export default function ShippingScreen() {
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
    </Layout>
  );
}
