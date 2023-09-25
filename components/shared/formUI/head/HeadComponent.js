import React from "react";
import Head from "next/head";

function HeadComponent({ data, type }) {
  return (
    <Head>
      <title>{data.breadCam.title}</title>
      <meta name="description" content={data.breadCam.description} />
      <meta name="keywords" content={data.breadCam.keywords} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadComponent;
