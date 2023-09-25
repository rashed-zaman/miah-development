import axios from "axios";
import { useState,useEffect } from "react";
import commonService from "../../service/menu/commonService";
import { axiosCredential } from "../../service/serviceConfig";
import { TEST_CHEOUT } from "../checkout/checkoutTypes";
import {
  LOG_OUT,
  MOBILE_USER_ACCOUNT,
  SET_AUTH_LOADING,
  SET_RECENT_SEARCH,
  SET_RECENT_VIEW,
  SET_USER_INFO,
  CHANGE_WISH_LIST,
} from "./authTypes";
import { repleaceBag, addItemQty, addToBag} from "../shoppingBag/shoppingBagActions";


export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};
export const fetchUserInfo = (body, localShoppingBag) => {
  return (dispatch) => {
    dispatch(setAuthLoading(true));
    dispatch(setUserInfo({}));
    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("login", body)
        .then((res) => {
          dispatch(setAuthLoading(false));
          dispatch(setUserInfo(res.data.data));
          checkUserSavedCart(res.data.data.shoppingCart, localShoppingBag, dispatch)
        })
        .catch((error) => {
          dispatch(setAuthLoading(false));
          console.log("errror", error);
        });
    });
  };
};

export const setAuthLoading = (loading) => {
  return {
    type: SET_AUTH_LOADING,
    payload: loading,
  };
};

export const testFromAuth = (name) => {
  return {
    type: TEST_CHEOUT,
    payload: name,
  };
};

export const setMobileUserAccount = (value) => {
  return {
    type: MOBILE_USER_ACCOUNT,
    payload: value,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
    payload: {},
  };

};

export const setRecentSerach = (item) => {
  return {
    type: SET_RECENT_SEARCH,
    payload: item,
  };
};

export const setRecentView = (item) => {
  return {
    type: SET_RECENT_VIEW,
    payload: item,
  };
};
export const changeWishLiast = (value) => {
  return {
    type: CHANGE_WISH_LIST,
    payload: value,
  };
};

  const checkUserSavedCart = (cart, localShoppingBag, dispatch) => {
  const combinedCart = [...cart, ...localShoppingBag]
  const uniq = Object.values(combinedCart.reduce((result, obj) => {
    if (!result[obj.id] ) {
      result[obj.id] = { ...obj };
    } else {
      result[obj.id].qty += parseInt(obj.qty);
    }
    return result;
  }, {}));

  dispatch(repleaceBag(uniq))
}

// export const ShoppingBagUpdate=(cart, shoppingBag)=>{
//   // const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
//   // const userInfo = useSelector((state) => state.auth.userInfo);
//   if(userInfo.token){
//     commonService
//       .postAuthData("cartLog", { cart: shoppingBag })
//       .then((res) => {
//         dispatch(addToBag(JSON.parse(res.config.data.cart)));
//       })
//       .catch((error) => {
//         console.log(error);
//     });
//   }
// }