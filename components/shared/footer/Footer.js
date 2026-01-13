import Link from "next/link";
import React from "react";
import NewsLetter from "./NewsLetter";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const route = useRouter();
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();
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
                <p>Find your next signature look.</p>
                <p>Need help? Just reach out.</p>
                <ul>
                  <li>
                    <a
                      className="ps-footer__phone mr-2 text-light"
                      href="tel:+8801313767678"
                    >
                      <CallIcon/>&nbsp;+8801313767678 
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-footer__mail text-light"
                      href="mailto:info@miah.shop"
                    >
                    <EmailIcon/>&nbsp;
                      info@miah.shop
                    </a>
                  </li>
                </ul>
                {/* <ul className="ps-social">
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
                </ul> */}
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-5">
              <div className="row mi-line">
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                       <span className="text-light">Shop by Category</span>
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
                        <Link href="/kids">
                          <a>Kids</a>
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
                       <span className="text-light">Get Support</span>
                      </li>
                      <li>
                        <Link href="/page/shippingPolicy">
                          <a>Shipping Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/returnExchange">
                          <a>Return & Exchange</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/faq">
                          <a>FAQs</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://blog.miah.shop/2022/08/29/how-to-order-on-miah/">
                          <a>How to Buy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/termCondition">
                          <a>Terms & Conditions</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/privacyPolicy">
                          <a>Privacy Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/paymentPolicy">
                          <a>Payment Policy</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="ps-footer--widget">
                  <div className="d-block d-sm-none"  style={{marginTop:'2rem'}}>
                    <div className='row'>
                      <div className="col-6">
                        <ul className="ps-footer__list">
                          <li>
                           <span className="text-light">Company Info</span>
                          </li>
                          <li>
                            <Link href="/page/company">
                              <a>About us</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/blog">
                              <a>Blog</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/page/siteMap">
                              <a>SiteMap</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/contact-us">
                              <a>Contact us</a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6">
                        <ul className="ps-footer__list">
                          <li>
                           <span className="text-light">Your Account</span>
                          </li>
                          <li>
                            <Link href="/profile/account-information">
                              <a>My Account</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/profile/order-history">
                              <a>Order History</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/profile/wish-list">
                              <a>My Wishlist</a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-sm-block">
                    <ul className="ps-footer__list">
                      <li>
                       <span className="text-light">Company Info</span>
                      </li>
                      <li>
                        <Link href="/page/company">
                          <a>About us</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog">
                          <a>Blog</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/siteMap">
                          <a>SiteMap</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us">
                          <a>Contact Us</a>
                        </Link>
                      </li>
                    </ul>
                    <ul className="ps-footer__list" style={{marginTop:'1rem'}}>
                      <li>
                       <span className="text-light">Your Account</span>
                      </li>
                      <li>
                        <Link href="/profile/account-information">
                          <a>My Account</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/profile/order-history">
                          <a>Order History</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/profile/wish-list">
                          <a>My Wishlist</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <NewsLetter />
          </div>
        </div>
        {/* <div className="ps-footer--service">
          <div className="container">
            <div className="ps-footer__row">
              
            </div>
          </div>
        </div> */}
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
