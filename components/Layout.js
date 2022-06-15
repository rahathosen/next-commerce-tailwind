/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
	return (
		<div>
			<Head>
				<title>{title ? title + ' | NextCommerce' : 'NextCommerce'}</title>
				<meta name="description" content="ECommerce Website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex min-h-screen flex-col justify-between">
				<header>
					<nav className="flex h-12 items-center  px-4 justify-between shadow-md">
						<Link href="/">
							<div className="text-lg font-bold">NextCommerce</div>
						</Link>
						<div>
							<Link href="/cart">
								<a className="p-2">Cart</a>
							</Link>
							<Link href="/login">
								<a className="p-2">Login</a>
							</Link>
						</div>
					</nav>
				</header>
				<main className="container m-auto mt-4 mx-8">{children}</main>
				<footer className="flex h-10 justify-center items-center shadow-inner">
					Copyright @ 2022 NextCommerce
				</footer>
			</div>
		</div>
	);
}
