import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PromoTshirt({ promotionDataLaye }) {

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
      onClick={() => route.push("/men/t-shirt")}
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
            "exclusive t-shirt",
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
            loading="lazy"
            src="https://images.miah.shop/banner/eid2025/tshirt_mobile.jpg"
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
            src="https://images.miah.shop/banner/eid2025/tshirt_desktop.jpg"
            alt="men dress"
          />
        </Box>
        <div className="ps-promo__content">
          <p className="ps-promo__type text-light">A high-quality tee designed for <br/> ultimate comfort, featuring an odor-free</p>
          <h4 className="ps-promo__title text-light">T-Shirt Collection</h4>
          <div className="ps-promo__link text-light">
            <Link href="/men/t-shirt">
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
