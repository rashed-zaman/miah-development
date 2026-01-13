import React from "react";
import { Box } from "@mui/material";
import CopyText from "../../../core/copy-text/CopyText";
import ShareContent from "../../../core/share/ShareContent";
import { useRouter } from "next/navigation";



export default function DetailsInfo({ product, selectedVariation, sku }) {
  const router = useRouter();
  const fullPath =
    typeof window !== 'undefined'
      ? `${window.location.origin}${router.asPath}`
      : ''
  return (
    <>
      {/* <div className="ps-product__branch">{product.brand}</div> */}
        <h1 className="ps-product__title">{product.name} <ShareContent text={fullPath} /> </h1>
        <h2 className="ps-product__title_bangla">{product.name_bangla}</h2>
      {/* <div style={{display:'flex'}}>
      </div> */}
      {/* <h6 className="ps-product_brand">{product.brand}</h6> */}
      {/* <p className="mb-0"><b>Color: {product.color} </b></p> */}
      <div className="originSpace">
        <p className="mt-0 text-upper"><b>Sku: {sku.sku} </b> <CopyText text={sku.sku}/> </p>
        <p><small> <b>Country of Origin: {product.country}</b> </small></p>
      </div>
      {/* <div className="ps-product__type">
        <div className="ps-product__item">
          <span className="text">Color</span>
          <span className="text-bold">{product.color}</span>
        </div>
        <div className="ps-product__item">
          <span className="text">Sku</span>
          <span className="text-bold">{selectedVariation.sku}</span>
        </div>
        <div className="ps-product__item">
          <span className="text">Country of Origin</span>
          <span className="text-bold">{product.country}</span>
        </div>
      </div> */}
      <div className="ps-product__meta">
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <span className="ps-product__price">TK {product.sales_cost}</span>
          {product.discount && (
            <span className="ps-product__del" style={{color:'red'}}>TK {product.discount}</span>
          )}
        </Box>
      </div>
    </>
  );
}
