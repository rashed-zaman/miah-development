import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { promotionDatalayer } from "../../../../service/data-layer-creator/dataLayerCreator";
import { useRouter } from "next/navigation";

export default function PromoAbaya() {
  // hooks
  const route = useRouter();

  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDatalayer(id, name, slot, location);
  };

  return (
    <>
      <Box
        className="ps-home__col-6"
        sx={{
          padding: { sm: "6px 3px 6px 0" },
          display: { xs: "block", sm: "none" },
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
        <div className="ps-promo ps-promo--center">
          <Link href="/women/abaya">
            <a>
              <img
                className="ps-promo__banner"
                loading="lazy"
                src="https://d25xyv9ldicae3.cloudfront.net/media/home_16_07_24/miah_summer_abaya_mobile.jpg"
                alt="Panjabi"
              />
            </a>
          </Link>
          <div className="ps-promo__content">
            <p className="ps-promo__type text-light">Abaya</p>
            <h4 className="ps-promo__title text-light">
              Elegant And Modern Abaya Designs
            </h4>
            <div className="ps-promo__link text-light">
              <Link href="/women/abaya">
                <a>
                  <span>Shop Now</span>
                  <img src="img/icon/arrow-long-right.svg" alt="" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          padding: { sm: "6px 3px 6px 0" },
          display: { xs: "none", sm: "block" },
          cursor: "pointer",
        }}
        onClick={() =>
          handlePromotionDataLaye(
            "shop lungi",
            "lungi home",
            "lungi home banner",
            "lungi home top banner"
          )
        }
      >
        <div
          className="ps-home ps-home--5 mb-5 pb-5"
          onClick={() => route.push("/women/abaya")}
        >
          <section className="ps-video--home-full">
            <div className="ps-video__body">
              <div className="ps-video__thumnail">
                <div style={{ display: "none" }} id="video1">
                  <iframe
                    width="560"
                    height="315"
                    // src="https://www.youtube.com/embed/wJ5pLeSfIkw"
                    src=""
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <img
                  className="rps-video__image"
                  loading="lazy"
                  src="https://d25xyv9ldicae3.cloudfront.net/media/home_16_07_24/miah_summer_abaya_desktop.jpg"
                />
              </div>
              <div className="rps-video__content">
                <h2 className="ps-video__title">
                  Elegant And Modern <br /> Abaya Designs
                  <br />
                </h2>
                <Link href="/women/abaya">
                  <a className="ps-btn ps-btn--rounded ps-btn--danger">
                    Shop Abaya
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Box>
    </>
  );
}
