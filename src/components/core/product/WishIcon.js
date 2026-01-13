"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import commonService from "../../../service/menu/commonService";
// import { changeWishLiast } from "../../../redux/auth/authActions";

export default function WishIcon({ product }) {
  // ================= hooks ====================
  const userInfo = useSelector((state) => state.auth.userInfo);
  const route = useRouter();
  const dispatch = useDispatch();
  
  // ================= local state ====================
  const [isInWishList, setInWishList] = useState(false);

  // ================= methods ========================
  const addToWishList = () => {
    userInfo.token
      ? commonService
          .authGetData(`addWishlist/${product.id}`, userInfo.token)
          .then((res) => {
            if (res.data.data === "Successfully Added") {
              setInWishList(true);
              // dispatch(changeWishLiast(product.id))
            }
          })
          .catch((err) => console.log(err))
      : route.push("/signin");
  };

  const removeFromWishList = () => {
    commonService
      .authGetData(`removeWishList/${product.id}`, userInfo.token)
      .then((res) => {
        if (res.data.data === "success") {
          setInWishList(false);
          // dispatch(changeWishLiast(product.slug))
        }
      })
      .catch((err) => console.log(err));
  };

  // ================= side effects ========================
  useEffect(() => {
    product.wishList && setInWishList(true);
  }, [product]);

  return (
    <>
      {!isInWishList ? (
        <div className="ps-product__actions" onClick={addToWishList}>
          <div className="ps-product__item">
            <i className="fa fa-heart-o"></i>
          </div>
        </div>
      ) : (
        <div className="ps-product__actions" onClick={removeFromWishList}>
          <div className="ps-product__item" style={{ background: "#000" }}>
            <i className="fa fa-heart-o" style={{ color: "#fff" }}></i>
          </div>
        </div>
      )}
    </>
  );
}
