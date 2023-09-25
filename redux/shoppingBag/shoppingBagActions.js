import { ADD_QTY, ADD_TO_BAG, DEDUCT_QTY, MOBILE_BAG_DIALOG, REMOVE_FROM_BAG, REPLEACE_BAG, SET_BAG_NULL, RESET_SHOPPING_CART } from "./shoppingBagTypes";

export const addToBag = (item) => {
  return {
    type: ADD_TO_BAG,
    payload: item,
  }
}

export const addItemQty = (item) => {
  return {
    type: ADD_QTY,
    payload: item,
  }
}

export const removeItemQty = (item) => {
  return {
    type: DEDUCT_QTY,
    payload: item,
  }
}
export const removeFromBag = (item) => {
  return {
    type: REMOVE_FROM_BAG,
    payload: item,
  }
}
export const mobileBagDialog = (dialog) => {
  return {
    type: MOBILE_BAG_DIALOG,
    payload: dialog,
  }
}

export const repleaceBag = (bag) => {
  return {
    type: REPLEACE_BAG,
    payload: bag,
  }
}
export const setBagNull = () => {
  return {
    type: SET_BAG_NULL
  }
}

export const resetShoppingCart = () => ({
  type: RESET_SHOPPING_CART,
});