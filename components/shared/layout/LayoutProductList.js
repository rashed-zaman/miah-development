import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import HeadComponent from "../formUI/head/HeadComponent";
import DesktopFilter from "../filter/DesktopFilter";
import { Box, Grid } from "@mui/material";
import { productListDatalayer } from "../../../service/data-layer-creator/dataLayerCreator";
import FilterOptions from "../filter/FilterOptions";
import FilterTopBar from "../filter/FilterTopBar";

// import Breadcrumb from "../bread-crumbs/Breadcrumb";
// import Filter from "../filter/Filter";
// import FilterOptions from "../filter/FilterOptions";

// import Product from "../../core/product/Product";
// import ProductBanner from "../banner/ProductBanner";
// import MobileFilter from "../filter/MobileFilter";
// import ProductPagination from "../pagination/ProductPagination";
// import MiahBreadCrumbs from "../breadcrumbs/MiahBreadCrumbs";

const Product = dynamic(() => import("../../core/product/Product"));
const ProductBanner = dynamic(() => import("../banner/ProductBanner"));
const MobileFilter = dynamic(() => import("../filter/MobileFilter"));
const ProductPagination = dynamic(() =>
  import("../pagination/ProductPagination")
);
const MiahBreadCrumbs = dynamic(() => import("../breadcrumbs/MiahBreadCrumbs"));

export default function LayoutProductList({ data, type }) {
  // ================= hooks ===============
  const router = useRouter();

  // ================= local state ============

  const [filter, setFilter] = useState(true);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [productLayoutClass, setProductLayoutClass] = useState(
    "col-6 col-md-4 col-lg-3 px-1"
  );

  // ================= side effects ============
  useEffect(() => {
    productListDatalayer(data, type);
  }, [data, type]);

  return (
    <>
      <HeadComponent data={data} />
      <div className="ps-shop ps-shop--grid">
        <ProductBanner data={data} />
        <div className="container product-container">
          {data.product.data && (
            <>
              <MiahBreadCrumbs
                data={data}
                type={type}
              />
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

          {/* <DesktopFilter data={data} setMobileFilter={setMobileFilter} /> */}

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={filter ? 3 : 0}
              sx={{ display: { xs: "none", sm: filter ? "block" : "none" } }}
            >
              <FilterOptions
                data={data}
                type="mobile"
                setMobileFilter={setMobileFilter}
              />
            </Grid>
            <Grid item xs={12} md={filter ? 9 : 12}>
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
                        <p>No Product Found</p>
                      </div>
                    )}
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>

          {/* <div
            className="product-filter-container"
            style={{ width: filter ? "20%" : "0" }}
          >
            <div className="row">
              <div className="col-8">
                <p className="text-center" onClick={() => setFilter(false)}>
                  FILTER BY
                </p>
              </div>
              <div className="col-4">
                <IconButton
                  aria-label="delete"
                  onClick={() => setFilter(false)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </div>
            </div>
            <FilterOptions />
          </div> */}
          {data.product.data && <ProductPagination products={data.product} />}
        </div>
      </div>
      <MobileFilter
        drawer={mobileFilter}
        setMobileFilter={setMobileFilter}
        setFilter={setFilter}
        data={data}
      />
    </>
  );
}
