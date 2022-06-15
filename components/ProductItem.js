import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
							layout="responsive"
							className="rounded shadow hover:opacity-80"
						/>
					</a>
				</Link>

				<div className="flex flex-col items-center justify-center pt-2 pb-2 ">
					<Link href={`/product/${product.slug}`}>
						<a>
							<h2 className="text-xl font-semibold">{product.name}</h2>
						</a>
					</Link>
					<p className="mb-2">{product.brand}</p>
					<div className="flex  gap-10 justify-around items-center pt-2 pb-3">
						<p className="font-bold text-lg">${product.price}</p>
						<button
							className="relative flex bg-gray-200 border border-transparent py-2 rounded-md  px-4 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-300"
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
