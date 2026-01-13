"use client";

import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { useBreadcrumbs } from "../../../hooks/useBreadcrumbs";

export default function MiahBreadCrumbs({ type, data }) {
  const {
    breadCrumbs,
    description,
    title,
    breadCrumbstitle,
    structuredData,
    collectionStructuredData,
    itemListStructuredData,
    productStructuredData,
  } = useBreadcrumbs(type, data);

  if (!data?.breadCam) return null;

  return (
    <>
      <Head>
        {type === "product" && (
          <>
            <title>
              {data?.data[0]?.name ? `${data?.data[0]?.name}` : "Miah Shop"}
            </title>
            <meta
              name="description"
              content={
                data?.data[0]?.meta_description
                  ? `${data?.data[0]?.meta_description}`
                  : description
              }
            />
          </>
        )}

        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        {collectionStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(collectionStructuredData),
            }}
          />
        )}
        {itemListStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(itemListStructuredData),
            }}
          />
        )}
        {productStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productStructuredData),
            }}
          />
        )}
      </Head>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <hr className="mb-1" />
      </Box>

      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ marginTop: { xs: "0px", sm: "8px" } }}
      >
        <MuiLink component={NextLink} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>

        {breadCrumbs.map((item, index) => (
          <MuiLink
            key={index}
            component={NextLink}
            href={item.slug}
            underline="hover"
            color="inherit"
          >
            {item.title}
          </MuiLink>
        ))}

        {type !== "product" && (
          <Typography color="text.primary">{breadCrumbstitle}</Typography>
        )}
      </Breadcrumbs>
    </>
  );
}
