import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOfferDiscount } from "../../../redux/checkout/checkoutActions";
import commonService from "../../../service/menu/commonService";

export default function OfferDiscount() {
  // hooks
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const paymentName = useSelector(
    (state) => state.checkout.formInitialValue.paymentType
  );
  const cartTotal = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );

  // local state
  const [allOffer, setAllOffer] = useState([]);
  const [userType, setUserType] = useState("old");

  // methods
  const getOfferList = async () => {
    await commonService
      .getData("getOffer")
      .then((res) => {
        setAllOffer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateDiscount = (d, value, type) => {
    let discount = 0;
    if (d === "yes") {
      if (type === "%") {
        discount = (Number(this.cartTotal) * Number(value)) / 100;
      } else {
        discount = Number(value);
      }
    }
    return parseFloat(discount);
  };

  const OfferDiscount = () => {
    let offerObj = {
      casbackAmount: 0,
      discountValue: 0,
      shippingFree: false,
    };
    if (allOffer?.length > 0) {
      allOffer.forEach((offer) => {
        if (offer.offer_for === "all" || offer.offer_for === "online") {
          if (cartTotal >= offer.purchase_limit) {
            if (offer.user_type === "all" && offer.payment_type === "all") {
              offerObj.discountValue =
                offerObj.discountValue +
                calculateDiscount(
                  offer.discount,
                  offer.discount_value,
                  offer.discount_type
                );
              if (offer.free_shipping === "yes") {
                offerObj.shippingFree = true;
              }
              if (offer.cash_back === "yes") {
                offerObj.casbackAmount =
                  offerObj.casbackAmount + parseFloat(offer.cash_back_amount);
              } else {
                offerObj.casbackAmount = offerObj.casbackAmount + 0;
              }
            } else if (
              offer.user_type === "all" &&
              offer.payment_type === paymentName
            ) {
              offerObj.discountValue =
                offerObj.discountValue +
                calculateDiscount(
                  offer.discount,
                  offer.discount_value,
                  offer.discount_type
                );
              if (offer.free_shipping === "yes") {
                offerObj.shippingFree = true;
              }
              if (offer.cash_back === "yes") {
                offerObj.casbackAmount =
                  offerObj.casbackAmount + parseFloat(offer.cash_back_amount);
              } else {
                offerObj.casbackAmount = offerObj.casbackAmount + 0;
              }
            } else if (
              offer.user_type === userType &&
              offer.payment_type === "all"
            ) {
              offerObj.discountValue =
                offerObj.discountValue +
                calculateDiscount(
                  offer.discount,
                  offer.discount_value,
                  offer.discount_type
                );
              if (offer.free_shipping === "yes") {
                offerObj.shippingFree = true;
              }
              if (offer.cash_back === "yes") {
                offerObj.casbackAmount =
                  offerObj.casbackAmount + parseFloat(offer.cash_back_amount);
              } else {
                offerObj.casbackAmount = offerObj.casbackAmount + 0;
              }
            } else if (
              offer.user_type === userType &&
              offer.payment_type === paymentName
            ) {
              offerObj.discountValue =
                offerObj.discountValue +
                calculateDiscount(
                  offer.discount,
                  offer.discount_value,
                  offer.discount_type
                );
              if (offer.free_shipping === "yes") {
                offerObj.shippingFree = true;
              }
              if (offer.cash_back === "yes") {
                offerObj.casbackAmount =
                  offerObj.casbackAmount + parseFloat(offer.cash_back_amount);
              } else {
                offerObj.casbackAmount = offerObj.casbackAmount + 0;
              }
            }
          }
        }
      });
      dispatch(setOfferDiscount(offerObj));
    } else {
      dispatch(setOfferDiscount(offerObj));
    }
  };

  // side effects

  useEffect(() => {
    if (userInfo.token) {
      setUserType("old");
    } else {
      setUserType("new");
    }
  }, [userInfo]);

  useEffect(() => {
    getOfferList();
  }, []);

  useEffect(() => {
    OfferDiscount();
  }, [allOffer, shoppingBag]);

  return <></>;
}
