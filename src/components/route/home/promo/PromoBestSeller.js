"use client";

import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PromoBestSeller({ promotionDataLaye }) {
  // hooks
  const route = useRouter();

  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDataLaye(id, name, slot, location);
  };

  return (
    <Box
      className="ps-home__col-12 cursor-pointer"
      onClick={() =>
        handlePromotionDataLaye(
          "bestsellers",
          "bestsellers home",
          "bestsellers home banner",
          "bestsellers home banner type"
        )
      }
    >
      <div
        className="ps-promo ps-promo--center"
        onClick={() => route.push("/men/lungi")}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <img
            className="ps-promo__banner"
            loading="lazy"
            src="https://images.miah.shop/banner/eid2025/lungi_mobile.jpg"
            alt="Salwar Kameez"
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <img
            className="ps-promo__banner"
            loading="lazy"
            src="https://images.miah.shop/banner/eid2025/lungi_desktop_v1.jpg"
          />
        </Box>
        <div className="ps-promo__content">
          {/* <p className="ps-promo__type">Bestsellers</p> */}
          <h4 className="ps-promo__title">
           Most Comfortable<br />
          {" Men's Fashion Wear"}
          </h4>
          <div className="ps-promo__link">
            <Link href="/men/lungi">
    
                <span>Shop Lungi</span>
                <img src="/img/icon/arrow-long-right.svg" alt="" />
  
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}
