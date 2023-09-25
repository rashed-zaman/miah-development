import React from "react";
import { promotionDatalayer } from "../../../../service/data-layer-creator/dataLayerCreator";
import PromoBestSeller from "./PromoBestSeller";
import PromoMen from "./PromoMen";
import PromoWomen from "./PromoWomen";

export default function Promo() {
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDatalayer(id, name, slot, location);
  };

  return (
    <div className="ps-home__promo">
      <div className="ps-home__row">
        <PromoMen promotionDataLaye={handlePromotionDataLaye} />
        <PromoWomen promotionDataLaye={handlePromotionDataLaye} />
        <PromoBestSeller promotionDataLaye={handlePromotionDataLaye} />
      </div>
    </div>
  );
}
