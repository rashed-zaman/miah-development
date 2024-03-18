import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { repleaceBag } from "../redux/shoppingBag/shoppingBagActions";
import commonService from "../service/menu/commonService";
import { useRouter } from "next/router";
import { purchaseDataLayer } from "../service/data-layer-creator/dataLayerCreator";


export const useOrderSubmit = () => {
  // hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const siteOptions = useSelector((state) => state.menu.siteOptions);
  const [isSubmitted, setSubmitted] = useState(false);
  const [hasStock, setHasStock] = useState(false);

  const hasShipping = useSelector(
    (state) => state.checkout.formInitialValue.hasShipping
  );
  
  const submitOrder = (values, token, shippingCharge) => {
    // const formValue = Object.assign({}, values);
  
    const {
      billingArea,
      billingCity,
      billingDivision,
      shippingArea,
      shippingCity,
      shippingDivision,
      terms,
      ...formValue
    } = values;

    formValue.billigInfo.divisionId = values.billingDivision.id;
    formValue.billigInfo.cityId = values.billingCity.id;
    formValue.billigInfo.areaId = values.billingArea.id;

    formValue.shippingInfo.divisionId = values.shippingDivision.id;
    formValue.shippingInfo.cityId = values.shippingCity.id;
    formValue.shippingInfo.areaId = values.shippingArea.id;

    formValue.cart = shoppingBag;
    
    formValue.tran_id = Date.now()

    if (formValue.hasShipping === false) {
      formValue.shippingInfo = formValue.billigInfo;
    }
    const body = { cart: shoppingBag };
    commonService
      .postData("cartStockChk", body)
      .then((res) => {
        // if stock error not found continue order
        if (res.data.status === 0) {
          // if payment type cash
          if (values.paymentType === "cash") {
            commonService
              .postAuthData("cashOrder", formValue, token)
              .then((res) => {
                if (res.data.status === "success") {
                  router.push("/order/order-success?orderid=" + res.data.data);
                  purchaseDataLayer(values, shoppingBag, shippingCharge, siteOptions)
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // if payment type digital
            activeSllzBtn(formValue, userInfo);
          }
        }

        // if stock erro found sent to shopping bag
        if (res.data.status === 1) {
          dispatch(repleaceBag(res.data.data));
          router.push("/shopping-bag");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sslCommerze = () => {
    const script = document.createElement("script");
    const tag = document.getElementsByTagName("script")[0];
    // live url
    script.src =
      "https://seamless-epay.sslcommerz.com/embed.min.js?" +
      Math.random().toString(36).substring(7);

    // // demo url
    // script.src =
    //   "https://sandbox.sslcommerz.com/embed.min.js?" +
    //   Math.random().toString(36).substring(7);

    tag.parentNode.replaceChild(script, tag);
    // tag.parentNode.insertBefore(script, tag)
  };

  const activeSllzBtn = (order, userInfo) => {
    order.userInfo = userInfo;
    const sslBtn = document.querySelectorAll("#sslczPayBtn");
    sslBtn[0].postdata = order;
    sslBtn[0].setAttribute("postdata", order);
    sslBtn[0].setAttribute("order", order.tran_id);
    document.getElementById("sslczPayBtn").click();
  };
  useEffect(() => {
    sslCommerze();
  }, []);

  return submitOrder;
};
