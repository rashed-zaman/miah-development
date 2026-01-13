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
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDatalayer(id, name, slot, location);
  };

  return (
    <div className="ps-home__promo">
      <div className="ps-home__row">
        {/* <PromoMen promotionDataLaye={handlePromotionDataLaye} />
        <PromoWomen promotionDataLaye={handlePromotionDataLaye} /> */}
        <PromoShirt promotionDataLaye={handlePromotionDataLaye}/>
        <PromoTshirt promotionDataLaye={handlePromotionDataLaye}/>
        <PromoPant promotionDataLaye={handlePromotionDataLaye}/>
        <PromoPanjabi promotionDataLaye={handlePromotionDataLaye}/>
        <PromoBestSeller promotionDataLaye={handlePromotionDataLaye} />
        <PromoSalwar promotionDataLaye={handlePromotionDataLaye}/>
        <PromoAbaya promotionDataLaye={handlePromotionDataLaye}/>
      </div>
    </div>
  );
}
