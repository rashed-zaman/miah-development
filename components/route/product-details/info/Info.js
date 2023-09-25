import React from "react";
import AddToBag from "./AddToBag";

import DetailsInfo from "./DetailsInfo";
import Feature from "./Feature";
import Social from "./Social";

export default function Info({
  product,
  variants,
  setSelectedVariation,
  selectedVariation,
}) {
  return (
    <div className="col-12 col-md-5">
      <div className="ps-product__info">
        <DetailsInfo product={product} selectedVariation={selectedVariation} />
        <Feature
          variants={variants}
          selectedVariation={selectedVariation}
          setSelectedVariation={setSelectedVariation}
        />
        <AddToBag />
        <Social />
      </div>
    </div>
  );
}
