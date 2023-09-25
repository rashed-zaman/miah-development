import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PromoMen({ promotionDataLaye }) {
  // hooks
  const route = useRouter();

  //
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDataLaye(id, name, slot, location);
  };

  return (
    <Box
      className="ps-home__col-6"
      sx={{ padding: { sm: "6px 3px 6px 0" }, cursor:"pointer" }}
      onClick={() => route.push("/exclusive-trendz-product/exclusiveMen")}
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
            "exclusive men",
            "exclusive product for men",
            "home exclusive banner men",
            "home exclusive men"
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
            src="https://d25xyv9ldicae3.cloudfront.net/media/exclusive_shop_for_men_mobile.jpg"
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
            src="https://d25xyv9ldicae3.cloudfront.net/media/exclusive_shop_for_men_desktop.jpg"
            alt="men dress"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type text-light">Exlclusive Shop For Men</p>
          <h4 className="ps-promo__title text-light">Comfort Redefine</h4>
          <div className="ps-promo__link text-light">
            <Link href="/exclusive-trendz-product/exclusiveMen">
              <a>
                <span>Shop Now</span>
                <img src="img/icon/arrow-long-right.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
