"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { productDetailsDatalayer } from "@/service/data-layer-creator/dataLayerCreator";
import React, { useEffect, useState } from "react";
import HeadComponent from "../formUI/head/HeadComponent";
import MiahBreadCrumbs from "../breadcrumbs/MiahBreadCrumbs";
import Gallery from "@/components/route/product-details/gallery/Gallery";
import { Box } from "@mui/material";
import SizeVariation from "@/components/route/product-details/info/SizeVariation";
import AddToBag from "@/components/route/product-details/info/AddToBag";
import DetailsInfo from "@/components/route/product-details/info/DetailsInfo";
import ColorVariation from "@/components/route/product-details/info/ColorVariation";
import SizeChart from "@/components/route/product-details/size-chart/SizeChart";
import Discount from "@/components/route/product-details/discount/Discount";
import Frequent from "@/components/route/product-details/frequent/Frequent";
import RecentlyViewed from "@/components/route/product-details/recently-viewed/RecentlyViewed";

export default function LayoutSingleProduct({
  responseData,
  product,
  variants,
}) {
  // ========== hooks ===========
  const { isXs } = useBreakpoint();

  // ========== local state ===========
  const [selectedVariation, setSelectedVariation] = useState(
    variants[0] ? variants[0] : []
  );
  const [sku, setSku] = useState({ sku: "", id: "" });
  const [size, setSize] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [show, setShow] = useState(true);

  // ========== methods ================
  const handleSizeChanged = (size) => {
    setSku({
      ...sku,
      sku: size.sku,
      id: size.sku_id,
    });

    setSize(size.size);
    setSelectedSizeId(size.id);
  };

  const selectDefaultVariation = () => {
    const qtyitem = variants.find((item) => item.inventory > 0);
    qtyitem ? setSelectedVariation(qtyitem) : setSelectedVariation(variants[0]);
  };

  const checkProductSize = (variation) => {
    if (variation.vSize.length > 0) {
      handleSizeChanged(variation.vSize[0]);
    }
  };

  // ========== side effects ===========
  useEffect(() => {
    selectDefaultVariation();
    // setSelectedVariation(variants[0] ? variants[0] : []);
    // setSku({
    //   ...sku,
    //   sku: selectedVariation.sku,
    //   id: selectedVariation.sku_id,
    // });
  }, [product]);

  useEffect(() => {
    setSku({
      ...sku,
      sku: selectedVariation.sku,
      id: selectedVariation.sku_id,
    });
    setSize("");
    checkProductSize(selectedVariation);
    productDetailsDatalayer(product, selectedVariation);
  }, [selectedVariation]);

  useEffect(() => {
    var lastval = 0;
    const controlNavbar = () => {
      let y = window.scrollY;
      if (y > lastval) {
        setShow(false);
      } else if (y < lastval) {
        setShow(true);
      } else {
        setShow(false);
      }
      lastval = y;
    };
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <HeadComponent data={responseData} type="details" />
      <div className="ps-product--layout-2">

      <div className="container">

        <MiahBreadCrumbs data={responseData} type="product" />
        <div className="ps-product--detail">
          <div className="row">
            <Gallery variation={selectedVariation} />
            <div className="col-12 col-md-5">
              <div className="ps-product__info">
                <div className={`mobile-fixed-tab ${show}`}>
                  <Box
                    sx={{ display: { xs: "block", sm: "none" }, mx: "20px" }}
                  >
                    <div className="ps-product__meta">
                      <span className="ps-product__price">
                        &#2547; {product.sales_cost}
                      </span>
                      {product.discount && (
                        <span
                          className="ps-product__del"
                          style={{ color: "red" }}
                        >
                          &#2547; {product.discount}
                        </span>
                      )}
                    </div>
                    {size ? (
                      <div className="ps-product__feature">
                        <SizeVariation
                          selectedVariation={selectedVariation}
                          setSelectedVariation={setSelectedVariation}
                          setSize={handleSizeChanged}
                          selectedSizeId={selectedSizeId}
                        />
                      </div>
                    ) : null}
                    <AddToBag
                      product={product}
                      selectedVariation={selectedVariation}
                      sku={sku}
                      size={size}
                    />
                  </Box>
                </div>
                {!isXs && (
                  <Box>
                    <DetailsInfo
                      product={product}
                      selectedVariation={selectedVariation}
                      sku={sku}
                    />
                  </Box>
                )}
                <div className="ps-product__feature">
                  <ColorVariation
                    variants={variants}
                    selectedVariationId={selectedVariation.id}
                    setSelectedVariation={setSelectedVariation}
                  />

                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <SizeVariation
                      selectedVariation={selectedVariation}
                      setSelectedVariation={setSelectedVariation}
                      setSize={handleSizeChanged}
                      selectedSizeId={selectedSizeId}
                    />
                  </Box>
                  <SizeChart responseData={responseData} />
                </div>
                {isXs && (
                  <Box>
                    <DetailsInfo
                      product={product}
                      selectedVariation={selectedVariation}
                      sku={sku}
                    />
                  </Box>
                )}
                <div>
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <AddToBag
                      product={product}
                      selectedVariation={selectedVariation}
                      sku={sku}
                      size={size}
                    />
                  </Box>
                </div>
                <Discount />
                <div className="mt-5">
                  <section className="ps-product--desc">
                    <div className="container">
                      <div className="ps-product__content text-justify">
                        <p className="mb-1">
                          <b>Description</b>
                        </p>
                        <div
                          className="summer-note-video"
                          dangerouslySetInnerHTML={{
                            __html: product.sales_info,
                          }}
                        />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="mt-5">
                  <section className="ps-product--desc">
                    <div className="container">
                      <div className="ps-product__content text-justify">
                        <p className="mb-1">
                          <b>Disclaimer : </b>
                        </p>
                        <div className="summer-note-video">
                          {
                            "Please note that product colors may vary slightly due to differences in your device's screen resolution."
                          }
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="mt-5 pl-3">
                  <p>
                    <b>Specification</b>
                  </p>
                  <table className="description-table">
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td>{product.brand}</td>
                      </tr>
                      {product.attributes &&
                        product.attributes.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td data-label="Size">{item.attribute_name}</td>
                              <td data-label="Size">{item.attribute_value}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Frequent relatedProduct={product.relatedProduct} />
        <RecentlyViewed />
      </div>
    </>
  );
}
