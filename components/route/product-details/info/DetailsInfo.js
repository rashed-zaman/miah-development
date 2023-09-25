import React from "react";
import { Box } from "@mui/material";
export default function DetailsInfo({ product, selectedVariation, sku }) {
  return (
    <>
      {/* <div className="ps-product__branch">{product.brand}</div> */}
        <h4 className="ps-product__title">{product.name}</h4>
        <h5 className="ps-product__title_bangla">{product.name_bangla}</h5>
      {/* <div style={{display:'flex'}}>
      </div> */}
      {/* <h6 className="ps-product_brand">{product.brand}</h6> */}
      {/* <p className="mb-0"><b>Color: {product.color} </b></p> */}
      <div className="originSpace">
        <p className="mt-0"><b>Sku: {sku.sku} </b></p>
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
        </Box>
        {product.discount && (
          <span className="ps-product__del" style={{color:'red'}}>TK {product.discount}</span>
        )}
      </div>
    </>
  );
}
