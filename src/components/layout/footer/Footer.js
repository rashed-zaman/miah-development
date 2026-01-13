"use client";

import Link from "next/link";
import React from "react";
import NewsLetter from "./NewsLetter";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  const pathname = usePathname();
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();

  return (
    <footer className="ps-footer ps-footer--1 ps-footer--6 pb-5">
      <div className="container">
        <div className="ps-footer__middle">
          <div className="row">
            {/* Logo + Contact */}
            <div className="col-12 col-md-4 col-lg-3">
              <div className="ps-footer--address">
                <div className="ps-logo">
                  <Link href="/">
                    <img src="/img/miah-logo-white.png" alt="Miah Logo" />
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
                      <CallIcon /> &nbsp;+8801313767678
                    </a>
                  </li>
                  <li>
                    <a
                      className="ps-footer__mail text-light"
                      href="mailto:info@miah.shop"
                    >
                      <EmailIcon /> &nbsp;info@miah.shop
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category + Support + Account */}
            <div className="col-12 col-md-8 col-lg-5">
              <div className="row mi-line">
                {/* Shop by Category */}
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                        <span className="text-light">Shop by Category</span>
                      </li>
                      <li><Link href="/men">Men</Link></li>
                      <li><Link href="/women">Women</Link></li>
                      <li><Link href="/kids">Kids</Link></li>
                      <li><Link href="/others">Others</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Support */}
                <div className="col-6 col-md-4">
                  <div className="ps-footer--widget">
                    <ul className="ps-footer__list">
                      <li>
                        <span className="text-light">Get Support</span>
                      </li>

                      <li><Link href="/page/shippingPolicy">Shipping Policy</Link></li>
                      <li><Link href="/page/returnExchange">Return & Exchange</Link></li>
                      <li><Link href="/page/faq">FAQs</Link></li>
                      <li>
                        <a
                          href="https://blog.miah.shop/2022/08/29/how-to-order-on-miah/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          How to Buy
                        </a>
                      </li>
                      <li><Link href="/page/termCondition">Terms & Conditions</Link></li>
                      <li><Link href="/page/privacyPolicy">Privacy Policy</Link></li>
                      <li><Link href="/page/paymentPolicy">Payment Policy</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Company Info & Account */}
                <div className="col-12 col-md-4">
                  <div className="ps-footer--widget">
                    {/* Mobile version */}
                    <div className="d-block d-sm-none" style={{ marginTop: "2rem" }}>
                      <div className="row">
                        <div className="col-6">
                          <ul className="ps-footer__list">
                            <li><span className="text-light">Company Info</span></li>
                            <li><Link href="/page/company">About us</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/page/siteMap">SiteMap</Link></li>
                            <li><Link href="/contact-us">Contact us</Link></li>
                          </ul>
                        </div>

                        <div className="col-6">
                          <ul className="ps-footer__list">
                            <li><span className="text-light">Your Account</span></li>
                            <li><Link href="/profile/account-information">My Account</Link></li>
                            <li><Link href="/profile/order-history">Order History</Link></li>
                            <li><Link href="/profile/wish-list">My Wishlist</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Desktop version */}
                    <div className="d-none d-sm-block">
                      <ul className="ps-footer__list">
                        <li><span className="text-light">Company Info</span></li>
                        <li><Link href="/page/company">About us</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/page/siteMap">SiteMap</Link></li>
                        <li><Link href="/contact-us">Contact Us</Link></li>
                      </ul>

                      <ul className="ps-footer__list mt-3">
                        <li><span className="text-light">Your Account</span></li>
                        <li><Link href="/profile/account-information">My Account</Link></li>
                        <li><Link href="/profile/order-history">Order History</Link></li>
                        <li><Link href="/profile/wish-list">My Wishlist</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NewsLetter />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="ps-footer--bottom">
          <div className="row">
            <div className="col-12 text-center">
              <img
                src="https://images.miah.shop/banner/payment-gateway.png"
                alt="payment methods"
              />
            </div>

            <div className="col-12 mt-4 pb-5">
              <p className="ps-footer__copyright text-center">
                © {new Date().getFullYear()} M/S Miah & Miah Enterprise. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
