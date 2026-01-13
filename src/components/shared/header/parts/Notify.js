import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";

export default function Notify() {
  const siteOptions = useSelector((state) => state.menu.siteOptions);

  const [notify, setNotify] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // To ensure Swiper initializes after content is fully loaded
    setIsLoaded(true);
  }, []);

  const hideNotify = () => {
    setNotify(false);
  };

  return (
    <div className="ps-notify" style={{ display: notify ? "" : "none" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="swiper-container">
              {isLoaded && (
                <Swiper
                  loop={true}
                  slidesPerView={1} 
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
                          <p className="text-center ps-notify__text">{item}</p>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
      <a className="ps-notify__close" onClick={hideNotify}>
        <img src="/img/icon/close.svg" alt="" />
      </a>
    </div>
  );
}
