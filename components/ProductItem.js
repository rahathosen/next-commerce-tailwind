import React from "react";
import Link from "next/link";
import Image from "next/image";

//  For Blur placeholder down V
// const keyStr =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// const triplet = (e1, e2, e3) =>
//   keyStr.charAt(e1 >> 2) +
//   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//   keyStr.charAt(e3 & 63);
// const rgbDataURL = (r, g, b) =>
//   `data:image/gif;base64,R0lGODlhAQABAPAA${
//     triplet(0, r, g) + triplet(b, 255, 255)
//   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

// For Blur placeholder up  /\

export default function ProductItem({ product }) {
  return (
    <div className="px-4">
      <div className=" card ">
        <Link href={`/product/${product.slug}`}>
          <a>
            <Image
              src={product.image}
              alt={product.name}
              height="0px"
              width="0px"
              // placeholder="blur"
              // blurDataURL={rgbDataURL(237, 237, 237)}
              layout="responsive"
              className="rounded shadow hover:opacity-80"
            />
          </a>
        </Link>

        <div className="flex flex-col items-center justify-center pt-2 pb-2 ">
          <div className="flex flex-row items-center gap-[70px] sm:gap-[70px]  md:gap-8  lg:gap-6">
            <p className="text-4xl font-bold text-stone-500 sm:text-4xl md:text-4xl">
              ${product.price}
            </p>
            <div className="flex flex-col items-center">
              <Link href={`/product/${product.slug}`}>
                <a>
                  <h2 className="text-xl font-bold text-stone-600 sm:text-xl md:text-lg lg:text-xl xl:text-xl">
                    {product.name}
                  </h2>
                </a>
              </Link>
              <p className="xl:font-md md:font-md mb-2 font-semibold text-stone-500 sm:font-bold">
                {product.brand}
              </p>
            </div>
          </div>
          <div className="flex  items-center justify-around gap-8 pt-2 pb-3 sm:gap-8 md:gap-7 md:px-0 xl:gap-8">
            <Link href={`/product/${product.slug}`}>
              <button
                className="relative flex items-center justify-center rounded-md  border border-transparent bg-stone-200 py-2 px-8 text-sm font-semibold text-stone-700 hover:rounded-md  hover:bg-stone-300 sm:px-8 md:px-2 xl:px-4"
                type="button"
              >
                Details
              </button>
            </Link>
            <button
              className="relative flex items-center justify-center rounded-md border border-transparent bg-stone-200 py-2 px-4 text-sm font-bold text-stone-600  hover:rounded-md  hover:bg-stone-300 md:px-2"
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
