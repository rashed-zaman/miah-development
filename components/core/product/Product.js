import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

import { IMAGE_URL } from "../../../service/serviceConfig";
import { shimmer, toBase64 } from "../shimmer-image/shimmer";
import Link from "next/link";
import { setRecentView } from "../../../redux/auth/authActions";
import { useDispatch } from "react-redux";
import WishIcon from "./WishIcon";
import { singleProductDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";

SwiperCore.use([Navigation]);

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [slider, setSlider] = useState(product.variant ? product.variant[0] : []);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingState, setLoadingState] = useState(
    product.variant ? product.variant[0].map(() => false) : []
  );

  const handleVariant = (variant, index) => {
    setActiveIndex(index)
    setSlider(variant);
  };

  const handleImageLoad = (index) => {
    setLoadingState((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const recentViewProduct = () => {
    const temp = {
      id: product.id,
      price: product.sales_cost,
      name: product.name,
      slug: product.slug,
      img: product.variant[0][0].img,
    };
    dispatch(setRecentView(temp));
    singleProductDataLayer(product);
  };

  useEffect(() => {
    setSlider(product.variant ? product.variant[0] : []);
    // Ensure loadingState is initialized on first render or route change
    setLoadingState(product.variant ? product.variant[0].map(() => false) : []);
  }, [product]);

  useEffect(() => {
    setLoadingState(product.variant ? product.variant[0].map(() => true) : []);
  }, []);

  return (
    <div className="ps-product ps-product--standard">
      <div className="ps-product__thumbnail" onClick={recentViewProduct}>
        <Link href={`/product/${product.slug}`}>
          <a>
            <Swiper
              className="product-slide"
              thumbs={{ swiper: thumbsSwiper }}
              loop={true}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {slider &&
                slider.map((slide, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          paddingTop: "100%",
                          backgroundImage: !loadingState[index]
                            ? `url('data:image/svg+xml;base64,${toBase64(
                                shimmer(300, 300)
                              )}')`
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src={`${IMAGE_URL}m_thumb/${slide.img}`}
                          alt={slide.img_title || "Product Image"}
                          loading="lazy"
                          onLoad={() => handleImageLoad(index)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: loadingState[index] ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </a>
        </Link>
        <WishIcon product={product} />
        <div className="ps-product__badge">
          <div className="ps-badge ps-badge--new">{product.ProdyctType}</div>
        </div>
      </div>

      <Swiper
        className="thumbslide"
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={5}
        freeMode={true}
        navigation={false}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        speed={1000}
      >
        {slider.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="slide-thumb"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="ps-product__content">
        <h3 className="ps-product__title">
          <Link href={`/product/${product.slug}`}>
            <a>{product.name}</a>
          </Link>
        </h3>
        {/* <h5 className="ps-product__title">
          <Link href={`/product/${product.slug}`}>
            <a rel="nofollow">{product.name_bangla}</a>
          </Link>
        </h5> */}
        <div className="ps-product__meta">
          <span className="ps-product__price">TK {product.sales_cost}</span>
          {product.discount && (
            <span className="ps-product__del ps-product__price sale">
              Tk {product.discount}
            </span>
          )}
        </div>
      </div>

      <div className="ps-product__footer">
        <div>
          {product.variant &&
            product.variant.map((variant, index) => {
              return (
                <img
                  key={index}
                  onClick={() => handleVariant(variant, index)}
                  style={{ width: "30px", marginRight: "4px", border: activeIndex == index && product.variant.length > 1 ? '1px solid rgba(0,0,0,.2)' : '' }}
                  className="ps-product__image-default"
                  src={`https://images.miah.shop/product/m_thumb/${
                    variant[0] ? variant[0].img : ""
                  }`}
                  alt={variant[0] ? variant[0].img_title : ""}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
