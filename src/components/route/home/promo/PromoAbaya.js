"use client";

import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PromoAbaya({ promotionDataLaye }) {
  // hooks
  const route = useRouter();
  // methods
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDataLaye(id, name, slot, location);
  };

  return (
    <Box
      className="ps-home__col-6"
      sx={{ padding: { sm: "6px 0px 6px 3px" }, cursor: "pointer" }}
      onClick={() => route.push("/women/abaya")}
    >
      <Box
        className="ps-promo ps-promo--center"
        sx={{
          backgroundImage: `url("/img/bckgnd.png")`,
          backgroundSize: "cover",
          minHeight: "600px",
          backgroundPosition: "center",
        }}
        onClick={() =>
          handlePromotionDataLaye(
            "shop abaya",
            "abaya home",
            "abaya home banner",
            "abaya home top banner"
          )
        }
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
              xl: "block",
            },
          }}
        >
          <img
            className="ps-promo__banner"
            loading="lazy"
            src="https://d25xyv9ldicae3.cloudfront.net/media/home_16_07_24/miah_summer_abaya_desktop.jpg"
          />
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "block",
              md: "block",
              lg: "none",
              xl: "none",
            },
            marginBottom: "6px",
          }}
        >
          <img
            className="ps-promo__banner"
            loading="lazy"
            src="https://d25xyv9ldicae3.cloudfront.net/media/home_16_07_24/miah_summer_abaya_mobile.jpg"
            alt="Saree"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type">Elegant And Modern</p>
          <h4 className="ps-promo__title">{"Abaya Designs"}</h4>
          <div className="ps-promo__link">
            <Link href="/women/abaya">
                <span>Shop Now</span>
                <img src="/img/icon/arrow-long-right.svg" alt="" />
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
