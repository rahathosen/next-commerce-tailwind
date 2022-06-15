import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function ProductItem({ product }) {
	return (
		<div>
			<div className="card ">
				<Link href={`/product/${product.slug}`}>
					<a>
						<Image
							src={product.image}
							alt={product.name}
							height="150px"
							width="150px"
							layout="responsive"
							className="rounded shadow hover:opacity-80 "
						/>
					</a>
				</Link>

				<div className="flex flex-col items-center justify-center p-5 ">
					<Link href={`/product/${product.slug}`}>
						<a>
							<h2 className="text-lg">{product.name}</h2>
						</a>
					</Link>
					<p className="mb-2">{product.brand}</p>
					<p>${product.price}</p>
					<button
						className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
						type="button"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}
