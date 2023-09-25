import React from 'react'
import Link from "next/link";
import Box from "@mui/material/Box";
import { promotionDatalayer } from "../../../../service/data-layer-creator/dataLayerCreator";

export default function EidBanner() {
    const handlePromotionDataLaye = (id, name, slot, location) => {
        promotionDatalayer(id, name, slot, location);
    };
    return (
        <>
            <section className="home-banner-section" style={{marginTop:'5px'}}>

                <Box sx={{ display: { xs: "none",sm: "block"} }}>
                    <img
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                        className="ps-promo__banner"
                        src="https://d25xyv9ldicae3.cloudfront.net/media/new_banner.jpg"
                        alt="eid collection"
                    />
                </Box>
                <Box sx={{ display: { xs: "block",sm: "none"}}}>
                    <img
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                        className="ps-promo__banner"
                        src="https://d25xyv9ldicae3.cloudfront.net/media/new_banner_mobile.jpg"
                        alt="eid collection"
                    />
                </Box>
                <div className="home-btn-areab">
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
    )
}
