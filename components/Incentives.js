import React from "react";
const park = [
  {
    name: "Free returns",
    imageUrl: "./../images/icon/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl: "./../images/icon/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl: "./../images/icon/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl: "./../images/icon/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Incentives() {
  return (
    <>
      <section
        aria-labelledby="perks-heading"
        className="border-t border-gray-200 bg-white"
      >
        <div className="text-center">
          <h2 className="pt-10 text-4xl font-semibold tracking-tight text-gray-600">
            We built our business on customer service
          </h2>
        </div>
        <h2 id="perks-heading" className="sr-only">
          Our perks
        </h2>

        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {park.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="-my-1 mx-auto h-24 w-auto text-red-600 "
                      src={perk.imageUrl}
                      alt={park.name}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
