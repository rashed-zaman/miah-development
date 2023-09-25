import React from "react";

export default function ProductBanner({ data }) {
  return (
    <div className="container mt-4">
      <div className="ps-shop__banner">
        <div className="row">
          <div className="col-md-4">
            <div className="shop-banner-text-container">
              <div className="shop-banner-text-content">
                <h4>
                  {data.breadCam.body_title
                    ? data.breadCam.body_title
                    : "Title"}
                </h4>
                {data.breadCam.body_description ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.breadCam.body_description,
                    }}
                  />
                ) : (
                  <p>Description</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <img
              src={
                data.breadCam.big_image
                  ? "https://images.miah.shop/banner/" + data.breadCam.big_image
                  : "/img/banners/1600_300.jpg"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    // <div className="ps-shop__banner">
    //   <img src="/img/banners/1600_300.jpg" alt="" style={{height: '200px'}} />
    // </div>

    // <div className="ps-shop__banner">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-4 col-12">
    //         <h1>Men</h1>
    //       </div>
    //       <div className="col-md-8 col-12">
    //         <img
    //           src="/img/banners/1600_300.jpg"
    //           alt=""
    //           style={{ height: "200px" }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
