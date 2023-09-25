import React from "react";
import { Box } from "@mui/material";

export default function Service() {
  return (
    <>
      <Box
        className="ps-footer--service pt-5 pb-2"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <div className="container">
          <div className="mobile-service-row">
            <div className="row">
              <div className="col-4 text-center">
                <img src="/img/icon/delivery.svg" alt="" width="27%" />
              </div>
              <div className="col-8 pt-2">
                <span>Cash On delivery</span>
              </div>
            </div>
          </div>
          <div className="mobile-service-row">
            <div className="row">
              <div className="col-4 text-center">
                <img src="/img/icon/non-contact.svg" alt="" width="27%" />
              </div>
              <div className="col-8 pt-2">
                <span>Non-contact shipping</span>
              </div>
            </div>
          </div>
          <div className="mobile-service-row">
            <div className="row">
              <div className="col-4 text-center">
                <img src="/img/icon/wallet.svg" alt="" width="27%" />
              </div>
              <div className="col-8 pt-2">
                <span>Easy Return Policy</span>
              </div>
            </div>
          </div>
          <div className="mobile-service-row">
            <div className="row">
              <div className="col-4 text-center">
                <img src="/img/icon/security.svg" alt="" width="27%" />
              </div>
              <div className="col-8 pt-2">
                <span>Secure payments</span>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box
        className="ps-footer--service pt-5"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <div className="service-container">

          <div className="container">
            <div className="ps-footer__row">
              <p className="ps-footer__item">
                <a className="ps-footer__link" >
                  <img src="/img/icon/delivery.svg" alt="" />
                  <span>Cash On delivery</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link" >
                  <img src="/img/icon/non-contact.svg" alt="" />
                  <span>Non-contact shipping</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link">
                  <img src="/img/icon/wallet.svg" alt="" />
                  <span>Easy Return Policy</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link" >
                  <img src="/img/icon/security.svg" alt="" />
                  <span>Secure payments</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
