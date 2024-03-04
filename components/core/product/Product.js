import React, { useEffect, useState } from "react";
import Image from "next/image";

// Import Swiper React components
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

// install Swiper modules
SwiperCore.use([Navigation]);

export default function Product({ product }) {
  // =================== hooks =================
  const dispatch = useDispatch();

  // =============== local state ==============
  const [slider, setSlider] = useState(
    product.variant ? product.variant[0] : []
  );
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // ============= methods ====================

  const handleVariant = (variant) => {
    setSlider(variant);
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
  }, [product]);

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
                slider.map((slide, slideIndex) => {
                  return (
                    <SwiperSlide key={slideIndex}>
                      <Image
                        src={`${IMAGE_URL}/${slide.img}`}
                        alt={slide.img}
                        width={300}
                        height={300}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                      />
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
        <h5 className="ps-product__title">
          <Link href={`/product/${product.slug}`}>
            <a>{product.name}</a>
          </Link>
        </h5>
        <h5 className="ps-product__title">
          <Link href={`/product/${product.slug}`}>
            <a>{product.name_bangla}</a>
          </Link>
        </h5>
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
                  onClick={() => handleVariant(variant)}
                  style={{ width: "30px", marginRight: "4px" }}
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
