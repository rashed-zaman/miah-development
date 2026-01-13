import React from "react";
import { Box, Typography } from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useBreakpoint from "../../../hooks/useBreakpoint";

const MiahBreadCrumbs = dynamic(() => import("../breadcrumbs/MiahBreadCrumbs"));



export default function ProductBanner({data,type}) {
  const { categoryList, subCategoryList } = data;

  // ===========hooks========
  const router = useRouter();
  const { isXs } = useBreakpoint();


  const numberOfSlideToShow = () => {
    if (subCategoryList.length > 0) {
      if (subCategoryList.length == 1) {
        return 1;
      }
      if (subCategoryList.length == 2) {
        return 2;
      }
      if (subCategoryList.length > 2) {
        return 3;
      }
    } else if (categoryList.length) {
      if (categoryList.length == 1) {
        return 1;
      }
      if (categoryList.length == 2) {
        return 2;
      }
      if (categoryList.length > 2) {
        return 3;
      }
    } else {
      return 3;
    }
  };

  const settings = {
    arrows: true,
    speed: 500,
    slidesToShow: numberOfSlideToShow(),
    slidesToScroll: 1,
    variableWidth: true,
  };

  const { category, rootCategory, subCategory } = router.query;

  const goToCategory = (slug) => {
    router.push(`/${rootCategory}/${slug}`);
  };

  const goToSubCategory = (slug) => {
    router.push(`/${rootCategory}/${category}/${slug}`);
  };

  return (
    <div className="container mt-4">
      <div className="ps-shop__banner">
        <div className="row">
          <div className="col-md-4">
            <div className="shop-banner-text-container">
              <div className="shop-banner-text-content">
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h1"
                  color="text.primary"
                >
                  <b className="ps-shop__name">
                    {data.breadCam.body_title
                      ? data.breadCam.body_title
                      : "Title"}
                  </b>
                </Typography>
                {
                  isXs &&
                    <Box>
                      {data.product.data && (
                        <div style={{marginBottom:'1rem'}}>
                          <MiahBreadCrumbs
                            data={data}
                            type={type}
                          />
                        </div>
                      )}
                    </Box>
                }
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  {data.breadCam.body_description ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.breadCam.body_description,
                      }}
                    />
                  ) : (
                    <p>Description</p>
                  )}
                </Box>
              </div>
            </div>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                component="section"
                className="category-slide px-3"
                sx={{ marginBottom: { xs: 3 }, marginTop: { xs: 2 } }}
              >
                <Slider {...settings}>
                  {subCategoryList.length > 0
                    ? subCategoryList.map((sub, index) => {
                        return (
                          <button
                            key={index}
                            className="category-slide-button cursor-pointer"
                            onClick={() => goToSubCategory(sub.slug)}
                          >
                            {sub.sub_category}
                          </button>
                        );
                      })
                    : categoryList.map((cat, catIndex) => {
                        return (
                          <button
                            key={catIndex}
                            className="category-slide-button cursor-pointer"
                            onClick={() => goToCategory(cat.slug)}
                          >
                            {cat.category}
                          </button>
                        );
                      })}
                </Slider>
              </Box>
            </Box>
          </div>
          <div className="col-md-8">
            <img
              src={
                data.breadCam.big_image
                  ? "https://images.miah.shop/banner/" + data.breadCam.big_image
                  : "/img/banners/1600_300.jpg"
              }
              alt={data.breadCam.alterText}
            />
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Box
                component="section"
                className="category-slide px-3"
                sx={{ marginBottom: { xs: 3 }, marginTop: { xs: 2 } }}
              >
                <Slider {...settings}>
                  {subCategoryList.length > 0
                    ? subCategoryList.map((sub, index) => {
                        return (
                          <button
                            key={index}
                            className="category-slide-button cursor-pointer"
                            onClick={() => goToSubCategory(sub.slug)}
                          >
                            {sub.sub_category}
                          </button>
                        );
                      })
                    : categoryList.map((cat, catIndex) => {
                        return (
                          <button
                            key={catIndex}
                            className="category-slide-button cursor-pointer"
                            onClick={() => goToCategory(cat.slug)}
                          >
                            {cat.category}
                          </button>
                        );
                      })}
                </Slider>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>

    // <div className="ps-shop__banner">
    //   <img src="/img/banners/1600_300.jpg" alt="" style={{height: '200px'}} />
    // </div>
    // <div className="ps-shop__banner">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-4 col-12">
    //         <h1>Men</h1>
    //       </div>
    //       <div className="col-md-8 col-12">
    //         <img
    //           src="/img/banners/1600_300.jpg"
    //           alt=""
    //           style={{ height: "200px" }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
