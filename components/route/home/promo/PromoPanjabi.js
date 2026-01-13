import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function PromoPanjabi({ promotionDataLaye }) {
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
      onClick={() => route.push("/men/panjabi")}
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
            "exclusive panjabi",
            "exclusive product for men",
            "home exclusive banner men",
            "home exclusive men"
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
            src="https://images.miah.shop/banner/eid2025/panjabi_desktop.jpg"/>
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
            src="https://images.miah.shop/banner/eid2025/panjabi_mobile.jpg"
            alt="Saree"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type">Crafted from premium fabrics <br/> offering comfort and rich Islamic heritage</p>
          <h4 className="ps-promo__title">{"Panjabi Collection"}</h4>
          <div className="ps-promo__link">
            <Link href="/men/panjabi">
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
