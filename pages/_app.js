import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				{' '}
				<Component {...pageProps} />
			</StoreProvider>
		</SessionProvider>
	);
}

export default MyApp;
