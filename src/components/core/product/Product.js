"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { IMAGE_URL } from "../../../service/serviceConfig";
import { shimmer, toBase64 } from "../shimmer-image/shimmer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import WishIcon from "./WishIcon";
import { singleProductDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";
import { setRecentView } from "@/store/authSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const mainSliderRef = useRef(null);
  const navSliderRef = useRef(null);
  const [slider, setSlider] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbActiveIndex, setThumbActiveIndex] = useState(0);
  const [loadingState, setLoadingState] = useState([]);
  const [navLoadingState, setNavLoadingState] = useState([]);
  const [sliderKey, setSliderKey] = useState(0);
  const [navSliderKey, setNavSliderKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Safe ref setters
  const setMainSliderRef = useCallback((sliderInstance) => {
    if (sliderInstance) {
      mainSliderRef.current = sliderInstance;
    }
  }, []);

  const setNavSliderRef = useCallback((sliderInstance) => {
    if (sliderInstance) {
      navSliderRef.current = sliderInstance;
    }
  }, []);

  // Event handlers with useCallback
  const handleMainBeforeChange = useCallback((current, next) => {
    setActiveIndex(next);
  }, []);

  const handleMainAfterChange = useCallback((current) => {
    setActiveIndex(current);
    // Sync nav slider if available
    if (
      navSliderRef.current &&
      typeof navSliderRef.current.slickGoTo === "function"
    ) {
      requestAnimationFrame(() => {
        navSliderRef.current.slickGoTo(current);
      });
    }
    setIsDragging(false);
  }, []);

  const handleNavBeforeChange = useCallback((current, next) => {
    if (
      mainSliderRef.current &&
      typeof mainSliderRef.current.slickGoTo === "function"
    ) {
      mainSliderRef.current.slickGoTo(next);
    }
  }, []);

  // Main slider settings
  const mainSettings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    swipe: true,
    touchThreshold: 10,
    touchMove: true,
    arrows: true,
    easing: "ease-in-out",
    useCSS: true,
    useTransform: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    beforeChange: handleMainBeforeChange,
    afterChange: handleMainAfterChange,
    onSwipe: () => setIsDragging(true),
    onInit: () => setIsInitialized(true),
    onReInit: () => setIsInitialized(true),
  };

  // Nav slider settings
  const navSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: Math.min(5, slider.length),
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    swipeToSlide: true,
    swipe: true,
    touchThreshold: 10,
    touchMove: true,
    beforeChange: handleNavBeforeChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(4, slider.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(3, slider.length),
        },
      },
    ],
  };

  // Function to preload image
  const preloadImage = (imgSrc) => {
    if (!imgSrc) return;
    const img = new Image();
    img.src = `${IMAGE_URL}m_thumb/${imgSrc}`;
  };

  const handleVariant = (variant, index) => {
    setActiveIndex(0);
    setThumbActiveIndex(index);
    setSlider(variant);
    setLoadingState(variant.map(() => false));
    setNavLoadingState(variant.map(() => false));
    setIsInitialized(false);

    // Force slider reinitialization
    setSliderKey((prev) => prev + 1);
    setNavSliderKey((prev) => prev + 1);
  };

  const handleImageLoad = (index, type = "main") => {
    if (type === "main") {
      setLoadingState((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    } else {
      setNavLoadingState((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleImageError = (index, type = "main") => {
    if (type === "main") {
      setLoadingState((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    } else {
      setNavLoadingState((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleThumbClick = (index) => {
    if (
      mainSliderRef.current &&
      typeof mainSliderRef.current.slickGoTo === "function"
    ) {
      mainSliderRef.current.slickGoTo(index);
    }
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

  // Initialize when product changes
  useEffect(() => {
    if (product?.variant?.[0]) {
      const variant = product.variant[0];
      setSlider(variant);
      setLoadingState(variant.map(() => false));
      setNavLoadingState(variant.map(() => false));
      setActiveIndex(0);
      setThumbActiveIndex(0);
      setIsInitialized(false);

      // Force slider reinitialization
      const timer = setTimeout(() => {
        setSliderKey((prev) => prev + 1);
        setNavSliderKey((prev) => prev + 1);
      }, 50);

      // Preload first image
      if (variant[0]?.img) {
        preloadImage(variant[0].img);
      }

      return () => clearTimeout(timer);
    } else {
      setSlider([]);
      setLoadingState([]);
      setNavLoadingState([]);
    }
  }, [product]);

  // Sync sliders after initialization
  useEffect(() => {
    if (isInitialized && slider.length > 0) {
      const syncTimer = setTimeout(() => {
        if (
          mainSliderRef.current &&
          typeof mainSliderRef.current.slickGoTo === "function"
        ) {
          mainSliderRef.current.slickGoTo(activeIndex);
        }
        if (
          navSliderRef.current &&
          typeof navSliderRef.current.slickGoTo === "function"
        ) {
          navSliderRef.current.slickGoTo(activeIndex);
        }
      }, 100);

      return () => clearTimeout(syncTimer);
    }
  }, [isInitialized, slider.length, activeIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up slider instances
      const cleanupSlider = (sliderRef) => {
        if (sliderRef.current && sliderRef.current.unslick) {
          try {
            sliderRef.current.unslick();
          } catch (e) {
            // Silently fail
          }
        }
      };

      cleanupSlider(mainSliderRef);
      cleanupSlider(navSliderRef);
    };
  }, []);

  // Only render sliders if we have slides
  if (!product) return null;

  return (
    <div className="ps-product ps-product--standard">
      <div
        className="ps-product__thumbnail"
        onClick={recentViewProduct}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`}>
          <div
            className={`main-slider-container ${isDragging ? "dragging" : ""} ${isHovered ? "hovered" : ""}`}
          >
            {slider.length > 0 ? (
              <Slider
                key={`main-slider-${product?.id}-${sliderKey}`}
                {...mainSettings}
                ref={setMainSliderRef}
              >
                {slider.map((slide, index) => {
                  const isLoading = loadingState[index] !== true;

                  return (
                    <div
                      key={`${product?.id}-slide-${index}`}
                      className="slide-item"
                    >
                      <div
                        className="image-container"
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "1 / 1",
                          backgroundImage: isLoading
                            ? `url('data:image/svg+xml;base64,${toBase64(
                                shimmer(300, 300)
                              )}')`
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          overflow: "hidden",
                        }}
                      >
                        <div className="image-overlay">
                          <img
                            src={`${IMAGE_URL}m_thumb/${slide.img}`}
                            alt={slide.img_title || "Product Image"}
                            loading="lazy"
                            onLoad={() => handleImageLoad(index, "main")}
                            onError={() => handleImageError(index, "main")}
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
                      </div>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <div
                className="image-container"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  backgroundColor: "#f5f5f5",
                }}
              />
            )}
          </div>
        </Link>
        <WishIcon product={product} />
        <div className="ps-product__badge">
          <div className="ps-badge ps-badge--new">{product.ProdyctType}</div>
        </div>
      </div>

      {/* Thumbnail slider */}
      {slider.length > 1 && (
        <div className="thumb-slider-container">
          <Slider
            key={`nav-slider-${product?.id}-${navSliderKey}`}
            {...navSettings}
            ref={setNavSliderRef}
          >
            {slider.map((item, index) => {
              const isActive = index === activeIndex;
              const isLoading = navLoadingState[index] !== true;

              return (
                <div
                  key={`${product?.id}-nav-slide-${index}`}
                  className="nav-slide-item"
                >
                  <button
                    type="button"
                    onClick={() => handleThumbClick(index)}
                    className={`thumb-button ${isActive ? "active" : ""}`}
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      border: isActive ? "1px solid #000" : "1px solid #e0e0e0",
                      background: "none",
                      cursor: "pointer",
                      borderRadius: "4px",
                      overflow: "hidden",
                      padding: 0,
                      margin: "0 2px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: isLoading
                          ? `url('data:image/svg+xml;base64,${toBase64(
                              shimmer(60, 60)
                            )}')`
                          : "none",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src={`${IMAGE_URL}m_thumb/${item.img}`}
                        alt={item.img_title || ""}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index, "nav")}
                        onError={() => handleImageError(index, "nav")}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          opacity: navLoadingState[index] ? 1 : 0,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </Slider>
        </div>
      )}

      <div className="ps-product__content">
        <h3 className="ps-product__title">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
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
                <button
                  key={`${product?.id}-variant-${index}`}
                  type="button"
                  onClick={() => handleVariant(variant, index)}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "4px",
                    border:
                      thumbActiveIndex === index && product.variant.length > 1
                        ? "1px solid #afadad"
                        : "1px solid #ddd",
                    cursor: "pointer",
                    padding: 0,
                    background: "none",
                    borderRadius: "1px",
                    overflow: "hidden",
                  }}
                  className="ps-product__image-default"
                >
                  <img
                    src={`${IMAGE_URL}m_thumb/${variant[0]?.img || ""}`}
                    alt={variant[0]?.img_title || ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </button>
              );
            })}
        </div>
      </div>

     <style jsx>{`
        .ps-product__thumbnail {
          position: relative;
          overflow: hidden;
        }

        .main-slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
        }

        .main-slider-container.dragging {
          cursor: pointer;
        }

        .thumb-slider-container {
          margin-top: 8px;
          padding: 0 2px;
          cursor: pointer;
          user-select: none;
        }

        .thumb-slider-container :global(.slick-list) {
          cursor: pointer;
          overflow: hidden;
        }

        .slide-item,
        .nav-slide-item {
          outline: none;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background-color: #f5f5f5;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .thumb-button {
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          border-radius: 3px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          background: transparent;
          transition: all 0.3s ease;
        }

        .thumb-button:hover {
          border-color: #666 !important;
        }

        .thumb-button.active {
          border-color: #000 !important;
        }

        /* FIX FOR GAP ISSUE */
        :global(.main-slider-container .slick-list) {
          cursor: pointer;
          overflow: visible !important;
          margin: 0 -1px !important;
        }

        :global(.main-slider-container .slick-list.dragging) {
          cursor: pointer;
        }

        :global(.main-slider-container .slick-track) {
          display: flex;
          will-change: transform;
          padding: 1px 0;
        }

        :global(.main-slider-container .slick-slide) {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100% !important;
          opacity: 1;
          position: relative;
        }

        :global(.main-slider-container .slick-slide > div) {
          display: flex;
          height: 100%;
          margin: 0 1px;
        }

        :global(.main-slider-container .slide-item) {
          height: 100%;
        }

        :global(.main-slider-container .image-container) {
          box-shadow: 0 0 0 1px #f5f5f5;
        }

        :global(
            .main-slider-container .slick-slide.slick-active .image-container
          ) {
          box-shadow: 0 0 0 1px transparent;
        }

        :global(
            .main-slider-container.dragging .slick-slide:not(.slick-active)
          ) {
          opacity: 0.95;
        }

        /* Arrow styles - DEFAULT HIDDEN */
        :global(.main-slider-container .slick-prev),
        :global(.main-slider-container .slick-next) {
          z-index: 100;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          display: flex !important;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        /* SHOW ARROWS ON DESKTOP HOVER - Using class-based approach */
        @media (hover: hover) and (pointer: fine) {
          :global(.main-slider-container.hovered .slick-prev),
          :global(.main-slider-container.hovered .slick-next) {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
        }

        /* HIDE ARROWS ON MOBILE */
        @media (hover: none) and (pointer: coarse) {
          :global(.main-slider-container .slick-prev),
          :global(.main-slider-container .slick-next) {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          :global(.main-slider-container .slick-prev),
          :global(.main-slider-container .slick-next) {
            display: none !important;
          }
        }

        :global(.main-slider-container .slick-prev:hover),
        :global(.main-slider-container .slick-next:hover) {
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.05);
        }

        :global(.main-slider-container .slick-prev:before),
        :global(.main-slider-container .slick-next:before) {
          font-size: 20px;
          color: #333;
          margin-bottom: 6px !important;
          opacity: 0.9;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        :global(.main-slider-container .slick-prev) {
          left: 12px;
        }

        :global(.main-slider-container .slick-next) {
          right: 12px;
        }

        :global(.main-slider-container .slick-prev:before) {
          content: "‹";
          margin-right: 1px;
        }

        :global(.main-slider-container .slick-next:before) {
          content: "›";
          margin-left: 1px;
        }

        /* Thumb slider styles */
        :global(.thumb-slider-container .slick-slide) {
          padding: 0 2px;
        }

        :global(.thumb-slider-container .slick-track) {
          display: flex;
          justify-content: flex-start !important;
          align-items: center;
          overflow: hidden !important;
        }

        :global(.thumb-slider-container .slick-list) {
          margin: 0 -2px;
          cursor: pointer;
          overflow: visible;
        }

        :global(.thumb-slider-container .slick-slide) {
          transition: transform 0.3s ease;
        }

        :global(
            .thumb-slider-container .slick-slide.slick-active .thumb-button
          ) {
          transform: scale(1);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          :global(.main-slider-container .slick-list) {
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          :global(.main-slider-container .slick-list) {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }

        :global(.thumb-slider-container .slick-slide > div) {
          margin-left: 0 !important;
        }

        @media (min-width: 769px) {
          .thumb-slider-container :global(.slick-list) {
            display: none !important;
          }
        }

        /* Mobile: show thumbnails */
        @media (max-width: 768px) {
          .thumb-slider-container :global(.slick-list) {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
