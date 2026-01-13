import React from "react";
import ColorVariation from "./ColorVariation";
import SizeVariation from "./SizeVariation";

export default function Feature({ variants, setSelectedVariation, selectedVariation }) {
  return (
    <div className="ps-product__feature">
      <ColorVariation
        variants={variants}
        setSelectedVariation={setSelectedVariation}
      />
      <SizeVariation selectedVariation={selectedVariation} />
    </div>
  );
}
