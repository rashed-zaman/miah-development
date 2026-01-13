import React from "react";
import { IMAGE_URL } from "../../../../service/serviceConfig";

export default function ColorVariation({
  variants,
  setSelectedVariation,
  selectedVariationId,
}) {
  // methods
  const changeColorVariation = (color) => {
    setSelectedVariation(color);
  };

  return (
    <div className="ps-product__group">
      <h6>Color</h6>
      <div className="ps-product__color">
        {variants &&
          variants.map((color, index) => {
            return (
              <div className="custom-control" key={color.id}>
                <label
                  className={
                    selectedVariationId === color.id
                      ? "custom-1-border custom-control-label"
                      : "custom-control-label"
                  }
                >
                  <img
                    onClick={() => changeColorVariation(color)}
                    src={`${IMAGE_URL + "s_thumb/"}${color.vImage[0].img}`}
                    alt={color.vImage[0].img}
                  />
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}
