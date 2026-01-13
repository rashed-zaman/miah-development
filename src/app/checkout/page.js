"use client";

import { fetchLocations } from "@/store/checkoutSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LodingComponent from "@/components/shared/loading/LodingComponent";

import { useSelector, useDispatch } from "react-redux";
import CheckOut from "@/components/route/check-out/CheckOut";
import CheckOutProcess from "@/components/route/check-out/CheckOutProcess";

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const isRehydrated = useSelector((state) => state._persist?.rehydrated);

  const [checkout, setCheckout] = useState(false);
  const [newUserMobile, setNewUserMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { first_name } = userInfo;

  useEffect(() => {
    if (!userInfo?.token) {
      setCheckout(false);
      return;
    }

    setLoading(true);

    dispatch(fetchLocations())
      .unwrap()
      .then((res) => {
        if (res?.length > 0) {
          setCheckout(true);
        }
      })
      .catch(() => {
        setError("Failed to load locations. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userInfo?.token, dispatch]);

  return (
    <>
      {loading && <LodingComponent />}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading &&
        (checkout ? (
          <CheckOut newUserMobile={newUserMobile} />
        ) : (
          <CheckOutProcess setNewUserMobile={setNewUserMobile} setCheckout={setCheckout} />
          
        ))}
    </>
  );
}
