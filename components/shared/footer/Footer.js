import Link from "next/link";
import React from "react";
import NewsLetter from "./NewsLetter";

export default function Footer() {
  return (
    <footer className="ps-footer ps-footer--1 ps-footer--6">
      <div className="container">
        <div className="ps-footer__middle">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="ps-footer--address">
                <div className="ps-logo">
                  <Link href="/">
                    <a>
                      <img src="img/miah-logo-white.png" />
                      <img
                        className="logo-white"
                        src="/img/miah-logo-white.png"
                      />
                    </a>
                  </Link>
                </div>
                <p>A high-quality clothing and fashion brand.</p>
                <ul>
                  <li>
                    <a
                      className="ps-footer__phone mr-2 text-light"
                      href="tel:+8801313767678"
                    >
                      +8801313767678
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-footer__mail text-light"
                      href="mailto:info@miah.shop"
                    >
                      info@miah.shop
                    </a>
                  </li>
                </ul>
                <ul className="ps-social">
                  <li>
                    <a
                      className="ps-social__link facebook"
                      href="https://www.facebook.com/MiahAndMiah/"
                    >
                      <i className="fa fa-facebook"> </i>
                      <span className="ps-tooltip">Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link instagram"
                      href="https://www.instagram.com/miahandmiah/"
                    >
                      <i className="fa fa-instagram"></i>
                      <span className="ps-tooltip">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link youtube"
                      href="https://www.youtube.com/miahandmiah"
                    >
                      <i className="fa fa-youtube-play"></i>
                      <span className="ps-tooltip">Youtube</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link pinterest"
                      href="https://www.pinterest.com/miahandmiah/"
                    >
                      <i className="fa fa-pinterest-p"></i>
                      <span className="ps-tooltip">Pinterest</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-social__link linkedin"
                      href="https://www.linkedin.com/company/miahandmiah/"
                    >
                      <i className="fa fa-linkedin"></i>
                      <span className="ps-tooltip">Linkedin</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-5">
              <div className="row">
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                        <h4 className="text-light">Category</h4>
                      </li>
                      <li>
                        <Link href="/men">
                          <a>Men</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/women">
                          <a>Women</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/others">
                          <a>Others</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                        <h4 className="text-light">Important Links</h4>
                      </li>
                      <li>
                        <Link href="/page/termCondition">
                          <a>Terms & Comditions</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/company">
                          <a>About us</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/shippingPolicy">
                          <a>Shipping Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/privacyPolicy">
                          <a>Privecy Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/paymentPolicy">
                          <a>Payment Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/faq">
                          <a>FAQs</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us">
                          <a>Contact us</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                        <h4 className="text-light">My Account</h4>
                      </li>
                      <li>
                        <Link href="/dashboard/address-book?id=1">
                          <a>My Account</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/company">
                          <a>Order History</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/shippingPolicy">
                          <a>My Wishlist</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <NewsLetter />
          </div>
        </div>
        <div className="ps-footer--service">
          <div className="container">
            <div className="ps-footer__row">
              {/* <p className="ps-footer__item">
                <a className="ps-footer__link" href="#">
                  <span>Free delivery</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link" href="#">
                  <span>Non-contact shipping</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link" href="#">
                  <span>Money-back quarantee</span>
                </a>
              </p>
              <p className="ps-footer__item">
                <a className="ps-footer__link" href="#">
                  <span>Secure payments</span>
                </a>
              </p> */}
            </div>
          </div>
        </div>
        <div className="ps-footer--bottom">
          <div className="row">
            <div className="col-12 col-md-12 text-right text-center">
              <img src="https://images.miah.shop/banner/payment-gateway.png" />
              <img
                width="355px"
                className="img-white"
                src="https://images.miah.shop/banner/payment-gateway.png"
              />
            </div>
            <div className="col-12 col-md-12 mt-4">
              <p className="ps-footer__copyright text-center">
                © {new Date().getFullYear()} M/S Miah & Miah Enterprise. All
                right reserved.. <span style={{ color: "white" }}></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
