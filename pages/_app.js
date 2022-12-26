import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { seo } from "./../lib/seo";
import { DefaultSeo } from "next-seo";
// import Head from "next/head";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const router = useRouter();
  // const meta = {
  //   title: "NextElite",
  //   description: `a online shop`,
  //   image: "https://www.nextelite.live/images/cover/banner.webp",
  //   type: "website",
  // };

  return (
    <>
      {/* <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://nextelite.live${router.asPath}`}
        />
        <link rel="canonical" href={`https://nextelite.live${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="NextElite" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="description" content="Online Shop" />
      </Head> */}

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
