import React from "react";
const relatedProducts = [
  {
    id: 1,
    name: "Black T-Shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    brand: "Adidas",
  },
  {
    id: 2,
    name: "Black T-Shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    brand: "Adidas",
  },
  {
    id: 3,
    name: "Billfold Wallet",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-03.jpg",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    brand: "Nike",
  },
  {
    id: 4,
    name: "Billfold Wallet",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-03.jpg",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    brand: "Nike",
  },
];
export default function Recommendation() {
  return (
    <>
      <section aria-labelledby="related-heading" className="mt-1">
        <h2 id="related-heading" className="text-lg font-medium text-gray-900">
          You may also like&hellip;
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={relatedProduct.imageSrc}
                  alt={relatedProduct.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={relatedProduct.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {relatedProduct.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {relatedProduct.brand}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {relatedProduct.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
