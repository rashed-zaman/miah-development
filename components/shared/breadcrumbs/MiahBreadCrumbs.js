import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";

// import HeadComponent from "../formUI/head/HeadComponent";
const HeadComponent = dynamic(() => import("../formUI/head/HeadComponent"));

export default function MiahBreadCrumbs({
  type,
  data,
  setFilter,
  setMobileFilter,
}) {
  // local state
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [title, setTitle] = useState("");
  const [structuredData, setstructuredData] = useState({});
  // methods

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

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
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
      {title.length ? (
        <div className="row">
          <div className="col-12 col-lg-6">
            <Typography
              variant="h6"
              gutterBottom
              component="h1"
              color="text.primary"
              sx={{ marginTop: 1 }}
            >
              <b className="ps-shop__name">
                {data.breadCam.body_title ? data.breadCam.body_title : "Title"}{" "}
              </b>
              <small
                  style={{ fontSize: "14px", textTransform: "capitalize" }}
                >
                  ({data.totalRow} Products)
                </small>
              {/* {data.totalRow < 20 ? (
                <small
                  style={{ fontSize: "14px", textTransform: "capitalize" }}
                >
                  ({data.totalRow} Products)
                </small>
              ) : (
                <small
                  style={{ fontSize: "14px", textTransform: "capitalize" }}
                >
                  ({Math.floor(data.totalRow / 20) * 20} Products)
                </small>
              )} */}
            </Typography>
          </div>
          <div className="col-12 col-lg-6">
            <div
              className="ps-wrapper--mobile"
              onClick={() => setMobileFilter(true)}
            >
              <a className="ps-wrapper__action filter shop-filter">
                <img
                  className="icon-funnel"
                  src="/img/icon/filter.svg"
                  alt=""
                />
                Filters & Sort
              </a>
            </div>
            <div className="ps-wrapper" style={{ display: "none" }}>
              <div className="ps-wrapper__type"></div>
              <div className="ps-wrapper__onsale"></div>
              <div
                className="ps-wrapper__show"
                onClick={() => setMobileFilter(true)}
              >
                <a className="ps-wrapper__action filter shop-filter">
                  <img
                    className="icon-funnel mr-2"
                    src="/img/icon/filter.svg"
                    alt=""
                  />
                  Filters & Sort
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : // <Typography
      //   variant="h6"
      //   gutterBottom
      //   component="h1"
      //   color="text.primary"
      //   sx={{marginTop: 1 }}
      // >
      //   <b className="ps-shop__name" >{title} </b>
      //   {data.totalRow < 20 ? (
      //     <small style={{ fontSize: "14px", textTransform: "capitalize" }}>
      //       ({data.totalRow} Products)
      //     </small>
      //   ) : (
      //     <small style={{ fontSize: "14px", textTransform: "capitalize" }}>
      //       ({Math.floor(data.totalRow / 20) * 20} Products)
      //     </small>
      //   )}
      // </Typography>

      null}
    </>
  );
}
