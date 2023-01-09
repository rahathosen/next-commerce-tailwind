import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import { Reviews } from "../components/Reviews";
import Incentives from "../components/Incentives";
import { useRouter } from "next/router";
import Hero from "../components/Hero";
import HeroModel from "../components/HeroModel";
import axios from "axios";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import db from "../utils/db";
import Product from "../models/Product";
import { useContext } from "react";
import { Store } from "../utils/Store";
import PromoSection from "../components/PromoSection";
import { NextSeo } from "next-seo";

export default function Home({ products }) {
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

  const router = useRouter();
  const meta = {
    title: "NextElite",
    description: `a online shop`,
    // image: "./../public/images/cover/banner.webp",
    image: "https://www.nextelite.live/images/cover/banner.webp",
    type: "website",
  };

  return (
    <Layout title="Home">
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
      <Head>
        <NextSeo title="NextElite - A online shop" />
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://nextelite.live${router.asPath}`}
        />
        <link rel="canonical" href={`https://nextelite.live${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="NextElite" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="description" content="Online Shop" />
      </Head>
      <HeroModel />
      <Hero />
      <div>
        <div className="xs:px-6 sm:px-10  md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-500"
          >
            Trending Products
          </h2>
          <Link href="search">
            <a className="hidden text-sm font-medium text-sky-600 hover:text-sky-500 md:block">
              All the collection<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
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
      <PromoSection />
      <Reviews />
      <Incentives />
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
