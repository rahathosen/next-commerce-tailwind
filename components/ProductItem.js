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
					<div className="flex flex-row gap-10 items-center">
						<p className="font-bold md:text-4xl text-2xl text-gray-500">${product.price}</p>
						<div className="flex flex-col items-center">
							<Link href={`/product/${product.slug}`}>
								<a>
									<h2 className="md:text-xl font-bold text-gray-700">{product.name}</h2>
								</a>
							</Link>
							<p className="mb-2 text-gray-700">{product.brand}</p>
						</div>
					</div>
					<div className="flex  md:gap-10 gap-5 justify-around items-center pt-2 pb-3 md:px-0 ">
						<button
							className="relative flex bg-neutral-100 border border-transparent py-2 rounded-md  px-4 items-center justify-center text-sm font-medium text-gray-600 hover:bg-neutral-200"
							type="button"
						>
							Details
						</button>
						<button
							className="relative flex bg-neutral-100 border border-transparent py-2 rounded-md  px-4 items-center justify-center text-sm font-medium text-gray-600 hover:bg-neutral-300"
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
