import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Video() {
  return (
    <>
      <div className="ps-home ps-home--5 mb-5 pb-5">
        <section className="ps-video--home-full">
          <div className="ps-video__body">
            <div className="ps-video__content">
              <h2 className="ps-video__title">
                Most Comfortable {"Men's"} <br />
                Fashion Wear
                <br />
                Lungi
              </h2>
              <Link href="/men/lungi">
                <a className="ps-btn ps-btn--rounded ps-btn--danger">
                  Shop Lungi
                </a>
              </Link>
            </div>
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
              <img className="ps-video__image" src="/img/post/lungi.jpg" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
