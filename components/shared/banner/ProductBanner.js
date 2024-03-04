import React from "react";
import { Box, Typography } from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";

const settings = {
  arrows: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
};

export default function ProductBanner({ data }) {
  const { categoryList, subCategoryList } = data;
  const router = useRouter();

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
                {data.breadCam.body_description ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.breadCam.body_description,
                    }}
                  />
                ) : (
                  <p>Description</p>
                )}
              </div>
            </div>
            
            <Box component="section" className="category-slide px-3" sx={{ marginBottom:{xs:3}, marginTop:{xs:2} }}>
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
          </div>
          <div className="col-md-8">
            <img
              src={
                data.breadCam.big_image
                  ? "https://images.miah.shop/banner/" + data.breadCam.big_image
                  : "/img/banners/1600_300.jpg"
              }
              alt=""
            />
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
