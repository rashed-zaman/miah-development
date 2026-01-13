"use client";

import { Box, Grid } from "@mui/material";
import ProductBanner from "../banner/ProductBanner";
import Product from "@/components/core/product/Product";
import { useState, useEffect } from "react";
import MiahBreadCrumbs from "../breadcrumbs/MiahBreadCrumbs";
import FilterTopBar from "../filter/FilterTopBar";
import useBreakpoint from "@/hooks/useBreakpoint";
import FilterOptions from "../filter/FilterOptions";
import Custom404 from "@/404";
import MobileFilter from "../filter/MobileFilter";
import ProductPagination from "../pagination/ProductPagination";

export default function LayoutProductList({ data, type }) {
  const { breadCam } = data;
  const { seoDescription } = breadCam;



  const { isXs } = useBreakpoint();

  // ================= local state ============

  const [showMore, setShoWmore] = useState(false);
  const [bottomDes, setBottomDes] = useState("");
  const [filter, setFilter] = useState(true);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [productLayoutClass, setProductLayoutClass] = useState(
    "col-6 col-md-4 col-lg-3 px-1"
  );

  // =============== methods =================

  const handleShowMore = () => {
    setShoWmore((prevState) => !prevState);
  };

  // ================= side effects ============
  useEffect(() => {
    setBottomDes(seoDescription);
  }, [data, type]);

  return (
    <>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <hr />
      </Box>

      <div className="ps-shop ps-shop--grid">
        <ProductBanner data={data} type={type} />
        <div className="container product-container">
          {data.product.data && (
            <>
              {!isXs && (
                <Box>
                  <MiahBreadCrumbs data={data} type={type} />
                </Box>
              )}
              <FilterTopBar
                data={data}
                setMobileFilter={setMobileFilter}
                setFilter={setFilter}
                filter={filter}
                mobileFilter={mobileFilter}
                setProductLayoutClass={setProductLayoutClass}
              />
            </>
          )}
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{ display: { xs: "none", sm: filter ? "block" : "none" } }}
            >
              <FilterOptions
                data={data}
                type="mobile"
                setMobileFilter={setMobileFilter}
              />
            </Grid>
            <Grid size={{ xs: 12, md: filter ? 9 : 1 }}>
              <div className="ps-shop__product">
                <Box sx={{ padding: { xs: "0px 10px" } }}>
                  <div className="row">
                    {data.product.data ? (
                      data.product.data.map((product, index) => {
                        return (
                          <div key={index} className={productLayoutClass}>
                            <Product product={product} />
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-12">
                        <Custom404 />
                      </div>
                    )}
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, md: 3 }} ></Grid>
        <Grid  size={{ xs: 12, md: 9 }} >
          {data.product.data && <ProductPagination products={data.product} />}
          <hr />
          {bottomDes !== null && (
            <div className="read-more-area">
              <Box
                sx={{
                  height: showMore ? "auto" : "127px",
                  overflow: showMore ? "" : "hidden",
                }}
              >
                <p dangerouslySetInnerHTML={{ __html: bottomDes }} />
              </Box>
              <div className="text-center">
                <button className="read-more" onClick={handleShowMore}>
                  {" "}
                  {showMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      <MobileFilter
        drawer={mobileFilter}
        setMobileFilter={setMobileFilter}
        setFilter={setFilter}
        data={data}
      />
    </>
  );
}
