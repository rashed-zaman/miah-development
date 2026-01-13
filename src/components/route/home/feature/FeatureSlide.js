import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

import { IMAGE_URL } from "../../../../service/serviceConfig";
import Link from "next/link";
import { Box } from "@mui/material";
export default function FeatureSlide({ products }) {
  return (
    <>
      <Box>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          className="home-feature-swiper"
          navigation={true}
          loop={true}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {products &&
            products.map((product, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link href={`/product/${product.slug}`}>
                    <a  rel="nofollow">
                      <div className="ps-product ps-product--standard">
                        <div className="ps-product__thumbnail">
                          <figure>
                            <img
                              className="ps-product__image-default"
                              src={`${IMAGE_URL}m_thumb/${product.back_img}`}
                              alt={product.name}
                            />
                            <img
                              className="ps-product__image-back"
                              src={`${IMAGE_URL}m_thumb/${product.front_img}`}
                              alt={product.name}
                            />
                          </figure>
                        </div>
                        <div className="ps-product__content">
                          <h5 className="ps-product__title">{product.name}</h5>
                          <div className="ps-product__meta">
                            <span className="ps-product__price">
                              TK {product.sales_cost}
                            </span>
                            {product.discount && (
                              <span className="ps-product__del">
                                TK {product.discount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
    </>
  );
}
