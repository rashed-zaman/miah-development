import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function PromoPant({ promotionDataLaye }) {
  // hooks
const route = useRouter();
  // methods
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDataLaye(id, name, slot, location);
  };

  return (
    <Box
      className="ps-home__col-6"
      sx={{ padding: { sm: "0px 0px 6px 3px" }, cursor: "pointer" }}
      onClick={() => route.push("/men/pants")}
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
            src="https://images.miah.shop/banner/300425/eid-pant-desktop-300425.jpg"
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
            src="https://images.miah.shop/banner/300425/eid-pant-mobile-300425.jpg"
            alt="Saree"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type">Check out our variety of pants, featuring denim, casual<br/> and sleek styles made from high-quality, comfortable fabrics</p>
          <h4 className="ps-promo__title">{"Pant Collection"}</h4>
          <div className="ps-promo__link">
            <Link href="/men/pants">
              <a>
                <span>Shop Now</span>
                <img src="/img/icon/arrow-long-right.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
