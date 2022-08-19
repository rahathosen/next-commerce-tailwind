import React from "react";

export default function Hero() {
  return (
    <div className="sm:py-30 relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center lg:px-0">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-700 lg:text-6xl">
        New arrivals are here
      </h1>
      <p className="mt-4 text-xl text-gray-400">
        The new arrivals have, well, newly arrived. Check out the latest options
        from our summer small-batch release while theyre still in stock.
      </p>
      <a
        href="#"
        className="mt-8 inline-block rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-gray-100 hover:bg-black"
      >
        Shop New Arrivals
      </a>
    </div>
  );
}
