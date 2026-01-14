"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectSiteOptions } from "@/store/menuSlice";

export default function Notify() {
  const siteOptions = useSelector(selectSiteOptions);
  const texts = siteOptions?.dynamicText || [];

  const [notify, setNotify] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  // autoplay (reverse direction like Swiper)
  useEffect(() => {
    if (texts.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === 0 ? texts.length - 1 : prev - 1
      );
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [texts.length]);

  if (!notify || texts.length === 0) return null;

  return (
    <div className="ps-notify">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="notify-slider">
              <div
                className="notify-track"
                style={{
                  transform: `translateY(-${activeIndex * 100}%)`,
                }}
              >
                {texts.map((item, index) => (
                  <div className="notify-slide" key={index}>
                    <p className="text-center ps-notify__text">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="ps-notify__close"
        onClick={() => {
          setNotify(false);
          clearInterval(intervalRef.current);
        }}
      >
        <img src="/img/icon/close.svg" alt="close" />
      </button>

      {/* 🔽 Component-scoped styles */}
      <style jsx>{`
        .ps-notify {
          position: relative;
          background: #000;
          color: #fff;
          padding: 6px 0;
        }

        .notify-slider {
          overflow: hidden;
          height: 40px;
          position: relative;
        }

        .notify-track {
          transition: transform 0.5s ease-in-out;
        }

        .notify-slide {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ps-notify__text {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
        }

        .ps-notify__close {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
        }

        .ps-notify__close img {
          width: 14px;
          height: 14px;
        }
      `}</style>
    </div>
  );
}
