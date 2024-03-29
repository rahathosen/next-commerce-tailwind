import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { InformationCircleIcon } from "@heroicons/react/outline";
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

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <>
      <div className="rounded-md bg-white hover:drop-shadow-2xl">
        <div>
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.image}
                layout="fill"
                // height="0"
                // width="0"
                // placeholder="blur"
                // blurDataURL={rgbDataURL(237, 237, 237)}
                // layout="responsive"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-t-lg p-4 px-6">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <p className="relative text-xl font-semibold text-white">
                ${product.price}
              </p>
            </div>
          </div>
          <div className="  p-2 ">
            <div className="flex flex-row items-center justify-between">
              <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
              </div>
              <div className="cursor-pointer text-xs font-semibold text-gray-500 underline">
                <Link href={`/product/${product.slug}`}>
                  <a href={product.href}>Details</a>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <a
                onClick={() => addToCartHandler(product)}
                href={product.href}
                className="relative flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                Add to bag<span className="sr-only">, {product.name}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
