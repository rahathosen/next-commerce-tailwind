import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { seo } from "./../lib/seo";
import { DefaultSeo } from "next-seo";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <script async src="https://cdn.splitbee.io/sb.js"></script>
      <script
        async
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id="500162cb-c0d4-4919-af92-042eac1074bc"
      ></script>

      <SessionProvider session={session}>
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            <DefaultSeo {...seo} />
            {Component.auth ? (
              <Auth adminOnly={Component.auth.adminOnly}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </PayPalScriptProvider>
        </StoreProvider>
      </SessionProvider>
    </>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}
export default MyApp;
