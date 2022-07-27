import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function LoginScreen() {
	return (
		<Layout title="login">
			<form className="mx-auto max-w-screen-md">
				<h1 className="mb-4 text-xl font-bold text-neutral-700">Login</h1>
				<div className="mb-4 font-semibold">
					<label htmlFor="Email">Email</label>
					<input type="email" id="email" className="w-full" autoFocus />
				</div>
				<div className="mb-4 font-semibold">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" className="w-full" autoFocus />
				</div>
				<div className="mb-4 font-semibold">
					<button className="primary-button">Login</button>
				</div>
				<div className="mb-4 font-semibold">
					Don&apos;t have an account ? &nbsp;
					<Link href="register">Register</Link>
				</div>
			</form>
		</Layout>
	);
}
