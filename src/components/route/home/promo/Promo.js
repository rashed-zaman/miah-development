import React from "react";
import { promotionDatalayer } from "../../../../service/data-layer-creator/dataLayerCreator";
import PromoBestSeller from "./PromoBestSeller";
// import PromoMen from "./PromoMen";
// import PromoWomen from "./PromoWomen";
import PromoTshirt from "./PoromoTshirt";
import PromoPanjabi from "./PromoPanjabi";
import PromoShirt from "./PromoShirt";
import PromoPant from "./PromoPant";
import PromoSalwar from "./PromoSalwar";
import PromoAbaya from "./PromoAbaya";

export default function Promo() {


  return (
    <div className="ps-home__promo">
      <div className="ps-home__row">
        {/* <PromoMen promotionDataLaye={handlePromotionDataLaye} />
        <PromoWomen promotionDataLaye={handlePromotionDataLaye} /> */}
        <PromoShirt />
        <PromoTshirt />
        <PromoPant />
        <PromoPanjabi />
        <PromoBestSeller  />
        <PromoSalwar />
        <PromoAbaya />
      </div>
    </div>
  );
}
