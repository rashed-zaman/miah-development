import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";

export default function Notify() {
  // hooks
  const siteOptions = useSelector((state) => state.menu.siteOptions);

  // local state

  const [notify, setNotify] = useState(true)

  // methods
  const hideNotify = () => {
    setNotify(false)
  }


  return (
    <div className="ps-notify" style={{display: notify ? '' : 'none'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Swiper
              loop={true}
              autoplay={{
                delay: 2500,
                reverseDirection: true,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="header-slider"
            >
              {siteOptions.dynamicText &&
                siteOptions.dynamicText.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <p className="text-center ps-notify__text">
                        {item}
                      </p>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
      <a className="ps-notify__close" onClick={hideNotify}>
        <img src="/img/icon/close.svg" alt="" />
      </a>
    </div>
  );
}
