import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/Store";
import { ArchiveIcon } from "@heroicons/react/outline";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <Layout>Product not found</Layout>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Sorry, product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="mx-auto xs:mx-5 sm:mx-5">
        <div className="py-2">
          <Link href="/">back to products</Link>
        </div>
        <div className="grid md:grid-cols-3 md:gap-[40px]">
          <div className="rounded-2xl shadow-xl md:col-span-2">
            <Image
              className="rounded-2xl "
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </div>
          <div>
            <div>
              <ul>
                <li>
                  <h1 className="pb-6 text-center text-5xl font-bold text-stone-700 xs:pt-5 xs:text-3xl sm:pt-5">
                    {product.name}
                  </h1>
                  <div className="px-5 pb-5 text-center">
                    <button className="mr-1">
                      <svg
                        className="h-auto w-5 fill-current text-teal-400  xs:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                      </svg>
                    </button>
                    <span className=" font-medium text-slate-400">
                      {product.rating} •{" "}
                      <a href="#" className=" font-normal underline">
                        {product.numReviews} reviews
                      </a>
                    </span>
                  </div>
                </li>
                <li className="flex items-center justify-between px-5 font-semibold text-stone-700 xs:font-normal">
                  Category{" "}
                  <span className="info-badge text-2xl font-bold ">
                    {product.category}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <div className="mt-3 rounded-2xl bg-gray-100 px-5  py-2 shadow-xl">
                <div className="flex items-center justify-between px-5 font-semibold text-stone-700 xs:font-normal md:px-1">
                  Brand{" "}
                  <span className="text-2xl font-bold text-stone-700 xs:text-xl">
                    {product.brand}
                  </span>
                </div>
                <div className=" flex items-center justify-between px-5 font-semibold text-stone-700 xs:font-normal md:px-1">
                  <div>Price</div>
                  <div className=" text-3xl font-bold text-stone-700 xs:text-xl ">
                    ${product.price}
                  </div>
                </div>
                <div className="mb-2 flex justify-between  px-5 font-semibold text-stone-700 xs:font-normal md:px-1">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="stock-success-button">in stock</span>
                    ) : (
                      <span className="stock-danger-button">unavailable</span>
                    )}
                  </div>
                </div>
                <div className="pt-5 pb-5">
                  <button
                    className="primary-button inline-flex w-8/12 translate-x-20 items-center justify-center gap-2 xs:w-7/12 xs:translate-x-16 md:w-9/12 md:translate-x-10"
                    onClick={addToCartHandler}
                  >
                    {" "}
                    <ArchiveIcon className="justify-content h-5 w-5" />
                    add to cart
                  </button>
                </div>
              </div>
              <div className="mb-5 flex justify-between px-5  pt-5 font-semibold text-stone-700 xs:font-normal">
                <p>Description: {product.description}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <p>Extra Information</p>
        </div> */}
      </div>
    </Layout>
  );
}
