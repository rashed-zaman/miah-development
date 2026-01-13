import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import Link from "next/link";
import { Box } from "@mui/material";
import { IMAGE_URL } from "../../../../service/serviceConfig";

export default function RecentlyViewed() {
  const recent = useSelector((state) => state.auth.recentView);
  const persist = useSelector((state) => state);

  useEffect(() => {
    // console.log(recent);
  }, [persist]);

  return (
    <>
      <section className="ps-bought">
        <div className="container">
          <h4 className="ps-bought__title">Recently viewed items</h4>
          <div className="ps-bought__wapper">
            <ul className="ps-bought__product">
              {recent &&
                recent.map((product, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/product/${product.slug}`}>
                        <a>
                          <div className="ps-product ps-product--standard cursor-pointer">
                            <div className="ps-product__thumbnail">
                              <figure>
                                <img
                                  className="ps-product__image-default"
                                  src={`${IMAGE_URL}/${product.img}`}
                                  alt={product.name}
                                />
                                <img
                                  className="ps-product__image-back"
                                  src={`${IMAGE_URL}/${product.img}`}
                                  alt={product.name}
                                />
                              </figure>
                            </div>
                            <div className="ps-product__content">
                              <h5 className="ps-product__title">
                                {product.name}
                              </h5>
                              <div className="ps-product__meta">
                                <span className="ps-product__price">
                                  TK {product.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            {/* <Swiper
              slidesPerView={1}
              spaceBetween={10}
              centeredSlides={true}
              className="recently-viewed-swiper"
              navigation={true}
              loop={true}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2500,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
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
              {recent &&
                recent.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <Link href={`/product/${item.slug}`}>
                        <a>
                          <div className="ps-product ps-product--standard">
                            <div className="ps-product__thumbnail">
                              <figure>
                                <img
                                  className="ps-product__image-default"
                                  src={`${IMAGE_URL}/${item.img}`}
                                  alt={item.name}
                                  width="100%"
                                />
                                <img
                                  className="ps-product__image-back"
                                  src={`${IMAGE_URL}/${item.img}`}
                                  alt={item.name}
                                  width="100%"
                                />
                              </figure>
                            </div>
                            <div className="ps-product__content">
                              <h5 className="ps-product__title">{item.name}</h5>
                              <div className="ps-product__meta">
                                <span className="ps-product__price">
                                  TK {item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper> */}
          </div>
        </div>
      </section>
    </>
  );
}
