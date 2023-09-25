import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { promotionDatalayer } from "../../../../service/data-layer-creator/dataLayerCreator";
// import EidBanner from "./EidBanner";

export default function Banner() {
  const handlePromotionDataLaye = (id, name, slot, location) => {
    promotionDatalayer(id, name, slot, location);
  };
  return (
    <>
      <section className="home-banner-section">
        <Box sx={{ display: { xs: "none",sm: "block"} }}>
          <video
            controls={true}
            id="desktop-video"
            playsInline
            autoPlay
            muted
            loop
            poster="/img/1920x1080-01-01-01.jpg"
          >
            <source
              src="https://d25xyv9ldicae3.cloudfront.net/media/miah_banner_desktop_19032023.mp4"
              type="video/mp4"
            />
          </video>
        </Box>

        <Box sx={{ display: { xs: "block",sm: "none"}}}>
          <video
            style={{ width: "100%", display: "block", objectFit: "cover" }}
            controls={true}
            playsInline={true}
            muted={true}
            autoPlay={true}
            loop={true}
            poster="/img/768x1195-01-01-01.jpg"
          >
            <source
              src="https://d25xyv9ldicae3.cloudfront.net/media/miah_banner_mobile_19032023.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        {/* <div className="home-btn-area">
          <div className="row  justify-content-center">
            <div className="col-sm-12 col-md-6 text-center">
              <h4 className="text-light ps-promo__title" >Elevate Your Eid Style</h4>
            </div>
          </div>
          <div className="row  justify-content-center">
            <div className="col-sm-12 col-md-4 col-lg-2 text-center">
              <Link href="/exclusive-trendz-product/festiveProduct">
                <a>
                  <button
                    className="click-btn btn-home-exclusive-men"
                    onClick={() =>
                      handlePromotionDataLaye(
                        "shop for Eid",
                        "Eid collection banner top",
                        "Eid Collection",
                        "top banner Eid Collection"
                      )
                    }
                  >
                    Eid Collection
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div> */}
        <div className="home-btn-area">
                    <div className="row  justify-content-center">
                        <div className="col-sm-12 col-md-4 col-lg-3  text-center">
                            <Link href="/men">
                                <a>
                                    <button
                                        className="click-btn btn-home-exclusive-men"
                                        onClick={() =>
                                            handlePromotionDataLaye(
                                                "shop for men",
                                                "men banner top",
                                                "shop men",
                                                "top banner shop men"
                                            )
                                        }
                                    >
                                        SHOP FOR MEN
                                    </button>
                                </a>
                            </Link>

                            <Link href="/women">
                                <a>
                                    <button
                                        className=""
                                        onClick={() =>
                                            handlePromotionDataLaye(
                                                "shop for women",
                                                "women banner top",
                                                "shop women",
                                                "top banner shop women"
                                            )
                                        }
                                    >
                                        SHOP FOR WOMEN
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
      </section>
    </>
  );
}
