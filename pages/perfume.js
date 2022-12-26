import React from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import axios from "axios";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import db from "../utils/db";
import Product from "../models/Product";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { NextSeo } from "next-seo";

export default function PerfumeScreen({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product added to the cart");
  };

  return (
    <Layout>
      <NextSeo title="Perfume | NextElite" />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          // style: {
          //   background: "#363636",
          //   color: "#fff",
          // },

          // Default options for specific types
          success: {
            duration: 1500,
            // theme: {
            //   primary: "green",
            //   secondary: "black",
            // },
          },
        }}
      />

      <div>
        <div className="xs:px-6 sm:px-10  md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-lg font-extrabold tracking-tight text-gray-500 md:text-2xl"
          >
            Perfume
          </h2>
        </div>
        <div className="relative mt-8 grid grid-cols-1 gap-y-12 xs:px-6 sm:grid-cols-2 sm:gap-x-6 sm:px-10 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem
              addToCartHandler={addToCartHandler}
              product={product}
              key={product.slug}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
