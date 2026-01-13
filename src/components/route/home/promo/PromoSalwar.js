
"use client";

import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function PromoSalwar({ promotionDataLaye }) {
  // hooks
  const route = useRouter();

  //
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDataLaye(id, name, slot, location);
  };

  return (
    <Box
      className="ps-home__col-6"
      sx={{
        padding: { sm: "6px 3px 6px 0" },
        cursor: "pointer",
        marginTop: { sm: "0px", xs:"5px" }  // <-- add your desired margin-top here
      }}
      onClick={() => route.push("/women/salwar-kameez")}
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
            "exclusive women",
            "exclusive product for women",
            "home exclusive banner women",
            "home exclusive women"
          )
        }
      >
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
            src="https://images.miah.shop/banner/eid2025/salwarkamiz_mobile.jpg"
            alt="men dress"
          />
        </Box>
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
            src="https://images.miah.shop/banner/eid2025/salwarkamiz_desktop.jpg"
            alt="men dress"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type text-light">A stylish women’s collection that <br/>is comfortable, classy, and always in fashion</p>
          <h4 className="ps-promo__title text-light">Salwar Kameez Collection</h4>
          <div className="ps-promo__link text-light">
            <Link href="/women/salwar-kameez">
             
                <span>Shop Now</span>
                <img src="img/icon/arrow-long-right.svg" alt="" />
            
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
