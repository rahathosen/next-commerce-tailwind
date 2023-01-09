import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <div className="min-w-0 flex-1  xsl:hidden md:px-8 lg:px-0 xl:col-span-6">
        <form
          onSubmit={submitHandler}
          className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
        >
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => setQuery(e.target.value)}
                id="search"
                name="search"
                className="block w-full rounded-md border border-transparent bg-transparent py-2 pl-10 pr-3 text-sm placeholder-neutral-500 focus:border-neutral-500 focus:text-neutral-900 focus:placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
