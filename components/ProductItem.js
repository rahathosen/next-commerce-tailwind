import React from "react";
import Link from "next/link";
import Image from "next/image";

//  For Blur placeholder down V
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
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
              placeholder="blur"
              blurDataURL={rgbDataURL(237, 237, 237)}
              layout="responsive"
              className="rounded shadow hover:opacity-80"
            />
          </a>
        </Link>

        <div className="flex flex-col items-center justify-center pt-2 pb-2 ">
          <div className="flex flex-row sm:gap-[70px] md:gap-8 lg:gap-6 items-center">
            <p className="font-bold md:text-4xl sm:text-4xl text-2xl text-stone-500">
              ${product.price}
            </p>
            <div className="flex flex-col items-center">
              <Link href={`/product/${product.slug}`}>
                <a>
                  <h2 className="xl:text-xl lg:text-xl md:text-lg sm:text-xl font-bold text-neutral-600">
                    {product.name}
                  </h2>
                </a>
              </Link>
              <p className="mb-2 text-gray-600 xl:font-md md:font-md sm:font-bold ">
                {product.brand}
              </p>
            </div>
          </div>
          <div className="flex  md:gap-7 xl:gap-8 sm:gap-8 gap-5 justify-around items-center pt-2 pb-3 md:px-0">
            <Link href={`/product/${product.slug}`}>
              <button
                className="relative flex bg-neutral-100 border border-transparent  py-2 rounded-md sm:px-8  xl:px-4 items-center justify-center text-sm font-medium md:font-semibold md:px-2 text-gray-700 hover:bg-neutral-200"
                type="button"
              >
                Details
              </button>
            </Link>
            <button
              className="relative flex bg-neutral-200 border border-transparent py-2 rounded-md  px-4 items-center justify-center text-sm font-bold md:font-semibold md:px-2  text-gray-500 hover:bg-neutral-300"
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
