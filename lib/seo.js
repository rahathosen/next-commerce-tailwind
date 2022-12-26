import { createOgImage } from "./createOgImage";
// import type { DefaultSeoProps } from "next-seo";

const title = `NextElite`;
const description = `It's an E-Commerce app for Next level. This web site target the new generation products.`;
const domain = `nextelite.live`;
// const twitter = `@rahathosen_`;
const meta = `A Online Shope`;

export const seo = {
  title: title + " | " + meta,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: createOgImage({ title, meta }),
        width: 800,
        height: 420,
        alt: title,
      },
    ],
  },
  // twitter: {
  //   handle: twitter,
  //   cardType: "summary_large_image",
  // },
};
