import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  desc?: string;
  keywords?: string;
};

// "Arpan Decores"
const defaultDesc =
  "Arpan Decores: Experience magic with your Interiors ";
const defaultKeywords =
  "Arpan Decores, Bhilai interior designing, bhilai, cnc cutting bhilai, customized gifts";

const AppHeader: React.FC<Props> = ({
  title = "Arpan Decores",
  desc = defaultDesc,
  keywords = defaultKeywords,
}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta content={desc} name="description" key="description" />
      <meta content={keywords} name="keywords" key="keywords" />
      <meta property="og:description" content={desc} key="og_description" />
      <meta property="og:title" content={title} key="og_title" />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta
        name="twitter:description"
        content={desc}
        key="twitter_description"
      />
    </Head>
  );
};

export default AppHeader;
