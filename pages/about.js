import React from "react";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";

export default function AboutScreen() {
  return (
    <Layout>
      <NextSeo title="About | NextElite" />
      <div>AboutScreen</div>
    </Layout>
  );
}
