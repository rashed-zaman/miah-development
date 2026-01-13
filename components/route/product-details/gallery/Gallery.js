import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import Image from "next/image";

import ZoomSlider from "../zoom-slider/ZoomSlider";
import { IMAGE_URL } from "../../../../service/serviceConfig";
import { shimmer, toBase64 } from "../../../core/shimmer-image/shimmer";

export default function Gallery({ variation }) {
  // local state
  const [isImgLoaded, setImgLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideLength] = useState(variation.vImage.length);
  const [clickZoom] = useState(true);

  // methods
  const loadStart = () => {
    setImgLoaded(true);
  };

  const handleSetImage = (image, index) => {
    setOpen(true);
    setZoomImage(image);
    setActiveIndex(index);
  };

  const goToNext = () => {
    if (activeIndex < slideLength - 1) {
      let temp = activeIndex + 1;
      setActiveIndex(temp);
      setZoomImage(`${IMAGE_URL}/${variation.vImage[temp].img}`);
    }
    if (activeIndex === slideLength - 1) {
      setActiveIndex(0);
      setZoomImage(`${IMAGE_URL}/${variation.vImage[0].img}`);
    }
  };

  useEffect(() => {
    setImgLoaded(false);
  }, [variation]);

  return (
    <div className="col-12 col-md-7">
      <Dialog fullScreen open={open}>
        <ZoomSlider
          setZoom={setOpen}
          zoomImage={zoomImage}
          goToNext={goToNext}
        />
      </Dialog>
      <div>
        <div className="row">
          <div className="col-md-12 p-1">
            {variation && (
              <div
                style={{
                  backgroundImage: `url("data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}")`,
                }}
              >
                {isImgLoaded ? (
                  <>
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <Image
                        onClick={() =>
                          handleSetImage(
                            `${IMAGE_URL}/${variation.vImage[0].img}`,
                            0
                          )
                        }
                        src={`${IMAGE_URL}/${variation.vImage[0].img}`}
                        alt={variation.vImage[0].img_title}
                        width={300}
                        height={300}
                        layout="responsive"
                        placeholder="blur"
                        property="true"
                        priority={true}
                        loading="eager"
                        onLoad={loadStart}
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                      />
                    </Box>
                    <Box sx={{ display: { sm: "none", xs: "block" } }}>
                      <Image
                        onClick={() =>
                          handleSetImage(
                            `${IMAGE_URL}/${variation.vImage[0].img}`,
                            0
                          )
                        }
                        src={`${IMAGE_URL}/m_thumb/${variation.vImage[0].img}`}
                        alt={variation.vImage[0].img_title}
                        width={300}
                        height={300}
                        layout="responsive"
                        placeholder="blur"
                        property="true"
                        priority={true}
                        loading="eager"
                        onLoad={loadStart}
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                      />
                    </Box>
                  </>
                ) : (
                  <Image
                    src={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    alt={variation.vImage[0].img_title}
                    width={300}
                    height={300}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    onLoad={loadStart}
                    onClick={() =>
                      setZoomImage(products[0].variants[0].vImage[0].img, 0)
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {variation &&
            variation.vImage.map((vari, index) => {
              return (
                <div className="col-md-6 col-3 p-1" key={index}>
                  <div
                    style={{
                      backgroundImage: `url("data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}")`,
                    }}
                  >
                    {isImgLoaded ? (
                      <Image
                        onClick={() =>
                          handleSetImage(`${IMAGE_URL}/${vari.img}`, index)
                        }
                        src={`${IMAGE_URL}/m_thumb/${vari.img}`}
                        alt={vari.img_title}
                        width={300}
                        height={300}
                        layout="responsive"
                        placeholder="blur"
                        onLoad={loadStart}
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                      />
                    ) : (
                      <Image
                        src={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                        alt={vari.img_title}
                        width={300}
                        height={300}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                        onLoad={loadStart}
                        onClick={() =>
                          setZoomImage(products[0].variants[0].vImage[0].img, 0)
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
