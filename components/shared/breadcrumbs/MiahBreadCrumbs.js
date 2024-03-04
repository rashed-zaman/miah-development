import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import Link from "next/link";
import Head from "next/head";

export default function MiahBreadCrumbs({ type, data }) {
  // =========================== local state ===================
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [title, setTitle] = useState("");
  const [structuredData, setstructuredData] = useState({});

  // ========================= methods ========================

  const createBreadCumbs = () => {
    setBreadCrumbs([]);
    if (type === "rootCategory") {
      setTitle(data.breadCam.root_category);
    } else if (type === "category") {
      const categoryBreads = [
        {
          title: data.breadCam.root_category,
          slug: `/${data.breadCam.department_slug}`,
        },
      ];
      setBreadCrumbs(categoryBreads);
      setTitle(data.breadCam.category);
    } else if (type === "subcategory") {
      const subCatBreads = [
        {
          title: data.breadCam.root_category,
          slug: `/${data.breadCam.department_slug}`,
        },
        {
          title: data.breadCam.category,
          slug: `/${data.breadCam.department_slug}/${data.breadCam.category_slug}`,
        },
      ];
      setBreadCrumbs(subCatBreads);
      setTitle(data.breadCam.sub_category);
    } else if (type === "product") {
      const podctBreads = [
        {
          title: data.breadCam.root_category,
          slug: `/${data.breadCam.department_slug}`,
        },
        {
          title: data.breadCam.category,
          slug: `/${data.breadCam.department_slug}/${data.breadCam.category_slug}`,
        },
        {
          title: data.breadCam.sub_category,
          slug: `/${data.breadCam.department_slug}/${data.breadCam.category_slug}/${data.breadCam.slug}`,
        },
      ];
      setBreadCrumbs(podctBreads);
      setTitle("");
    }
  };

  const createBreadCrumbsSchena = () => {
    if (breadCrumbs.length > 0) {
      let itemList = [];
      breadCrumbs.map((item, index) => {
        let singleItem = {
          "@type": "ListItem",
          position: index,
          item: {
            "@id": "https://miah.shop" + item.slug,
            name: item.title,
          },
        };
        itemList.push(singleItem);
      });

      const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemList,
      };

      setstructuredData(data);
    }
  };
  // side effects
  useEffect(() => {
    createBreadCumbs();
  }, [data]);

  useEffect(() => {
    // console.log(breadCrumbs);
    createBreadCrumbsSchena();
  }, [breadCrumbs]);

  return (
    <>
      {/* <HeadComponent data={data} /> */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key={11} color="inherit" href="/">
          <a>Home</a>
        </Link>
        {breadCrumbs.map((item, pos) => {
          return (
            <Link underline="hover" key={pos} color="inherit" href={item.slug}>
              <a>{item.title}</a>
            </Link>
          );
        })}
        {type === "product" ? null : (
          <Typography key="3" color="text.primary">
            {title}
          </Typography>
        )}
      </Breadcrumbs>
      <hr />
    </>
  );
}
