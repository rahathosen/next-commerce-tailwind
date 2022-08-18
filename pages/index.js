import Head from "next/head";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
import { Reviews } from "../components/Reviews";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const meta = {
    title: "NextElite",
    description: `a online shop`,
    // image: "./../public/images/cover/banner.webp",
    image: "https://www.nextelite.live/images/cover/banner.webp",
    type: "website",
  };

  return (
    <Layout title="Home">
      <Head>
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
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rahathosen_" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} /> */}
        <meta name="description" content="Online Shop" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="relative mt-8 grid grid-cols-1 gap-y-12 xs:px-10 sm:grid-cols-2 sm:gap-x-6 sm:px-10 lg:grid-cols-4 xl:gap-x-8">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
      <Reviews />
    </Layout>
  );
}
