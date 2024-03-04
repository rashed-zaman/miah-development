import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

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
        onClick={() => route.push("/exclusive-trendz-product/trending")}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <img
            className="ps-promo__banner"
            src="https://d25xyv9ldicae3.cloudfront.net/media/home/best-seller-mobile.jpg"
            alt="Salwar Kameez"
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <img
            className="ps-promo__banner"
            src="https://d25xyv9ldicae3.cloudfront.net/media/home/Best_Seller.jpg"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type">Bestsellers</p>
          <h4 className="ps-promo__title">
            The latest trends <br />
            this season
          </h4>
          <div className="ps-promo__link">
            <Link href="/exclusive-trendz-product/trending">
              <a>
                <span>Shop Now</span>
                <img src="/img/icon/arrow-long-right.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}
