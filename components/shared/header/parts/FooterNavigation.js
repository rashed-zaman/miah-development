import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

// import DrawerMain from "../drawer/DrawerMain";
const DrawerMain = dynamic(() => import("../drawer/DrawerMain"));

import {
  fetchMenu,
  fetchStieOptions,
  drawer,
} from "../../../../redux/menu/menuActions";
import { setMobileUserAccount } from "../../../../redux/auth/authActions";
import { mobileBagDialog } from "../../../../redux/shoppingBag/shoppingBagActions";
import commonService from "../../../../service/menu/commonService";
import { useState } from "react";

export default function FooterNavigation() {
  // ====== hooks ======
  const route = useRouter();
  const wishList = useSelector((state) => state.auth.wishList);
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const SgoppingBagLength = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.qty || 0), 0)
  );

  // ============= local State ==========
  const [wishLenght, setWishLength] = useState(0);
  // ============= methods ==========
  const openDrawer = () => {
    dispatch(drawer(true));
  };

  const mobileUserAccount = () => {
    dispatch(setMobileUserAccount(true));
  };

  const shoppingDialog = () => {
    dispatch(mobileBagDialog(true));
  };

  const getWishList = () => {
    commonService
      .authGetData("wishList", userInfo.token)
      .then((res) => {
        setWishLength(res.data.data.length);
      })
      .catch((err) => console.log(err));
  };

  // side effect
  useEffect(() => {
    dispatch(fetchStieOptions());
    dispatch(fetchMenu());
  }, []);

  // -------------------------
  // const [show, setShow] = useState(true)
  // const controlNavbar = () => {
  //     if (window.scrollY>100) {
  //         setShow(false)
  //     } else {
  //         setShow(true)
  //     }
  // }

  // useEffect(() => {
  //     window.addEventListener('scroll', controlNavbar)
  //     return () => {
  //         window.removeEventListener('scroll', controlNavbar)
  //     }
  // }, [])

  const [hState, sethState] = useState("bottom");

  useEffect(() => {
    var lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        sethState("down");
      }
      if (y < lastVal) {
        sethState("up");
      }
      if (y === 0) {
        sethState("bottom");
      }
      lastVal = y;
    };
  }, []);
  // -------------------------

  return (
    <>
      {route.asPath === "/product/${product.slug}" ? (
        <div className={`ps-navigation--footer ${hState}`}>
          <div className="ps-nav__item" onClick={openDrawer}>
            <img src="/img/icon/menu.svg" alt="" />
            <a href="#" id="close-menu">
              <img src="/img/icon/close-red.svg" alt="" />
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Shop
            </span>
          </div>
          <div className="ps-nav__item">
            <Link href="/">
              <a>
                <img src="/img/icon/home.png" alt="" />
              </a>
            </Link>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Home
            </span>
          </div>
          <div className="ps-nav__item" onClick={shoppingDialog}>
            <a>
              <img src="/img/icon/cart.png" alt="" />
              <span className="badge">{SgoppingBagLength}</span>
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Cart
            </span>
          </div>
          <div className="ps-nav__item">
            <a>
              <img src="/img/icon/heart.svg" alt="" />

              {userInfo.token ? (
                <span className="badge">{wishLenght}</span>
              ) : (
                <span className="badge">0</span>
              )}
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Wishlist
            </span>
          </div>
          {userInfo.token ? (
            <div className="ps-nav__item">
              <Link href="/profile/account-information">
                <a>
                  <img src="/img/icon/user.png" alt="" />
                </a>
              </Link>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#00000094",
                }}
              >
                Me
              </span>
            </div>
          ) : (
            <div className="ps-nav__item" onClick={mobileUserAccount}>
              <img src="/img/icon/user.png" alt="" />
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#00000094",
                }}
              >
                Me
              </span>
            </div>
          )}
        </div>
      ) : route.asPath === "/checkout" ? null : (
        <div className="ps-navigation--footer">
          <div className="ps-nav__item" onClick={openDrawer}>
            <img src="/img/icon/menu.svg" alt="" />
            <a href="#" id="close-menu">
              <img src="/img/icon/close-red.svg" alt="" />
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Shop
            </span>
          </div>
          <div className="ps-nav__item">
            <Link href="/">
              <a>
                <img src="/img/icon/home.png" alt="" />
              </a>
            </Link>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Home
            </span>
          </div>
          <div className="ps-nav__item" onClick={shoppingDialog}>
            <a>
              <img src="/img/icon/cart.png" alt="" />
              <span className="badge">{SgoppingBagLength}</span>
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Cart
            </span>
          </div>
          <div className="ps-nav__item">
            <a>
              <img src="/img/icon/heart.svg" alt="" />

              {userInfo.token ? (
                <span className="badge">{wishLenght}</span>
              ) : (
                <span className="badge">0</span>
              )}
            </a>
            <span
              style={{ display: "block", fontSize: "10px", color: "#00000094" }}
            >
              Wishlist
            </span>
          </div>
          {userInfo.token ? (
            <div className="ps-nav__item">
              <Link href="/profile/account-information">
                <a>
                  <img src="/img/icon/user.png" alt="" />
                </a>
              </Link>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#00000094",
                }}
              >
                Me
              </span>
            </div>
          ) : (
            <div className="ps-nav__item" onClick={mobileUserAccount}>
              <img src="/img/icon/user.png" alt="" />
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#00000094",
                }}
              >
                Me
              </span>
            </div>
          )}
        </div>
      )}
      {/* <div className={`ps-navigation--footer ${hState}`}>
        <div className="ps-nav__item" onClick={openDrawer}>
          <img src="/img/icon/menu.svg" alt="" />
          <a href="#" id="close-menu">
            <img src="/img/icon/close-red.svg" alt="" />
          </a>
          <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Shop</span>
        </div>
        <div className="ps-nav__item">
          <Link href="/">
            <a>
              <img src="/img/icon/home.png" alt=""/>
            </a>
          </Link>
          <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Home</span>
        </div>
        <div className="ps-nav__item" onClick={shoppingDialog}>
          <a>
            <img src="/img/icon/cart.png" alt="" />
            <span className="badge">{SgoppingBagLength}</span>
          </a>
          <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Cart</span>
        </div>        
        <div className="ps-nav__item">
          <a>
            <img src="/img/icon/heart.svg" alt="" />

            {userInfo.token ? (
              <span className="badge">{wishLenght}</span>
            ) : (
              <span className="badge">0</span>
            )}
          </a>
          <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Wishlist</span>
        </div>
        {userInfo.token ? (
              <div className="ps-nav__item">
               <Link href="/dashboard/account-information?id=0">
                  <a>
                    <img src="/img/icon/user.png" alt="" />
                  </a>
                </Link>
                <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Me</span>
              </div>
          ) : (
            <div className="ps-nav__item" onClick={mobileUserAccount}>
              <img src="/img/icon/user.png" alt="" />
              <span style={{display:'block', fontSize:'12px',color:'#00000094'}}>Me</span>
            </div>
        )}
      </div> */}
      <DrawerMain menu={menu} />
    </>
  );
}
