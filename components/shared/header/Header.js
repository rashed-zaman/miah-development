import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Head from "next/head";

// import DesktopHeader from "./parts/DesktopHeader";
// import MobileHeader from "./parts/MobileHeader";

const DesktopHeader = dynamic(() => import("./parts/DesktopHeader"));
const MobileHeader = dynamic(() => import("./parts/MobileHeader"));

export default function Header() {
  const [structuredData, setstructuredData] = useState({});

  const createSchemaData = () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      url: "https://miah.shop/",
      logo: "https://miah.shop/img/web-black-logo.gif",
    };
    setstructuredData(data);
  };

  useEffect(() => {
    createSchemaData();
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <DesktopHeader />
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <MobileHeader />
      </Box>
    </>
  );
}
